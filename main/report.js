const os = require("os");
const { app } = require("electron");

module.exports = `
<!-- Please describe the issue and steps to reproduce it. -->
---
Data from app:
${app.getName()} ${app.getVersion()}
Electron ${process.versions.electron}
${process.platform} ${process.arch} ${os.release()}`;