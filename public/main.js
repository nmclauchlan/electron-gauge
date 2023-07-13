const { app, BrowserWindow } = require('electron')
const dgram = require('dgram');
const path = require('path'); 


// Create a UDP server
const server = dgram.createSocket('udp4');

// Setup the message event handler
server.on('message', (msg, rinfo) => {
  console.log(`Server received: ${msg} from ${rinfo.address}:${rinfo.port}`);
  mainWindow.webContents.send('udp message', msg.toString()); // Send22
});

// Setup the listening event handler
server.on('listening', () => {
  const address = server.address();
  console.log(`Server listening on ${address.address}:${address.port}`);
});

// Start listening on port 3000
server.bind(3000);

let mainWindow = null;

function createWindow () {
    mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        nodeIntegration: false, 
        contextIsolation: true,
        enableRemoteModule: false,
        preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadURL('http://localhost:3000');

  // While we're developing
  mainWindow.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    app.quit()
})

app.on('activate', () => {
    createWindow()
})