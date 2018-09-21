const {
  app, shell, BrowserWindow, ipcMain, Tray, Menu, session
} = require("electron");
const path = require("path");
const windowStateKeeper = require("electron-window-state");
const updater = require("./updater");
const AutoLaunch = require("auto-launch");
const isDev = require("electron-is-dev");

// Mantenere un riferimento globale dell'oggetto window, altrimenti la finestra verrà 
// chiusa automaticamente quando l'oggetto JavaScript è raccolto nel Garbage Collector.
let win;
let tray;

function createWindow () {
  // make window sticky
  let mainWindowState = windowStateKeeper({
    defaultWidth: 1280,
    defaultHeight: 800
    });

  // Create window
  win = new BrowserWindow({
    show: false,
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    minWidth: 600,
    icon: `${__dirname}/icons/icon.png`,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "renderer.js")
     }
  });

  // try to make workaround for CSP
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({ responseHeaders: Object.assign({
        "Content-Security-Policy": [ "object-src 'none'", "script-src 'unsafe-inline' https: http:", "base-uri 'self'" ]
    }, details.responseHeaders)});
});

win.loadURL("https://mail.google.com");


  // TODO: test tray for Windows
  if (isDev){
    if (process.platform === "win32") {
      tray = new Tray(`${__dirname}/icons/16.png`);
      const contextMenu = Menu.buildFromTemplate([
        {label: "Minimize", accelerator: "CmdOrCtrl+M", role: "minimize"},
        {label: "Close", accelerator: "CmdOrCtrl+W", role: "close"}
      ]);
      tray.setToolTip("Another God");
      tray.setContextMenu(contextMenu);
    }
  }

  // Force webContents external links open on default browser
  win.webContents.on("new-window", (event, url) => {
    // stop Electron from opening another BrowserWindow
    event.preventDefault();
    // open the url in the default system browser
    shell.openExternal(url);
  });  

/*   if (isDev){
      win.webContents.on("dom-ready", function() {
        win.webContents.insertCSS('html,body{ background-color: #000000 !important;}')
    });  
  } */

 if (isDev) { 
  // Open DevTools
  win.webContents.openDevTools({mode: "detach"});
 }

  // Show window after loading the DOM
  // Docs: https://electronjs.org/docs/api/browser-window#showing-window-gracefully
  win.once("ready-to-show", () => {
    win.show();
  });

  // Emitted when windows is closed.
  win.on("closed", () => {
    win = null;
  });
  // Check for update after x seconds
  setTimeout( updater.check, 2000);  
  // Let us register listeners on the window, so we can update the state
  // automatically (the listeners will be removed when the window is closed)
  // and restore the maximized or full screen state
  mainWindowState.manage(win);
} // end createWindow


app.on("ready", createWindow);

// BadgeCount icon for macos-linux
// FIXME: not working on ubuntu gnome-shell
ipcMain.on("badge", (event, arg) => {  
  app.setBadgeCount(arg);
  //FIXME: windows highlight icon on taskbar
  //win.once('focus', () => win.flashFrame(false))
  //setTimeout(win.flashFrame(true), 5000)
});



// Shutdown the App when all windows are closed.
app.on("window-all-closed", () => {
  // Su macOS è comune che l'applicazione e la barra menù 
  // restano attive finché l'utente non esce espressamente tramite i tasti Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // Su macOS è comune ri-creare la finestra dell'app quando
  // viene cliccata l'icona sul dock e non ci sono altre finestre aperte.
  if (win === null) {
    createWindow();
  }
});

// Load Menu 
require(path.join(__dirname, "main/menu"));

// setup autoLauncher
var appAutoLauncher = new AutoLaunch({
	name: "anotherGod",
	path: "/Applications/anotherGod.app",
});
appAutoLauncher.enable();