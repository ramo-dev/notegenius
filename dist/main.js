"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const wait_on_1 = __importDefault(require("wait-on")); // Ensures Next.js is actually running
let mainWindow = null;
const createWindow = async () => {
    mainWindow = new electron_1.BrowserWindow({
        width: 1000,
        height: 700,
        show: false, // Don't show immediately
        webPreferences: {
            nodeIntegration: true,
        },
    });
    const nextUrl = "http://localhost:3000";
    // Wait for Next.js to actually be ready before loading
    await (0, wait_on_1.default)({ resources: [nextUrl], timeout: 30000 }).catch(() => console.error("Next.js did not start in time!"));
    mainWindow.loadURL(nextUrl);
    mainWindow.show(); // Show only after loading
};
electron_1.app.whenReady().then(createWindow);
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin")
        electron_1.app.quit();
});
