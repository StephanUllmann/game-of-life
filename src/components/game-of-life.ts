import { CSSResultGroup, html, LitElement, PropertyValues } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { ALL_SEEDS, Game, seed } from '../lib/game';
import { styles } from './game-of-life-styles';
const validSeeds = Object.keys(ALL_SEEDS);

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

  @query('#controls')
  controlsEl!: HTMLDialogElement;

  @state()
  game: Game | null = null;

  @state()
  running = false;

  @state()
  largePaint = false;

  @state()
  controlsOpen = false;

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
    // this.controlsEl.showModal();
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
      <canvas style="background-color: ${this.bgColor}"></canvas>
      ${this.controls &&
      html` <button class="control-btn" @click=${() => (this.controlsOpen = !this.controlsOpen)}>
          <svg width="25" height="25" viewBox="0 -8 72 72">
            <g>
              <title>Settings</title>
              <path
                fill="currentcolor"
                d="M56.74,20.89l-1-2.31c3.33-7.53,3.11-7.75,2.46-8.41L54,6l-.42-.35h-.49c-.26,0-1,0-7.51,2.93l-2.38-1C40.09,0,39.77,0,38.87,0h-6c-.9,0-1.25,0-4.1,7.66l-2.37,1C22,6.78,19.45,5.84,18.75,5.84l-.56,0-4.58,4.49c-.7.65-.94.88,2.58,8.3l-1,2.3c-7.79,3-7.79,3.3-7.79,4.23v5.89c0,.92,0,1.25,7.82,4l1,2.29c-3.33,7.53-3.11,7.76-2.46,8.41L18,50l.42.37h.5c.25,0,1,0,7.5-3l2.38,1C31.9,56,32.21,56,33.12,56h6c.92,0,1.25,0,4.11-7.66l2.39-1c4.37,1.85,6.93,2.79,7.61,2.79l.57,0,4.62-4.52c.66-.66.89-.89-2.62-8.28l1-2.3c7.81-3,7.81-3.33,7.81-4.23V24.93C64.57,24,64.57,23.68,56.74,20.89ZM36,37.8A9.8,9.8,0,1,1,46,28,9.91,9.91,0,0,1,36,37.8Z"
              ></path>
            </g>
          </svg>
        </button>
        <div class=${this.controlsOpen ? 'controls controls--open' : 'controls'} id="controls">
          <div>
            <select
              @change=${(e: InputEvent) => {
                this.seed = (e.target as HTMLInputElement)!.value as seed;
                if (this.game) this.game.reset(this.seed);
                this.running = false;
              }}
            >
              ${validSeeds.map((seed) => html`<option value=${seed} ?selected=${this.seed === seed}>${seed}</option>`)}
            </select>
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
            <div class="control-group">
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
            </div>

            <div>
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
            </div>
            ${this.drawConsole
              ? html`<button @click=${() => console.log(this.game?.getCurrentPattern())}>Print to Console</button>`
              : ''}
            <button
              @click=${() => {
                if (this.game) this.game.reset(this.seed);
                this.running = false;
              }}
            >
              Reset
            </button>
          </div>
        </div>`}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'game-of-life': GameOfLife;
  }
}
