import { css } from 'lit';

export const styles = css`
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
