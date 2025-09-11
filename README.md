# UI-Testing-POM-Playwright-js
UI Testing using Playwright with JavaScript and the POM design pattern.
### **Project overview**

This project is a Playwright-based test automation framework designed to perform end-to-end testing on the UI. It employs the Page Object Model (POM) design pattern to encapsulate page-specific logic and enhance test maintainability.

### **Technologies used**

* **Playwright:** A Node.js library to automate Chromium, Firefox and WebKit with a single API.
* **JavaScript:** The primary programming language for test scripts.
* **Page Object Model (POM):** A design pattern that separates page-specific logic from test cases.

### **Getting started**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/olivaalbert1/titan-test
   ```
2. **Install dependencies:**
   ```bash
   npm init playwright@latest
   ```

### **Running Tests**

* **All tests in headed mode:**
   ```bash
   BASEURL='PUT_HERE_YOUR_URL' npx playwright test --headed
   ```
* **Specific test file in headless mode:**
   ```bash
   BASEURL='PUT_HERE_YOUR_URL' npx playwright test tests/delete-one-app.spec.js
   ```
* **Specific test scenario in headless mode:**
   ```bash
   BASEURL='PUT_HERE_YOUR_URL' npx playwright test -g "Add app"
   ```
* **All tests in headless mode:**
   ```bash
   BASEURL='PUT_HERE_YOUR_URL' npx playwright test
   ```
* **If all the tests pass, no report will be prompted, but you can see the report with - Show report command:**
   ```bash
   npx playwright show-report
   ```
* **Execute test showing trace:**
   ```bash
   npx playwright test --ui
   ```

### **Configuration**

* **Base URL:** Set the base URL for your application in the terminal before running tests using the `BASEURL` environment variable. You can parameterize only the environment part, for example having in playwright.config.js baseUrl: 'https://{env}.myapplication.com/' and when executing the command just indicate qa,uat,prod... or the environment in which you want to run the tests. But as it has been explicitly indicated in the technical test statement not to upload the application URL to the repository, I have decided to parameterize the entire URL by command.
We can also use tags to assign some tests to certain environments, but that was outside the scope of the test.
* **Playwright Config:** Customize the Playwright configuration in `playwright.config.js` to suit your project needs.
<br> * I've configured a single retry for failed tests.
   ```js
   module.exports = defineConfig({
     retries: 1,
   })
   ```