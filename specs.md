# Project Specifications: Lit Game of Life

This document outlines the technical stack, coding conventions, and project structure for the Lit Game of Life project. It is intended to guide future development by an LLM or human developer.

## 1. Core Technology Stack

- **Language**: **TypeScript** (`~5.7.2`)
  - The project uses strict TypeScript to ensure type safety. Key `tsconfig.json` settings include `"strict": true` and `"moduleResolution": "bundler"`.
- **Framework**: **Lit** (`^3.2.1`)
  - The core of the application is a Web Component built with Lit. The main component `GameOfLife` extends `LitElement`.
- **Build Tool**: **Vite** (`^6.2.0`)
  - Vite is used for the development server and for building both the demo application and the distributable package. The project contains separate Vite configurations for these two purposes (`vite.demo.config.js` and `vite.package.config.js`).
- **Package Manager**: **pnpm**
  - The project is configured to use `pnpm`. All dependency management should be done via `pnpm` commands (e.g., `pnpm install`, `pnpm add`).

## 2. Code Style & Conventions

### TypeScript & Lit

- **Component Structure**: Components are defined as classes extending `LitElement`.
- **Decorators**: Lit's decorators are used extensively for defining custom elements, properties, and state.
  - `@customElement('tag-name')`: To define the component's HTML tag.
  - `@property()`: For public properties that can be configured via HTML attributes. Custom converters are used for complex attribute handling.
  - `@state()`: For internal component state that triggers a re-render when changed.
  - `@query('selector')`: To get a reference to an element in the component's shadow DOM.
- **Typing**: All properties, variables, and function parameters are explicitly typed. Lit's `PropertyValues` and `CSSResultGroup` are used where appropriate.
- **Lifecycle**: The component uses Lit's lifecycle methods like `firstUpdated` and `disconnectedCallback` for setup and teardown logic.

### Styling

- **CSS-in-TS**: Styles are defined in separate `.ts` files using Lit's `css` tagged template literal (e.g., `game-of-life-styles.ts`).
- **Static Styles**: The imported style modules are applied to components via the `static styles` class field.
- **Dynamic & Scoped Styles**: The component uses scoped styles within its shadow DOM. Dynamic styles based on component properties are implemented using `<style>` tags within the `render` method to inject CSS variables or rules.

### File Naming

- **Components**: `component-name.ts` (e.g., `game-of-life.ts`)
- **Styles**: `component-name-styles.ts` (e.g., `game-of-life-styles.ts`)
- **Logic/Libraries**: Descriptive names (e.g., `game.ts`, `patterns.ts`)

## 3. Project Structure

```
/
├── dist/                  # Build output for the package and demo
├── src/                   # All source code
│   ├── components/        # Lit component definitions and their styles
│   ├── lib/               # Core application logic (e.g., game engine)
│   ├── index.ts           # Main entry point for the package
│   └── index.css          # Global styles for the demo page
├── index.html             # HTML entry point for the demo application
├── package.json           # Project metadata and dependencies
├── pnpm-lock.yaml         # pnpm lockfile
├── tsconfig.json          # TypeScript configuration
└── vite.*.config.js       # Vite build configurations
```

## 4. Development Workflow

- **Run development server**: `pnpm dev`
- **Build demo application**: `pnpm build` or `pnpm build:demo`
- **Build distributable package**: `pnpm build:package`
- **Preview production build**: `pnpm preview`
