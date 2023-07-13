const {
  app,
  BrowserWindow
} = require('electron')
const dgram = require('dgram');
const path = require('path');

let server = null;

function startListening() {
  // Create a UDP server
  server = dgram.createSocket('udp4');

  // Setup the message event handler
   server.on('message', (msg, rinfo) => {
     console.log(`Server received: ${msg} from ${rinfo.address}:${rinfo.port}`);
     var packet = ParseMessage(msg.toString());

     speedometerWindow.webContents.send('speed', packet.knots);
     altimeterWindow.webContents.send('altitude', packet.altitude);
   });

  // Setup the listening event handler
  server.on('listening', () => {
    const address = server.address();
    console.log(`Server listening on ${address.address}:${address.port}`);
  });

  // Start listening on port 3000
  server.bind(3000);
}

let altimeterWindow = null;
let speedometerWindow = null;

function createWindows() {
  altimeterWindow = new BrowserWindow({
    width: 500,
    height: 500,
    x: 300,
    y: 300,
    resizable: true,
    title: 'Altimeter',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  speedometerWindow = new BrowserWindow({
    width: 500,
    height: 500,
    x: 800,
    y: 300,
    resizable: false,
    title: 'Speedometer',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  altimeterWindow.loadURL('http://localhost:3000/altimeter');
  speedometerWindow.loadURL('http://localhost:3000/speedometer');

  //altimeterWindow.webContents.openDevTools()

  // Closing any of the windows should end the application
  altimeterWindow.on('close', () => {
    stop();
  });
  speedometerWindow.on('close', () => {
    stop();
  })

}

function ParseMessage(message) {
  var splitMessage = message.split(',');
  if (splitMessage.length != 2) {
    console.error('Invalid data update: ', message);

    return {
      knots: null,
      altitude: null
    };
  }

  return {
    knots: splitMessage[0],
    altitude: splitMessage[1]
  };
}

function start() {
  startListening();
  createWindows();
}

function stop() {
  server.close();
  app.quit()
}

app.whenReady().then(start)

app.on('window-all-closed', () => {
  stop();
});