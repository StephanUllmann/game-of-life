import { gosperGliderGun, longGun } from './patterns';

export type seed = 'random' | 'long gun' | 'gospher glider gun';

export class Game {
  private canvas;
  private ctx;
  private cells: Map<string, Cell>;
  private gridPath: Path2D;
  private cellSize = 20;
  private white = 'oklch(100% 0 0 / 30%)';
  // private whiteFull = 'oklch(100% 0 0 / 100%)';
  private strokeWidth = 1;
  private currMousePos = [0, 0];
  private currHoveredCell: Cell | null = null;
  private color;
  private bgColor;
  private startingCellNum;
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private largePaint = true;

  constructor(
    canvas: HTMLCanvasElement,
    color: string,
    bgColor: string,
    cellSize: number,
    startingCellNum = 42,
    seed: seed
  ) {
    this.canvas = canvas;
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
    this.color = color;
    this.bgColor = bgColor;
    this.startingCellNum = startingCellNum;
    this.cellSize = cellSize;
    this.ctx = this.canvas.getContext('2d');
    this.cells = new Map<string, Cell>();
    this.gridPath = new Path2D();

    this.createGrid();

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleClick = this.handleClick.bind(this);
    // this.run = this.run.bind(this);
    this.nextTick = this.nextTick.bind(this);
    this.setEventListeners();
    this.seed(seed);
    // this.cells.forEach((c) => this.checkNeighbours(c));
  }

  createGrid() {
    const tempCells = [];
    for (let i = 0, j = 0; i < this.canvas.width; i += this.cellSize, j++) {
      tempCells.push([i, i + this.cellSize]);
      this.gridPath.moveTo(i, 0);
      this.gridPath.lineTo(i, this.canvas.height);
    }
    for (let i = 0, j = 0; i < this.canvas.height; i += this.cellSize, j++) {
      for (const cell of tempCells) {
        const tl = cell[0] > 0 && i > 0 ? cell[0] - this.cellSize + ',' + (i - this.cellSize) : null;
        const t = i > 0 ? cell[0] + ',' + (i - this.cellSize) : null;
        const tr =
          cell[0] < this.canvas.width - this.cellSize && i > 0
            ? cell[0] + this.cellSize + ',' + (i - this.cellSize)
            : null;
        const l = cell[0] > 0 ? cell[0] - this.cellSize + ',' + i : null;
        const r = cell[0] < this.canvas.width - this.cellSize ? cell[0] + this.cellSize + ',' + i : null;
        const bl =
          cell[0] > 0 && i < this.canvas.height - this.cellSize
            ? cell[0] - this.cellSize + ',' + (i + this.cellSize)
            : null;
        const b = i < this.canvas.height - this.cellSize ? cell[0] + ',' + (i + this.cellSize) : null;
        const br =
          cell[0] < this.canvas.width - this.cellSize && i < this.canvas.height - this.cellSize
            ? cell[0] + this.cellSize + ',' + (i + this.cellSize)
            : null;

        const neighbours = [tl, t, tr, l, r, bl, b, br];

        const newCell = new Cell([...cell, i, i + this.cellSize], this.ctx!, neighbours, this.color, this.bgColor);
        this.cells.set(cell[0] + ',' + i, newCell);
      }
      this.gridPath.moveTo(0, i);
      this.gridPath.lineTo(this.canvas.width, i);
    }
    this.drawGrid();
  }

  private setEventListeners() {
    this.canvas.addEventListener('mousemove', this.handleMouseMove);
    this.canvas.addEventListener('mouseleave', this.handleMouseLeave);
    this.canvas.addEventListener('click', this.handleClick);
  }

  disconnect() {
    this.removeEventListeners();
  }

  private removeEventListeners() {
    this.canvas.removeEventListener('mousemove', this.handleMouseMove);
    this.canvas.removeEventListener('mouseleave', this.handleMouseLeave);
    this.canvas.removeEventListener('click', this.handleClick);
    if (this.intervalId) clearInterval(this.intervalId);
  }

  private handleMouseLeave() {
    this.currHoveredCell = null;
  }

  private handleMouseMove(e: MouseEvent) {
    const x = e.offsetX - (e.offsetX % this.cellSize);
    const y = e.offsetY - (e.offsetY % this.cellSize);
    if (this.currMousePos[0] === x && this.currMousePos[1] === y) return;
    this.currMousePos[0] = x;
    this.currMousePos[1] = y;
    // let oldCell = this.currHoveredCell;
    // if (this.currHoveredCell) this.currHoveredCell!.active = false;
    this.currHoveredCell = this.cells.get(x + ',' + y) || null;
    // if (oldCell && !this.currHoveredCell?.active) oldCell!.active = false;
    // if (this.currHoveredCell) this.currHoveredCell!.active = true;
  }

  private handleClick() {
    if (this.currHoveredCell) this.currHoveredCell.active = !this.currHoveredCell.active;
    // if (this.currHoveredCell) this.checkNeighbours(this.currHoveredCell);
    if (this.largePaint)
      this.currHoveredCell?.neighbours.forEach((n) => {
        const c = n ? this.cells.get(n) : null;
        if (c) c.active = !c.active;
      });
  }

  private drawGrid() {
    if (!this.ctx || !this.gridPath) return;

    this.ctx.strokeStyle = this.white;
    this.ctx.lineWidth = this.strokeWidth;
    this.ctx.stroke(this.gridPath);
  }

  private checkNeighbours(cell: Cell) {
    let livingNeighbours = 0;

    for (let key of cell.neighbours) {
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

  reset(mode: seed) {
    this.clear();
    this.seed(mode);
  }

  private seed(mode: seed) {
    switch (mode) {
      case 'long gun':
        this.drawPattern(longGun);
        break;
      case 'gospher glider gun':
        this.drawPattern(gosperGliderGun);
        break;
      case 'random':
      default:
        this.pickRandomCells(this.startingCellNum);
    }
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
      Math.floor(pattern.length / 2) * this.cellSize -
      this.cellSize;
    let maxRowLength = pattern[0].length;
    for (let row of pattern) {
      if (row.length > maxRowLength) maxRowLength = row.length;
    }
    const initX =
      Math.floor((Math.floor(this.canvas.width / this.cellSize) - maxRowLength) / 2) * this.cellSize - this.cellSize;
    console.log(initX);
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
  private coordinates;
  private ctx;
  neighbours;
  private isActive = false;
  private colors;
  liveOnNextTick = false;

  constructor(
    coordinates: number[],
    ctx: CanvasRenderingContext2D,
    neighbours: Array<string | null>,
    activeColor: string,
    inactiveColor: string
  ) {
    this.coordinates = coordinates;
    this.ctx = ctx;
    this.neighbours = neighbours;
    this.colors = { active: activeColor, inactive: inactiveColor };
  }

  get active() {
    return this.isActive;
  }

  set active(val: boolean) {
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
