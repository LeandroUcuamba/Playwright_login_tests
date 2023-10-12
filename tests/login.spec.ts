import { test, expect, type Page } from '@playwright/test';
import { error } from 'console';


test("Success user login", async ({page}) => {
     await page.goto("https://www.saucedemo.com/");
     await expect(await page.title()).toBe("Swag Labs");

     await page.locator("[data-test=username]").fill("standard_user");
     await page.locator("[data-test=password]").fill("secret_sauce");

     await page.locator("[data-test=login-button]").click();

     const productTitle = await page.locator(".header_secondary_container > span ")
     await expect(productTitle).toHaveText("Products")

     await expect(await page.url()).toBe("https://www.saucedemo.com/inventory.html")
});


test("Invalid user login", async ({page}) => {
    await page.goto("https://www.saucedemo.com/");
    await expect(await page.title()).toBe("Swag Labs");

    await page.locator("[data-test=username]").fill("Leandro Ucuamba");
    await page.locator("[data-test=password]").fill("Angolan");

    await page.locator("[data-test=login-button]").click();

    const errorLogin = await page.getByText("Epic sadface: Username and password do not match any user in this service");

    await expect(errorLogin).toBeVisible();
});