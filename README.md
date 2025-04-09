# E-commerce Mobile App-mini

A React Native mobile application for e-commerce.

## Prerequisites

- React Native development environment setup
- Android: Android Studio

## Installation

1. Install dependencies:
```sh
npm install
```

## Running the App

1. Start Metro bundler:
```sh
npm start
```

2. Clean and Run on Android:
```sh
# Clean the project
cd android
./gradlew clean
cd ..

# Run the app
npx react-native run android
```

## Development

- The app uses Fast Refresh for instant updates during development
- Press `R` twice to reload the app
- Access Dev Menu: `Ctrl + M` (Windows/Linux) or `Cmd + M` (Mac)

## Project Structure

- `/src` - Source code
- `/src/components` - Reusable UI components
- `/src/screens` - Screen components
- `/src/navigation` - Navigation configuration
- `/src/services` - API and other services
- `/src/utils` - Utility functions
- `/src/assets` - Images and other static assets
