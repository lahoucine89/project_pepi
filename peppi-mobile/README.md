# Peppi Mobile

Peppi Mobile is a React Native and Expo prototype for a student desktop experience on mobile. It brings common study services into one app: study progress, course enrollment, grades, weekly schedule, study plan, campus locations, messages, profile, settings, and achievement progress.

The app is built with Expo Router, TypeScript, and reusable React Native UI styles. Most screens currently use local prototype data so the user flow can be tested without connecting to a live Peppi system.

## Main Features

- Home dashboard with study progress, ECTS summary, GPA, shortcuts, and achievement progress.
- Course enrollment screen with course search and enrollment actions.
- Grades screen with course results, ECTS, assessment status, and teacher notes.
- Weekly schedule screen with day filters and course session details.
- Study plan screen with completed, enrolled, and planned courses by semester.
- Messages inbox for course announcements and study updates.
- Campus map search for rooms, buildings, and services.
- Profile and settings sections for student information and app preferences.
- Assistant chat screen that can send messages to a configured backend endpoint.

## Tech Stack

- Expo 54
- React 19
- React Native 0.81
- Expo Router
- TypeScript
- React Navigation bottom tabs
- EAS configuration for builds

## Project Structure

```text
peppi-mobile/
  app/                  App routes and screens
    (tabs)/             Main tab screens and hidden feature screens
    ai.tsx              Assistant chat screen
    _layout.tsx         Root layout
  assets/               Icons, splash image, and app images
  components/           Shared UI components
  constants/            Theme constants
  hooks/                Shared React hooks
  scripts/              Utility scripts
  src/ui.ts             Shared colors, spacing, typography, and UI styles
  app.json              Expo app configuration
  eas.json              EAS build configuration
  package.json          Dependencies and scripts
```

## Requirements

Install these before running the project:

- Node.js 20 or newer
- npm
- Expo Go on a physical Android or iOS device, or an emulator/simulator
- Android Studio if using an Android emulator
- Xcode if using an iOS simulator on macOS

## Setup

1. Open a terminal in the project folder:

   ```bash
   cd "C:\Users\houci\OneDrive\Bureau\project_pepi\peppi-mobile"
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the Expo development server:

   ```bash
   npm start
   ```

4. Open the app:

   - Scan the QR code with Expo Go on your phone.
   - Press `a` in the terminal to open Android.
   - Press `i` in the terminal to open iOS on macOS.
   - Press `w` in the terminal to open the web version.

## Available Scripts

```bash
npm start
```

Starts Expo and shows options for mobile, emulator, simulator, and web.

```bash
npm run android
```

Starts the app on an Android emulator or connected Android device.

```bash
npm run ios
```

Starts the app on an iOS simulator. This requires macOS and Xcode.

```bash
npm run web
```

Runs the app in a browser.

```bash
npm run lint
```

Runs Expo lint checks.

```bash
npm run reset-project
```

Resets the starter project structure. Use this carefully because it moves the current app files.

## Backend Endpoint

The assistant chat screen sends requests to an API endpoint defined in:

```text
app/ai.tsx
```

Look for `API_URL` and update it if the backend tunnel or server address changes. The endpoint should accept a `POST` request with a JSON body containing `messages` and return JSON with a `reply` field.

Example response:

```json
{
  "reply": "Here is the answer shown in the chat."
}
```

If the endpoint is not running or the tunnel URL is expired, the chat screen will show an error message instead of a reply.

## Build

The project includes `eas.json`, so production builds can be created with EAS Build after logging in and configuring the Expo project.

Install the EAS CLI if needed:

```bash
npm install -g eas-cli
```

Log in:

```bash
eas login
```

Create an Android build:

```bash
eas build -p android
```

Create an iOS build:

```bash
eas build -p ios
```

## Notes

- The app currently uses prototype data for courses, grades, schedule, messages, study progress, and map results.
- Several buttons demonstrate the intended user flow but do not yet save data to a real backend.
- If the app is tested on a physical phone, the phone and development machine should be on the same network unless a tunnel is used.
- If Expo Go has trouble connecting, restart the dev server with:

  ```bash
  npx expo start --tunnel
  ```

## Troubleshooting

If dependencies fail to install, delete `node_modules` and reinstall:

```bash
npm install
```

If Expo cache causes stale screens, restart with a clean cache:

```bash
npx expo start -c
```

If Android does not open, make sure Android Studio is installed, an emulator is running, or a device is connected with USB debugging enabled.

If iOS does not open, make sure the project is running on macOS with Xcode installed.
