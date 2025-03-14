import { css, CSSResultGroup, html, LitElement, PropertyValues } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { Game } from '../lib/game';

@customElement('game-of-life')
export class GameOfLife extends LitElement {
  @property({ attribute: 'color' })
  bgColor = 'darkslateblue';

  @property({ type: Number, attribute: 'starting-number' })
  startingCellNum: number = 42;

  static styles?: CSSResultGroup | undefined = css`
    :host {
      position: relative;
      width: 40rem;
      height: 30rem;
    }
    h1 {
      position: absolute;
      top: -1.75rem;
      margin: 0;
      font-size: 1.5rem;
    }

    canvas {
      position: absolute;
      width: 100%;
      height: 100%;
      inset: 0;
      z-index: 0;
    }
  `;

  @query('canvas')
  canvas!: HTMLCanvasElement;

  @state()
  game: Game | null = null;

  protected firstUpdated(_changedProperties: PropertyValues): void {
    this.game = new Game(this.canvas, this.bgColor, this.startingCellNum);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.game?.removeEventListeners();
  }

  render() {
    return html`
      <h1>Conway's Game of Life</h1>
      <canvas style="background-color: ${this.bgColor}"></canvas>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'game-of-life': GameOfLife;
  }
}
