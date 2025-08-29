/** @type {import('@playwright/test').PlaywrightTestConfig} */
import { defineConfig } from "@playwright/test";

export default defineConfig({
  reporter: [["html", { outputFolder: "playwright-report", open: "never" }]],
});

module.exports = {
  timeout: 30000,
  projects: [
    {
      name: "UI Tests",
      testDir: "./playwright/specs/e2e",
      use: {
        headless: true,
        baseURL: "http://localhost:3000",
        browserName: "chromium",
      },
    },
    {
      name: "API Tests",
      testDir: "./playwright/specs/api",
      use: {
        baseURL: "http://localhost:3002",
      },
    },
  ],
};
