import { CSSResultGroup, html, LitElement, PropertyValues } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { Game, seed } from '../lib/game';
import { styles } from './game-of-life-styles';
const validSeeds: seed[] = ['random', 'acorn', 'long gun', 'gospher glider gun', 'pulsar', 'spaceship'];

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

  @property({ type: Boolean })
  controls = false;

  @property({ attribute: 'draw-console', type: Boolean })
  drawConsole = false;

  @property({ type: String })
  size: 'large' | 'medium' | 'small' = 'large';

  @property({
    converter: {
      fromAttribute(value: string): seed {
        if (validSeeds.includes(value as seed)) {
          return value as seed;
        }
        console.warn(`Invalid seed value: "${value}". Using "random" instead.`);
        return 'random';
      },
    },
  })
  seed: seed = 'random';

  @query('canvas')
  canvas!: HTMLCanvasElement;

  @state()
  game: Game | null = null;

  @state()
  running = false;

  @state()
  largePaint = true;

  protected firstUpdated(_changedProperties: PropertyValues): void {
    this.game = new Game(
      this.canvas,
      this.color,
      this.bgColor,
      this.cellSize,
      this.startingCellNum,
      this.seed
      // this.drawConsole
    );
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.game?.disconnect();
  }

  static styles?: CSSResultGroup | undefined = styles;

  render() {
    const largeCanvas = html`<style>
      :host {
        width: 100rem;
        height: 50rem;
      }
    </style>`;
    const smallCanvas = html`<style>
      :host {
        width: 40rem;
        height: 30rem;
      }
    </style>`;

    return html`
      ${this.size === 'large' ? largeCanvas : ''} ${this.size === 'small' ? smallCanvas : ''}
      <h1>Conway's Game of Life</h1>
      <canvas style="background-color: ${this.bgColor}"></canvas>
      ${this.controls &&
      html`<div class="controls">
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
        <input
          type="range"
          min="100"
          max="2000"
          value=${this.interval}
          @change=${(e: InputEvent) => {
            this.interval = +(e.target as HTMLInputElement)!.value;
            if (this.running) {
              this.game?.stop();
              this.game?.run(this.interval);
            }
          }}
        />
        <span>Interval: ${this.interval}ms</span>
        <button
          @click=${() => {
            if (this.game) this.game.reset(this.seed);
            this.running = false;
          }}
        >
          Reset
        </button>
        <select
          @change=${(e: InputEvent) => {
            this.seed = (e.target as HTMLInputElement)!.value as seed;
            if (this.game) this.game.reset(this.seed);
            this.running = false;
          }}
        >
          ${validSeeds.map((seed) => html`<option value=${seed} ?selected=${this.seed === seed}>${seed}</option>`)}
        </select>
        ${this.drawConsole
          ? html`<button @click=${() => console.log(this.game?.getCurrentPattern())}>Print to Console</button>`
          : ''}
        <label
          >Large
          <input
            type="radio"
            name="size"
            value="large"
            @change=${(e: InputEvent) => {
              this.size = (e.target as HTMLInputElement)!.value as 'large';
              setTimeout(() => {
                this.game?.resize();
              }, 0);
            }}
            ?checked=${this.size === 'large'}
        /></label>
        <label>
          Small
          <input
            type="radio"
            name="size"
            value="small"
            @change=${(e: InputEvent) => {
              this.size = (e.target as HTMLInputElement)!.value as 'small';
              setTimeout(() => {
                this.game?.resize();
              }, 0);
            }}
            ?checked=${this.size === 'small'}
          />
        </label>
      </div>`}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'game-of-life': GameOfLife;
  }
}
