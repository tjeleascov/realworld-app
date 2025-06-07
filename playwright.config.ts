/** @type {import('@playwright/test').PlaywrightTestConfig} */
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
