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
     var packet = ProcessMessage(msg.toString());

     speedometerWindow.webContents.send('speed', packet.knots);
     altimeterWindow.webContents.send('altitude', packet.altitude);
   });


  // server.on('message', (msg, rinfo) => {
  //   console.log(`Server received: ${msg} from ${rinfo.address}:${rinfo.port}`);
  //   mainWindow.webContents.send('udp message', msg.toString()); // Send22
  // });

  // Setup the listening event handler
  server.on('listening', () => {
    const address = server.address();
    console.log(`Server listening on ${address.address}:${address.port}`);
  });

  // Start listening on port 3000
  server.bind(3000);
}

let mainWindow = null;
let altimeterWindow = null;
let speedometerWindow = null;

function createWindows() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    center: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });
  altimeterWindow = new BrowserWindow({
    width: 300,
    height: 300,
    x: 300,
    y: 300,
    title: 'Altimeter',
    closable: false,
    parent: mainWindow,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });
  speedometerWindow = new BrowserWindow({
    width: 300,
    height: 300,
    parent: mainWindow,
    x: 300,
    y: 700,
    title: 'Speedometer',
    closable: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadURL('http://localhost:3000');
  altimeterWindow.loadURL('http://localhost:3000/altimeter');
  speedometerWindow.loadURL('http://localhost:3000/speedometer');

  // While we're developing
  mainWindow.webContents.openDevTools()
}

function ProcessMessage(message) {
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

app.whenReady().then(start)

app.on('window-all-closed', () => {
  server.close();
  app.quit()
})

app.on('activate', () => {
  start()
});