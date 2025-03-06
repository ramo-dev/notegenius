import { app, BrowserWindow } from "electron";
import path from "path";
import waitOn from "wait-on"; // Ensures Next.js is actually running

let mainWindow: BrowserWindow | null = null;

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    show: false, // Don't show immediately
    webPreferences: {
      nodeIntegration: true,
    },
  });

  const nextUrl = "http://localhost:3000";

  // Wait for Next.js to actually be ready before loading
  await waitOn({ resources: [nextUrl], timeout: 30000 }).catch(() =>
    console.error("Next.js did not start in time!")
  );

  mainWindow.loadURL(nextUrl);
  mainWindow.show(); // Show only after loading
};

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
