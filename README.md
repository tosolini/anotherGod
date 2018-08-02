# software used
[Another God](https://software.tosolini.info/en/anothergod)
[My website](https://tosolini.info)

# anotherGod

**Another Gmail on the Dock, simple gmail wrapper on Chromium.**

This is a minimal Gmail application based on Chromium version used by [Electron](http://electron.atom.io). You can use it instead of normal browser usage. In the future i will add other features


# Some of (poor)features:

- `Remember` - Position and size of windows will be remember after close.
- `Secure` - Data will run only inside this app, no share with other programs, website or whatever.
- `Open Source` - Code is open source, no ads, no payments. I'll made for myself and share to everyone.
- `Badge Preview` - When new email arrived, will show a small preview badge (for deactivation follow gmail setup)

# Planned features:

- `Business mode` - way to change the default URL for GSuite (old Gmail for your domain).
- `Unread badge` - Unread number of mail badge in the dock icon.
- `Touchbar` - Touchbar support

## To Use

**precompiled version.**

Windows
macOS
Linux Ubuntu snap / deb
Linux RedHat
Linux Other

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/
# Go into the repository
cd anotherGod
# Install dependencies
npm install
# Run the app
npm start
```

Note: If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

## Resources used

- [electron.atom.io/docs](https://electron.atom.io/docs) - all of Electron's documentation
- [electron builder](https://electron.build) - Electron builder and maintaner
- [electron windows state](https://github.com/mawie81/electron-window-state#readme) - Persistent windows state data
- [electrin udpdater](https://github.com/mawie81/electron-window-state#readme) - updater for check new version
- [jquery](https://jquery.com) - js framework

## License

[CC0 1.0 (Public Domain)](LICENSE.md)
