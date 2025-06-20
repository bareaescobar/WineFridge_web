# Smart Wine Fridge Web UI

A modern web interface for managing your smart wine fridge.

## Prerequisites

- Node.js (v18 or higher recommended)
- pnpm package manager (recommended)
- npm (alternative)

## Technology Stack

- Build tool: Vite
- UI Components: Swiper
- Package manager: pnpm (recommended) / npm
- Code Formatting: Prettier

## Installation

1. Clone the repository:
```bash
git clone https://github.com/andriyl/smart-wine-fridge_web.git
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

## Development

### Running the Development Server

```bash
pnpm dev
# or
npm run dev
```

This will start the development server with hot module replacement (HMR) enabled. The app will be available at `http://localhost:5173`.

### Building for Production

```bash
pnpm build
# or
npm run build
```

This will create a production-ready build in the `dist` directory.

### Previewing Production Build

```bash
pnpm preview
# or
npm run preview
```

This will serve the production build locally for testing.

## Code Style and Formatting

The project uses Prettier for code formatting. You can:

- Check formatting:
```bash
pnpm format:check
# or
npm run format:check
```

- Automatically format code:
```bash
pnpm format
# or
npm run format
```

## Deployment

The application is built using Vite and can be deployed to any static hosting service. After building with `npm run build`, the contents of the `dist` directory can be deployed.

## Project Structure

- `/src` - Source code
- `/content` - Project content and configuration
  - `main.json` - Main configuration file
- `/dist` - Production build output

## Pages

| File Name | Description |
|-----------|-------------|
| auth | User authentication |
| forgot-password | Password reset functionality |
| connect-fridge | Initial fridge connection setup |
| setup-fridge | Fridge configuration |
| index | Main dashboard |
| account | User profile management |
| notifications | Notification center |
| load-bottle | Add new wines |
| unload-bottle | Remove wines |
| unauthorized-unload | Handling unauthorized wine removal |
| swap-bottle | Wine swapping functionality |
| drawer | Wine drawer management |
| red-wines | Red wine inventory |
| white-wines | White wine inventory |
| rose-wines | Rosé wine inventory |
| routes | All routes |

## Phase 2 - Estimate
| Task | Development Hours | Testing Hours | Total Hours |
| --- | --- | --- | --- |
| **Project Setup** | 7 | 3 | 10 |
| \- JS modules, MQTT WebSocket, routing | 7 | 3 |  |
| **Home Dashboard** | 12 | 4 | 16 |
| \- Static capacity overview (API) | 4 | 1 |  |
| \- Basic zone cards (static) | 5 | 2 |  |
| \- Control buttons (load/unload) | 3 | 1 |  |
| **Load Bottle Workflow** | 22 | 6 | 28 |
| \- Barcode scanning (API, UI) | 5 | 1 |  |
| \- Wine info modal (API) | 5 | 2 |  |
| \- Manual entry (name, year) | 4 | 1 |  |
| \- Placement (MQTT LED/weight) | 5 | 1 |  |
| \- Error handling (barcode, placement) | 3 | 1 |  |
| **Unload Bottle Workflow** | 18 | 5 | 23 |
| \- Manual selection grid (API, search) | 5 | 1 |  |
| \- Wine detail confirmation | 5 | 2 |  |
| \- Removal (MQTT LED, DB update) | 5 | 1 |  |
| \- Success modal | 3 | 1 |  |
| **Final Testing/Debugging** | 0 | 13 | 13 |
| \- System-wide testing (RPI, MQTT/API) | 0 | 8 |  |
| \- Debug edge cases (network delays) | 0 | 5 |  |
| **Buffer (Backend Integration/Issues)** | 0 | 15 | 15 |
| \- API/MQTT coordination, delays | 0 | 15 |  |
| **Total** | **59** | **46** | **105** |

### Questions:
1. How run server (PI) ?








