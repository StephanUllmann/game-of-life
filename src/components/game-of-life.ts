import { css, CSSResultGroup, html, LitElement, PropertyValues } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { Game } from '../lib/game';

@customElement('game-of-life')
export class GameOfLife extends LitElement {
  @property({ attribute: 'bg-color' })
  bgColor = 'darkslateblue';

  @property({ attribute: 'color' })
  color = 'white';

  @property({ attribute: 'cell-size', type: Number })
  cellSize = 20;

  @property({ type: Number, attribute: 'starting-number' })
  startingCellNum: number = 42;

  @property({ type: Number })
  interval: number = 1000;

  @query('canvas')
  canvas!: HTMLCanvasElement;

  @state()
  game: Game | null = null;

  @state()
  running = false;

  @state()
  largePaint = true;

  protected firstUpdated(_changedProperties: PropertyValues): void {
    this.game = new Game(this.canvas, this.color, this.bgColor, this.cellSize, this.startingCellNum);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.game?.removeEventListeners();
  }

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
    .controls {
      position: absolute;
      bottom: -3rem;
    }
  `;

  render() {
    return html`
      <h1>Conway's Game of Life</h1>
      <canvas style="background-color: ${this.bgColor}"></canvas>
      <div class="controls">
        <button
          @click=${() => {
            if (this.game) {
              this.game.toggleLargePaint();
              this.largePaint = !this.largePaint;
            }
          }}
        >
          Paint Toggle: ${this.largePaint ? 9 : 1}
        </button>
        <button
          @click=${() => {
            if (this.game) this.game.clear();
            this.running = false;
          }}
        >
          Clear
        </button>
        ${this.running
          ? html`<button
              @click=${() => {
                if (this.game) this.game.stop();
                this.running = false;
              }}
            >
              Stop
            </button>`
          : html`<button
                @click=${() => {
                  if (this.game) this.game.run(this.interval);
                  this.running = true;
                }}
              >
                Run
              </button>
              <button
                @click=${() => {
                  if (this.game) this.game.nextTick();
                }}
              >
                Next Tick
              </button>`}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'game-of-life': GameOfLife;
  }
}
