import { acorn, gosperGliderGun, longFrame, longGun, pulsar, simkinGliderGun, spaceship, wbs } from './patterns';

export const ALL_SEEDS = {
  random: acorn,
  acorn: acorn,
  'long gun': longGun,
  'gospher glider gun': gosperGliderGun,
  'simkin glider gun': simkinGliderGun,
  pulsar: pulsar,
  spaceship: spaceship,
  'long frame': longFrame,
  WBS: wbs,
} as const;

export type Seed = keyof typeof ALL_SEEDS;

export class Game {
  private ctx;
  private cells: Map<string, Cell>;
  private gridPath: Path2D | undefined;
  private white = 'oklch(100% 0 0 / 30%)';
  // private whiteFull = 'oklch(100% 0 0 / 100%)';
  private strokeWidth = 1;
  private currMousePos = [0, 0];
  private currHoveredCell: Cell | null = null;
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private largePaint = false;
  private drawState = false;
  // private drawConsole = false;

  constructor(
    private canvas: HTMLCanvasElement,
    private color: string,
    private bgColor: string,
    private cellSize: number = 20,
    private startingCellNum = 42,
    seed: Seed
    // drawConsole: boolean
  ) {
    this.canvas = canvas;

    this.color = color;
    this.bgColor = bgColor;
    this.startingCellNum = startingCellNum;
    this.cellSize = cellSize;
    // this.drawConsole = drawConsole;
    this.ctx = this.canvas.getContext('2d');
    this.cells = new Map<string, Cell>();

    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
    this.createGrid();

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    // this.run = this.run.bind(this);
    this.nextTick = this.nextTick.bind(this);
    this.setEventListeners();
    this.seed(seed);
    // this.cells.forEach((c) => this.checkNeighbours(c));
  }

  resize() {
    const currPattern = this.getCurrentPattern();
    this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
    this.createGrid();
    this.drawPattern(currPattern);
  }

  createGrid() {
    this.cells.clear();
    this.gridPath = new Path2D();

    for (let x = 0; x <= this.canvas.width; x += this.cellSize) {
      this.gridPath.moveTo(x, 0);
      this.gridPath.lineTo(x, this.canvas.height);
    }
    for (let y = 0; y <= this.canvas.height; y += this.cellSize) {
      this.gridPath.moveTo(0, y);
      this.gridPath.lineTo(this.canvas.width, y);
    }

    for (let y = 0; y < this.canvas.height; y += this.cellSize) {
      for (let x = 0; x < this.canvas.width; x += this.cellSize) {
        const neighborCoords = this.getNeighborCoordinates(x, y);
        const newCell = new Cell(
          [x, x + this.cellSize, y, y + this.cellSize],
          this.ctx!,
          neighborCoords,
          this.color,
          this.bgColor
        );
        this.cells.set(x + ',' + y, newCell);
      }
    }

    this.drawGrid();
  }

  getNeighborCoordinates(x: number, y: number) {
    const neighbors = [];
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue; // Skip self

        const nx = x + dx * this.cellSize;
        const ny = y + dy * this.cellSize;

        if (nx >= 0 && nx < this.canvas.width && ny >= 0 && ny < this.canvas.height) {
          neighbors.push(nx + ',' + ny);
        } else {
          neighbors.push(null);
        }
      }
    }
    return neighbors;
  }

  private setEventListeners() {
    this.canvas.addEventListener('mousemove', this.handleMouseMove);
    this.canvas.addEventListener('mouseleave', this.handleMouseLeave);
    this.canvas.addEventListener('mousedown', this.handleMouseDown);
  }

  disconnect() {
    this.removeEventListeners();
  }

  private removeEventListeners() {
    this.canvas.removeEventListener('mousemove', this.handleMouseMove);
    this.canvas.removeEventListener('mouseleave', this.handleMouseLeave);
    this.canvas.removeEventListener('mousedown', this.handleMouseDown);
    if (this.intervalId) clearInterval(this.intervalId);
  }

  private handleMouseLeave() {
    this.currHoveredCell = null;
  }

  private handleMouseDown() {
    if (this.currHoveredCell) {
      this.drawState = !this.currHoveredCell.active;
    }
    this.handleClick();
  }

  private handleMouseMove(e: MouseEvent) {
    const x = e.offsetX - (e.offsetX % this.cellSize);
    const y = e.offsetY - (e.offsetY % this.cellSize);
    if (this.currMousePos[0] === x && this.currMousePos[1] === y) return;
    this.currMousePos[0] = x;
    this.currMousePos[1] = y;
    this.currHoveredCell = this.cells.get(x + ',' + y) || null;
    if (e.buttons === 1) this.handleClick();
  }

  private handleClick() {
    if (this.currHoveredCell) this.currHoveredCell.active = this.drawState;
    if (this.currHoveredCell && this.largePaint) {
      this.currHoveredCell?.neighbours.forEach((n) => {
        const c = n ? this.cells.get(n) : null;
        if (c) c.active = this.drawState;
      });
    }
  }

  private drawGrid() {
    if (!this.ctx || !this.gridPath) return;

    this.ctx.strokeStyle = this.white;
    this.ctx.lineWidth = this.strokeWidth;
    this.ctx.stroke(this.gridPath);
  }

  private checkNeighbours(cell: Cell) {
    let livingNeighbours = 0;

    for (const key of cell.neighbours) {
      if (!key) continue;
      if (this.cells.get(key)?.active) livingNeighbours++;
    }

    if (livingNeighbours < 2) cell.liveOnNextTick = false;
    else if (cell.active && (livingNeighbours === 2 || livingNeighbours === 3)) cell.liveOnNextTick = true;
    else if (cell.active && livingNeighbours > 3) cell.liveOnNextTick = false;
    else if (!cell.active && livingNeighbours === 3) cell.liveOnNextTick = true;
  }

  nextTick() {
    this.cells.forEach((c) => this.checkNeighbours(c));
    this.cells.forEach((c) => c.evalNextTick());
  }

  run(interval = 2000) {
    if (!this.intervalId) this.intervalId = setInterval(this.nextTick, interval);
  }

  stop() {
    if (this.intervalId) clearInterval(this.intervalId);
    this.intervalId = null;
    // if (this.drawConsole) console.log(this.getCurrentPattern());
  }

  getCurrentPattern() {
    const pattern = Array(Math.floor(this.canvas.height / this.cellSize))
      .fill(null)
      .map(() => Array(Math.floor(this.canvas.width / this.cellSize)).fill(' '));

    let smallestX = Infinity;
    let largestX = 0;

    for (const [coordinates, cell] of this.cells.entries()) {
      const [x, y] = coordinates.split(',').map((c) => Math.floor(Number(c) / this.cellSize));
      if (cell.active) {
        pattern[y][x] = 'x';
        if (x < smallestX) smallestX = x;
        if (x > largestX) largestX = x;
      }
    }
    const outPattern = pattern.map((row) => row.join('').substring(smallestX, largestX + 1));
    let rightPointer = outPattern.length - 1;
    while (outPattern[rightPointer].trim().length === 0) {
      outPattern.pop();
      rightPointer--;
    }
    while (outPattern[0].trim().length === 0) {
      outPattern.shift();
    }
    return outPattern;
  }

  clear() {
    this.stop();
    this.cells.forEach((c) => {
      c.active = false;
      c.liveOnNextTick = false;
    });
  }

  toggleLargePaint() {
    this.largePaint = !this.largePaint;
  }

  reset(mode: Seed) {
    this.clear();
    this.seed(mode);
  }

  private seed(mode: Seed) {
    if (mode === 'random') this.pickRandomCells(this.startingCellNum);
    else this.drawPattern(ALL_SEEDS[mode]);
  }

  private pickRandomCells(num: number) {
    for (let i = 0; i < num; i++) {
      const randomX = Math.floor(Math.random() * this.canvas.width);
      const x = randomX - (randomX % this.cellSize);
      const randomY = Math.floor(Math.random() * this.canvas.height);
      const y = randomY - (randomY % this.cellSize);

      const cell = this.cells.get(x + ',' + y);
      if (cell) cell.active = true;
    }
  }

  private drawPattern(pattern: string[]) {
    let y =
      Math.floor((this.canvas.height / this.cellSize / 2) * this.cellSize) -
      Math.floor(pattern.length / 2) * this.cellSize;
    let maxRowLength = pattern[0].length;
    for (const row of pattern) {
      if (row.length > maxRowLength) maxRowLength = row.length;
    }
    const initX =
      Math.floor((Math.floor(this.canvas.width / this.cellSize) - maxRowLength) / 2) * this.cellSize - this.cellSize;
    for (let j = 0; j < pattern.length; j++) {
      let x = initX;
      const row = pattern[j];
      for (let i = 0; i < row.length; i++) {
        x += this.cellSize;
        if (row[i] === ' ') continue;
        const cell = this.cells.get(x + ',' + y);
        if (cell) cell.active = true;
      }
      y += this.cellSize;
    }
  }
}

class Cell {
  private isActive = false;
  private colors;
  liveOnNextTick = false;
  id: string;

  constructor(
    private coordinates: number[],
    private ctx: CanvasRenderingContext2D,
    public neighbours: Array<string | null>,
    activeColor: string,
    inactiveColor: string
  ) {
    this.coordinates = coordinates;
    this.ctx = ctx;
    this.neighbours = neighbours;
    this.colors = { active: activeColor, inactive: inactiveColor };
    this.id = coordinates.join();
  }

  get active() {
    return this.isActive;
  }

  set active(val: boolean) {
    if (this.isActive === val) return;
    this.isActive = val;
    const color = val ? this.colors.active : this.colors.inactive;
    this.draw(color);
  }

  draw(color: string) {
    const [x1, x2, y1, y2] = this.coordinates;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x1 + 2, y1 + 2, x2 - x1 - 4, y2 - y1 - 4);
  }

  evalNextTick() {
    this.active = this.liveOnNextTick;
  }
}
