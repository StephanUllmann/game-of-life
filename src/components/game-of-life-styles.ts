import { css } from 'lit';

export const styles = css`
  :host {
    position: relative;
    overflow: hidden;
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
    --color: #000000b3;
    position: absolute;
    top: 0;
    right: 0;
    background-color: #ffffff36;
    padding: 0.5rem;
    border: 1px solid var(--color);
    inset-block: 50%;
    border-radius: 5px 0 0 5px;
    height: fit-content;
    translate: 100% -50%;
    transition: 200ms ease-in-out;
    font-size: 0.75rem;

    label:has([type='radio']) {
      display: inline-flex;
    }
  }

  .controls--open {
    translate: 0% -50%;
  }

  .controls > div {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    top: 0;

    button {
      cursor: pointer;
      border: none;
      border-radius: 5px;
    }
  }

  .control-group {
    display: flex;
    flex-direction: column;
    gap: -1rem;
    align-items: flex-end;
    span {
      margin-top: -0.25rem;
    }
  }
  .control-btn {
    --color: #000000b3;
    z-index: 2;
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    border: 1px solid var(--color);
    background-color: #ffffff36;
    padding: 0.125rem;
    border-radius: 50%;
    display: grid;
    place-content: center;
    color: var(--color);
    cursor: pointer;

    &:hover {
      --color: #00000065;
    }
  }
`;
