const {
  app, shell, Menu, BrowserWindow
} = require("electron");
const package = require("../package");
const report = require("../main/report");

let template = [{
  label: "Edit",
  submenu: [{
    label: "Undo",
    accelerator: "CmdOrCtrl+Z",
    role: "undo"
  }, {
    label: "Redo",
    accelerator: "Shift+CmdOrCtrl+Z",
    role: "redo"
  }, {
    type: "separator"
  }, {
    label: "Cut",
    accelerator: "CmdOrCtrl+X",
    role: "cut"
  }, {
    label: "Copy",
    accelerator: "CmdOrCtrl+C",
    role: "copy"
  }, {
    label: "Paste",
    accelerator: "CmdOrCtrl+V",
    role: "paste"
  }, {
    label: "Select All",
    accelerator: "CmdOrCtrl+A",
    role: "selectall"
  }]
},
{
  label: "Mail",
  submenu: [{
    label: "New mail",
    click: function (item, focusedWindow){
      if (focusedWindow){
        focusedWindow.webContents.send("new-email" , 1);
      }
    }
  },
  {
    label: "Toggle Sidebar",
    //accelerator: "CmdOrCtrl+/",
    click: function (item, focusedWindow){
      if (focusedWindow){
        focusedWindow.webContents.send("toggle-sidebar");
      }
    },
  },
  {
    label: "Show Inbox",
    accelerator: "Cmd+",
    click: function (item, focusedWindow){
      if (focusedWindow){
        focusedWindow.webContents.send("go-to-inbox");
      }
    },
  },
  {
    label: "Show Special",
    accelerator: "Cmd+",
    click: function (item, focusedWindow){
      if (focusedWindow){
        focusedWindow.webContents.send("go-to-specials");
      }
    },
  },
  {
    label: "Show Reminder",
    accelerator: "Cmd+",
    click: function (item, focusedWindow){
      if (focusedWindow){
        focusedWindow.webContents.send("go-to-reminders");
      }
    },
  },
  {
    label: "Refresh",
    enabled: true,
    click: function (item, focusedWindow){
      if (focusedWindow){
        focusedWindow.webContents.send("refresh");
      }
    }
  },
  {
    label: "Last session",
    enabled: false,
    click: function (item, focusedWindow){
      if (focusedWindow){
        focusedWindow.webContents.send("lastSessionIpc", 1);
      }
    }
  }, 
  {
    label: "Space used",
    enabled: false,
    click: function(item, focusedWindow){
      if (focusedWindow){
        focusedWindow.webContents.send("storageIpc", 1);
      }
    }
  }]
}, 
{
  label: "View",
  submenu: [{
    label: "Ricarica",
    accelerator: "CmdOrCtrl+R",
    click: function (item, focusedWindow) {
      if (focusedWindow) {
        // on reload, start fresh and close any old
        // open secondary windows
        if (focusedWindow.id === 1) {
          BrowserWindow.getAllWindows().forEach(function (win) {
            if (win.id > 1) {
              win.close();
            }
          });
        }
        focusedWindow.reload();
      }
    }
  }, {
    label: "Toggle Full Screen",
    accelerator: (function () {
      if (process.platform === "darwin") {
        return "Ctrl+Command+F";
      } else {
        return "F11";
      }
    })(),
    click: function (item, focusedWindow) {
      if (focusedWindow) {
        focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
      }
    }
  }]
}, {
  label: "Window",
  role: "window",
  submenu: [{
    label: "Minimize",
    accelerator: "CmdOrCtrl+M",
    role: "minimize"
  },
  {
    label: "Open Calendar",
    enabled: false,    
    //accelerator: "CmdOrCtrl+Shift+C",
    click: function (item, focusedWindow){
      if (focusedWindow){
        focusedWindow.webContents.send("open-calendar");
      }
    }
  },
  {
    label: "Open Keep",
    enabled: false,    
    accelerator: "CmdOrCtrl+Shift+k",
    click: function (item, focusedWindow){
      if (focusedWindow){
        focusedWindow.webContents.send("open-keep");
      }
    }
  }, 
  {
    label: "Open Task",
    enabled: false,    
    accelerator: "CmdOrCtrl+Shift+t",
    click: function (item, focusedWindow){
      if (focusedWindow){
        focusedWindow.webContents.send("open-task");
      }
    }
  },  
  {
    label: "Logout",
    enabled: false,    
    //accelerator: "CmdOrCtrl+Shift+t",
    click: function (item, focusedWindow){
      if (focusedWindow){
        focusedWindow.webContents.send("sign-out");
      }
    }
  },{
    label: "Close",
    accelerator: "CmdOrCtrl+W",
    role: "close"
  }, {
    type: "separator"
  }, {
    label: "Reopen Window",
    accelerator: "CmdOrCtrl+Shift+T",
    enabled: false,
    key: "reopenMenuItem",
    click: function () {
      app.emit("activate");
    }
  }]
},
{
  label: "Help",
  role: "help",
  submenu: [{
    label: "Learn More",
    click: function () {
      electron.shell.openExternal("https://software.tosolini.info/ita/another-god/");
    }
  },
  {
    label: "Report an Issue…",
    click() {
      shell.openExternal(`${package.bugs.url}/new?body=${encodeURIComponent(report)}`);
    }
  }]
}
]; // end template

function addUpdateMenuItems (items, position) {
  if (process.mas) return;

  const version = app.getVersion();
  let updateItems = [{
    label: `Version ${version}`,
    enabled: false
  }, {
    label: "Checking for Update",
    enabled: false,
    key: "checkingForUpdate"
  }, {
    label: "Check for Update",
    visible: true,
    key: "checkForUpdate",
    click: function () {
      require("electron").autoUpdater.checkForUpdates();
    }
  }, {
    label: "Restart and Install Update",
    enabled: true,
    visible: false,
    key: "restartToUpdate",
    click: function () {
      require("electron").autoUpdater.quitAndInstall();
    }
  }];

  items.splice.apply(items, [position, 0].concat(updateItems));
}

function findReopenMenuItem () {
  const menu = Menu.getApplicationMenu();
  if (!menu) return;

  let reopenMenuItem;
  menu.items.forEach(function (item) {
    if (item.submenu) {
      item.submenu.items.forEach(function (item) {
        if (item.key === "reopenMenuItem") {
          reopenMenuItem = item;
        }
      });
    }
  });
  return reopenMenuItem;
}

if (process.platform === "darwin") {
  const name = app.getName();
  template.unshift({
    label: name,
    submenu: [{
      label: `About ${name}`,
      role: "about"
    }, {
      type: "separator"
    }, {
      label: "Services",
      role: "services",
      submenu: []
    }, {
      type: "separator"
    }, {
      label: `Hide ${name}`,
      accelerator: "Command+H",
      role: "hide"
    }, {
      label: "Hide Others",
      accelerator: "Command+Alt+H",
      role: "hideothers"
    }, {
      label: "Show All",
      role: "unhide"
    }, {
      type: "separator"
    }, {
      label: "Quit",
      accelerator: "Command+Q",
      click: function () {
        app.quit();
      }
    }]
  });

  // Window menu.
  template[3].submenu.push({
    type: "separator"
  }, {
    label: "Bring All to Front",
    role: "front"
  });

  addUpdateMenuItems(template[0].submenu, 1);
}

if (process.platform === "win32") {
  const helpMenu = template[template.length - 1].submenu;
  addUpdateMenuItems(helpMenu, 0);
}

app.on("ready", function () {
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
});

app.on("browser-window-created", function () {
  let reopenMenuItem = findReopenMenuItem();
  if (reopenMenuItem) reopenMenuItem.enabled = false;
});

app.on("window-all-closed", function () {
  let reopenMenuItem = findReopenMenuItem();
  if (reopenMenuItem) reopenMenuItem.enabled = true;
});
const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);