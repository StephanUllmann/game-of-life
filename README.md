# Game of Life Web Component

A customizable Conway's Game of Life implementation as a web component built with Lit.

## Properties

The component accepts the following attributes:

| Attribute         | Type    | Default           | Description                                              |
| ----------------- | ------- | ----------------- | -------------------------------------------------------- |
| `bg-color`        | String  | `'darkslateblue'` | Background color of the canvas                           |
| `color`           | String  | `'white'`         | Color of the cells                                       |
| `cell-size`       | Number  | `20`              | Size of each cell in pixels                              |
| `starting-number` | Number  | `42`              | Number of initial cells when using random seed           |
| `interval`        | Number  | `1000`            | Interval between generations in milliseconds             |
| `controls`        | Boolean | `false`           | Whether to show control buttons                          |
| `draw-console`    | Boolean | `false`           | Whether to enable console logging features               |
| `size`            | String  | `'large'`         | Size of the canvas (`'large'`, `'medium'`, or `'small'`) |
| `seed`            | String  | `'random'`        | Initial pattern seed                                     |

## Seeds

The component comes with several predefined patterns:

- `random`: Randomly placed cells (default)
- `acorn`: A small pattern that grows significantly
- `long gun`: A pattern that procreates across the canvas
- `gospher glider gun`: The first known gun pattern, periodically creates gliders
- `simkin glider gun`: Another type of glider gun
- `pulsar`: A highly symmetric period 3 oscillator
- `spaceship`: A pattern that moves across the grid
- `long frame`: A large stable pattern
- `WBS`: A long living pattern from letters
- More to be added

## Examples

### Basic Usage

```html
<game-of-life></game-of-life>
```

### Custom Styling

```html
<game-of-life bg-color="black" color="green" cell-size="10"> </game-of-life>
```

### With Controls

```html
<game-of-life controls seed="pulsar" interval="500"> </game-of-life>
```

### Small Size

```html
<game-of-life size="small" starting-number="20"> </game-of-life>
```

## Features

- Interactive cellular automaton based on Conway's Game of Life rules
- Customizable appearance (colors, cell size)
- Adjustable simulation speed
- Multiple predefined patterns
- Play, pause, and step-by-step controls
- Canvas size options
- Cell painting capabilities with standard (1 cell) and large (3x3) brush options
- Pattern reset and clear functions

## Game Rules

Conway's Game of Life follows these rules:

1. Any live cell with fewer than two live neighbors dies (underpopulation)
2. Any live cell with two or three live neighbors lives on to the next generation
3. Any live cell with more than three live neighbors dies (overpopulation)
4. Any dead cell with exactly three live neighbors becomes a live cell (reproduction)

## Interactive Controls

When the `controls` attribute is enabled, the component provides the following user interface:

- Play/Pause button: Toggle simulation
- Settings button: Open control panel
- Pattern selector: Choose from predefined patterns
- Paint toggle: Switch between 1-cell and 9-cell painting mode
- Clear button: Remove all active cells
- Step button: Advance one generation
- Speed slider: Adjust simulation interval
- Size selector: Switch between canvas sizes
- Reset button: Return to initial pattern

## Methods

The Game class exposes the following methods:

- `play()`: Start the simulation
- `stop()`: Stop the simulation
- `togglePlay()`: Toggle between play and pause
- `nextTick()`: Advance one generation
- `reset(seed)`: Reset to specified pattern
- `clear()`: Remove all cells
- `toggleLargePaint()`: Switch between normal and large painting mode

## Browser Support

This component uses modern web technologies and requires a browser that supports:

- Custom Elements v1
- ES6 features
- Canvas API

## Dependencies

- Lit: For the web component implementation

## License

MIT
