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

  constructor(canvas: HTMLCanvasElement, bgColor: string) {
    this.canvas = canvas;
    const rect = canvas.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
    this.bgColor = bgColor;
    this.ctx = this.canvas.getContext('2d');
    this.cells = new Map<string, Cell>();
    this.gridPath = new Path2D();
    const tempCells = [];
    for (let i = 0, j = 0; i < this.canvas.width; i += this.gap, j++) {
      tempCells.push([i, i + this.gap]);
      this.gridPath.moveTo(i, 0);
      this.gridPath.lineTo(i, this.canvas.height);
    }
    for (let i = 0, j = 0; i < this.canvas.height; i += this.gap, j++) {
      for (const cell of tempCells) {
        const newCell = new Cell([...cell, i, i + this.gap], this.ctx!, this.whiteFull, this.bgColor);
        this.cells.set(cell[0] + ',' + i, newCell);
      }
      this.gridPath.moveTo(0, i);
      this.gridPath.lineTo(this.canvas.width, i);
    }
    console.log(this.canvas.height, this.canvas.width);

    this.drawGrid();
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setEventListeners();
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
    if (this.currHoveredCell) this.currHoveredCell!.active = false;
    this.currHoveredCell = null;
  }

  handleMouseMove(e: MouseEvent) {
    const x = e.offsetX - (e.offsetX % this.gap);
    const y = e.offsetY - (e.offsetY % this.gap);
    if (this.currMousePos[0] === x && this.currMousePos[1] === y) return;
    this.currMousePos[0] = x;
    this.currMousePos[1] = y;
    let oldCell = this.currHoveredCell;
    // if (this.currHoveredCell) this.currHoveredCell!.active = false;
    this.currHoveredCell = this.cells.get(x + ',' + y) || null;
    if (oldCell && !this.currHoveredCell?.active) oldCell!.active = false;
    if (this.currHoveredCell) this.currHoveredCell!.active = true;
  }

  handleClick() {
    this.currHoveredCell = null;
  }

  drawGrid() {
    if (!this.ctx || !this.gridPath) return;

    this.ctx.strokeStyle = this.white;
    this.ctx.lineWidth = this.strokeWidth;
    this.ctx.stroke(this.gridPath);
  }
}

class Cell {
  private coordinates;
  private ctx;
  private isActive = false;
  private colors;

  constructor(coordinates: number[], ctx: CanvasRenderingContext2D, activeColor: string, inactiveColor: string) {
    this.coordinates = coordinates;
    this.ctx = ctx;
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
