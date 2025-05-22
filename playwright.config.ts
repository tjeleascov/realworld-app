module.exports = {
  testDir: "./playwright/specs/e2e",
  timeout: 30000,
  use: {
    headless: true,
    baseURL: "http://localhost:3000",
  },
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
  ],
};
