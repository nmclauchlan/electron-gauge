# Electron Gauge

This project is a simple electron app that displays a gauge. It was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and uses Electron for the desktop application.

## Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs both the React app and Electron in development mode concurrently (prefered for quick-start).


### `yarn start`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

### `yarn electron-dev`

Starts the electron app in development mode. Waits for the server to start on http://127.0.0.1:3000 and then starts the electron app.


## Running the Mock Data Server

To run the MockDataServer.cpp, you need to have a C++ compiler (such as Visual Studio) and CMake installed. The MockDataServer.cpp is a simple UDP server that sends mock data to the client at a regular interval.

Follow these steps to compile and run:

1. Navigate to the directory containing MockDataServer.cpp.
2. Run `cmake .` to generate a Makefile.
3. Build.
4. Run the resulting MockDataServer.exe binary file.

Visual Studio users should be able to open the MockDataServer folder and build the MockDataServer.cpp without additional steps.

The server is now running and sending data. The Electron app should be able to receive and display this data.

![alt text](https://github.com/nmclauchlan/electron-gauge/demo.gif "Demonstration of successful execution")
