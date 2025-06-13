import { test as base } from "@playwright/test";
import Pages from "@playwright-pages/pages";

type MyFixtures = {
  pages: Pages;
};

export const test = base.extend<MyFixtures>({
  pages: async ({ page }, use) => {
    const pages = new Pages(page);
    await use(pages);
  },
});
