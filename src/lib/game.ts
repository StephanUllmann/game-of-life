export class Game {
  private canvas;
  private ctx;
  private cells: Map<string, Cell>;
  private gridPath: Path2D;
  private gap = 20;
  private white = 'oklch(100% 0 0 / 30%)';
  private whiteFull = 'oklch(100% 0 0 / 100%)';
  private strokeWidth = 1;
  private currMousePos = [0, 0];
  private currHoveredCell: Cell | null = null;
  private bgColor;
  private startingCellNum;

  constructor(canvas: HTMLCanvasElement, bgColor: string, startingCellNum = 42) {
    this.canvas = canvas;
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
    this.bgColor = bgColor;
    this.startingCellNum = startingCellNum;
    this.ctx = this.canvas.getContext('2d');
    this.cells = new Map<string, Cell>();
    this.gridPath = new Path2D();

    this.createGrid();

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setEventListeners();
    this.pickRandomCells(this.startingCellNum);
  }

  createGrid() {
    const tempCells = [];
    for (let i = 0, j = 0; i < this.canvas.width; i += this.gap, j++) {
      tempCells.push([i, i + this.gap]);
      this.gridPath.moveTo(i, 0);
      this.gridPath.lineTo(i, this.canvas.height);
    }
    for (let i = 0, j = 0; i < this.canvas.height; i += this.gap, j++) {
      for (const cell of tempCells) {
        const tl = cell[0] > 0 && i > 0 ? cell[0] - this.gap + ',' + (i - this.gap) : null;
        const t = i > 0 ? cell[0] + ',' + (i - this.gap) : null;
        const tr = cell[0] < this.canvas.width - this.gap && i > 0 ? cell[0] + this.gap + ',' + (i - this.gap) : null;
        const l = cell[0] > 0 ? cell[0] - this.gap + ',' + i : null;
        const r = cell[0] < this.canvas.width - this.gap ? cell[0] + this.gap + ',' + i : null;
        const bl = cell[0] > 0 && i < this.canvas.height - this.gap ? cell[0] - this.gap + ',' + (i + this.gap) : null;
        const b = i < this.canvas.height - this.gap ? cell[0] + ',' + (i + this.gap) : null;
        const br =
          cell[0] < this.canvas.width - this.gap && i < this.canvas.height - this.gap
            ? cell[0] + this.gap + ',' + (i + this.gap)
            : null;

        const neighbours = [tl, t, tr, l, r, bl, b, br];

        const newCell = new Cell([...cell, i, i + this.gap], this.ctx!, neighbours, this.whiteFull, this.bgColor);
        this.cells.set(cell[0] + ',' + i, newCell);
      }
      this.gridPath.moveTo(0, i);
      this.gridPath.lineTo(this.canvas.width, i);
    }
    this.drawGrid();
  }

  setEventListeners() {
    this.canvas.addEventListener('mousemove', this.handleMouseMove);
    this.canvas.addEventListener('mouseleave', this.handleMouseLeave);
    this.canvas.addEventListener('click', this.handleClick);
  }

  removeEventListeners() {
    this.canvas.removeEventListener('mousemove', this.handleMouseMove);
    this.canvas.removeEventListener('mouseleave', this.handleMouseLeave);
    this.canvas.removeEventListener('click', this.handleClick);
  }
  handleMouseLeave() {
    this.currHoveredCell = null;
  }

  handleMouseMove(e: MouseEvent) {
    const x = e.offsetX - (e.offsetX % this.gap);
    const y = e.offsetY - (e.offsetY % this.gap);
    if (this.currMousePos[0] === x && this.currMousePos[1] === y) return;
    this.currMousePos[0] = x;
    this.currMousePos[1] = y;
    // let oldCell = this.currHoveredCell;
    // if (this.currHoveredCell) this.currHoveredCell!.active = false;
    this.currHoveredCell = this.cells.get(x + ',' + y) || null;
    // if (oldCell && !this.currHoveredCell?.active) oldCell!.active = false;
    // if (this.currHoveredCell) this.currHoveredCell!.active = true;
  }

  handleClick() {
    if (this.currHoveredCell) this.currHoveredCell.active = !this.currHoveredCell.active;
    console.log(this.currHoveredCell);
    // this.currHoveredCell = null;
    this.currHoveredCell?.neighbours.forEach((n) => {
      const c = this.cells.get(n);
      if (c) c.active = !c.active;
    });
  }

  drawGrid() {
    if (!this.ctx || !this.gridPath) return;

    this.ctx.strokeStyle = this.white;
    this.ctx.lineWidth = this.strokeWidth;
    this.ctx.stroke(this.gridPath);
  }

  pickRandomCells(num: number) {
    for (let i = 0; i < num; i++) {
      const randomX = Math.floor(Math.random() * this.canvas.width);
      const x = randomX - (randomX % this.gap);
      const randomY = Math.floor(Math.random() * this.canvas.height);
      const y = randomY - (randomY % this.gap);

      const cell = this.cells.get(x + ',' + y);
      if (cell) cell.active = true;
    }
  }
}
type Neighbours = {
  tl: string | null;
  t: string | null;
  tr: string | null;
  l: string | null;
  r: string | null;
  bl: string | null;
  b: string | null;
  br: string | null;
};
class Cell {
  private coordinates;
  private ctx;
  neighbours;
  private isActive = false;
  private colors;

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
}
