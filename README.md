# Lab8_Starter  
Sara Doron  
Finn Reid

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)    
  1

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.  
   no because writing and sending a message to another user would be more than one unit of the code. In unit testing, you cannot test how these individual components interact with each other on an application/feature level, so unit testing would not work in this sitation. 

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters  
   Yes because you are testing one small unit of the code. This does not invlolve any other moving parts. We know exactly how this is supposed to function an we can check whether inputs over 80 characters are correctly caught. 

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?  
   The headless parameter refers to the Chromium browser installed with the puppeteer framework, so if "headless" is set to true, it will run the tests with a browser UI.

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?  
   describe('Basic user flow for SPA ', () => {  
      beforeAll(async () => {  
      await page.goto('http://127.0.0.1:5500');  
      const settingButton = await page.$('img');    
      await settingButton.click();    
      await page.waitForTimeout(500);  
    });

