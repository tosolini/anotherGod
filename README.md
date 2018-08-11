# software used
- [Another God home page](https://software.tosolini.info/ita/anothergod) (in italian language)
- [My Website](https://tosolini.info)
- [Steemit blog](https://steemit.com/@tosolini)

# anotherGod

**Another Gmail on the Dock, simple gmail wrapper on Chromium.**

This is a minimal Gmail application based on Chromium version used by [Electron](http://electron.atom.io). You can use it instead of normal browser usage. In the future i will add more features


# Some of (poor)features:

- `Remember` - Position and size of windows will be remember after close.
- `Secure` - Data will run only inside this app, no share with other programs, website or whatever.
- `Open Source` - Code is open source, no ads, no payments. I'll made for myself and share to everyone.
- `Badge Preview` - When new email arrived, will show a small preview badge (for deactivation follow gmail setup)
- `Badge Icon Notification` - Icon on the dock show a badge with number of unreaded item (only macOS and Linux)

# Planned features:

- `Business mode` - way to change the default URL for GSuite (old Gmail for your domain).
- `Unread badge for windows` - Unread number of mail badge in the taskbar icon.
- `Touchbar` - Touchbar support

## To Use

**precompiled version.**

Windows
macOS
Linux Ubuntu snap / deb
Linux RedHat
Linux Other

**build from source**

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/tosolini/anotherGod.git
# Go into the repository
cd anotherGod
# Install dependencies
npm install
# Run the app
npm start
```

Note: If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

Rember, to compile you have first sign a self certificate from your computer and export as anotherGod.p12 into private folder.

## Resources used

- [electron.atom.io/docs](https://electron.atom.io/docs) - all of Electron's documentation
- [electron builder](https://electron.build) - Electron builder and maintaner
- [electron windows state](https://github.com/mawie81/electron-window-state#readme) - Persistent windows state data
- [electrin udpdater](https://github.com/mawie81/electron-window-state#readme) - updater for check new version
- [jquery](https://jquery.com) - JavaScript framework
- [Gmail-js](https://github.com/KartikTalwar/gmail.js) - Gmail JavaScript API

## License

- [code GPL 3.0 (Public Domain)](LICENSE.md)
- [Readme and Docs cc-by-4.0](http://creativecommons.org/licenses/by-nc-sa/4.0/)

