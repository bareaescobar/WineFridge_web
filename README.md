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

# Mosquitto MQTT broker (TCP + WebSocket)
Managing comunication (pub/sub) between Rasbery PI, web, ESP32

## Installing Mosquitto via Homebrew (macOS)
```bash
brew install mosquitto
brew services start mosquitto
```
By default, the broker only listens on localhost. You need to manually create a config file.

### Creating the Configuration File
> The broker should have WebSocket setup in configuration file.

Create a mosquitto.conf file, for example: ./mosquitto/mosquitto.conf

Add these lines to the file:

```txt
listener 1883
protocol mqtt

listener 9001
protocol websockets

allow_anonymous true
```

### Starting Mosquitto with This Config

```bash
mosquitto -c ./mosquitto/mosquitto.conf -v
```

The -v parameter allows to see the logs.

# Features (FRIDGE ONLY)
## 3. Bottle Loading (Web + MQTT)
This module implements the complete cycle of adding a wine bottle to the fridge:  
from barcode scanning to physical bottle placement in the drawer.

## MQTT Topics

| Name      | Topic                       | Direction |
| --------- | --------------------------- | --------- |
| RPI → Web | `winefridge/system/status`  | subscribe |

## Step-by-Step Instructions
### 1. Bottle Scanning

- Person is scanning the **barcode** of the **bottle**.
- Based on **topic** subscription recieving event with data:
```
{
  "barcode": "8410415520628" 
}
``` 
- Search by barcode in local collection: `wineCatalog.json`

- If found, shown page with wine data:
<img width="361" alt="image" src="https://github.com/user-attachments/assets/bd55d052-3e71-4765-a590-15d157199b1a" />

- If not found, shown page with 'Not found' error:
<img width="353" alt="image" src="https://github.com/user-attachments/assets/5dea3ea7-8840-446b-99ab-3dd7014cb649" />

### 2. Loading Confirmation

- User clicks **"Confirm & Load Bottle"**
- MQTT command `start_load` is sent:
#### Web → RPI:
```json
{
    "timestamp": "2025-06-10T12:00:00Z",
    "source": "web_client",
    "target": "rpi_server",
    "message_type": "command",
    "payload": {
        "action": "start_load",
        "barcode": "8410415520628",
        "bottle_info": {
            "name": "Señorío de los Llanos",
            "type": "Reserva",
            "region": "Valdepeñas",
            "vintage": "2018"
        }
    }
}
```

### 3. Receiving Response from RPI
Expected that bottle loaded at a specific position.
#### RPI → Web
#### [TEST MODE] Bottle loading emulation command: 
```bash
mosquitto_pub -h localhost -p 1883 -t 'winefridge/system/status' -m '{
  "action": "expect_bottle",
  "position": 3,
  "barcode": "8410415520628",
  "bottle_info": {
    "name": "Señorío de los Llanos",
    "type": "Reserva",
    "region": "Valdepeñas",
    "vintage": "2018"
  },
  "timeout_ms": 30000,
  "timestamp": "2025-06-10T12:00:05Z"
}'
```
- As a result the next page is shown:
<img width="260" alt="image" src="https://github.com/user-attachments/assets/057b5e93-4b3a-42d4-b4cf-621673a8c1c8" />

### 4. Waiting for Drawer Events
After bottle placement, the system can receive several possible events:

#### [TEST MODE] Successful Placement emulation command:
```bash
mosquitto_pub -h localhost -p 1883 -t 'winefridge/system/status' -m '{
  "event": "bottle_placed",
  "drawer_id": "drawer_1",
  "position": 3,
  "barcode": "8410415520628",
  "weight": 1120.5,
  "timestamp": "2025-06-10T12:00:15Z",
  "success": true
}'
```

- The page is shown:
<img width="251" alt="image" src="https://github.com/user-attachments/assets/31315586-b9db-4126-9548-ae53366a8d0f" />

#### [TEST MODE] Timeout emulation command:
```bash
mosquitto_pub -h localhost -p 1883 -t 'winefridge/system/status' -m '{
  "error_type": "bottle_placement_timeout",
  "drawer_id": "drawer_1",
  "position": 3,
  "expected_barcode": "8410415520628",
  "message": "Bottle placement timeout after 30 seconds",
  "timestamp": "2025-06-10T12:00:35Z"
}'
```

- The page is shown with Timeout error:
<img width="255" alt="image" src="https://github.com/user-attachments/assets/cad9e7b0-c526-4caa-86ef-d3afa2daaec8" />

#### [TEST MODE] Bottle in Wrong Position emulation command:
```bash
mosquitto_pub -h localhost -p 1883 -t 'winefridge/system/status' -m '{
  "error_type": "bottle_placement_wrong_position",
  "drawer_id": "drawer_1",
  "expected_position": 3,
  "actual_position": 5,
  "expected_barcode": "8410415520628",
  "actual_barcode": "8410415520628",
  "message": "Bottle was placed in the wrong position",
  "timestamp": "2025-06-10T12:00:20Z"
}'
```

- The page is shown:
<img width="255" alt="image" src="https://github.com/user-attachments/assets/e1bb3fd1-540d-42b9-9004-1000b5144d40" />
