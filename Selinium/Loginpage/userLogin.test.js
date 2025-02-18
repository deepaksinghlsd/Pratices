const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const { describe, it, before, after } = require('mocha');

describe('BGM Game Login Page Tests', function() {
  let driver;
  
  before(async function() {
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(new chrome.Options().addArguments('--start-maximized'))
      .build();
  });

  after(async function() {
    await driver.quit();
  });

  it('should load the login page successfully', async function() {
    await driver.get('https://thebgmgame.com/login');
    const title = await driver.getTitle();
    expect(title).to.include('thebgmgame'); 
  });

  it('should show error for invalid mobile number', async function() {
    await driver.get('https://thebgmgame.com/login');
    
    const mobileInput = await driver.findElement(By.css('input[type="tel"]'));
    await mobileInput.sendKeys('123'); // Invalid number
    
    const sendOtpButton = await driver.findElement(By.css('button[type="submit"]'));
    await sendOtpButton.click();
    
    const errorMessage = await driver.findElement(By.css('.invalid-feedback'));
    const errorText = await errorMessage.getText();
    expect(errorText).to.include('Invalid mobile number');
  });

  it('should require terms acceptance before sending OTP', async function() {
    await driver.get('https://thebgmgame.com/login');
    
    const mobileInput = await driver.findElement(By.css('input[type="tel"]'));
    await mobileInput.sendKeys('9876543210');
    
    const sendOtpButton = await driver.findElement(By.css('button[type="submit"]'));
    await sendOtpButton.click();
    
    const alertMessage = await driver.findElement(By.css('.alert'));
    const alertText = await alertMessage.getText();
    expect(alertText).to.include('Please accept the terms and conditions');
  });

  it('should successfully send OTP for valid mobile number', async function() {
    await driver.get('https://thebgmgame.com/login');
    
    const mobileInput = await driver.findElement(By.css('input[type="tel"]'));
    await mobileInput.sendKeys('9876543210');
    
    const termsCheckbox = await driver.findElement(By.css('input[type="checkbox"]'));
    await termsCheckbox.click();
    
    const sendOtpButton = await driver.findElement(By.css('button[type="submit"]'));
    await sendOtpButton.click();
    
    // Wait for OTP sent message
    const alertMessage = await driver.wait(
      until.elementLocated(By.css('.alert-success')),
      5000
    );
    const alertText = await alertMessage.getText();
    expect(alertText).to.include('OTP Sent');
  });

  it('should handle OTP verification within time limit', async function() {
    await driver.get('https://thebgmgame.com/login');
    
    // Enter mobile number and get OTP
    const mobileInput = await driver.findElement(By.css('input[type="tel"]'));
    await mobileInput.sendKeys('9876543210');
    
    const termsCheckbox = await driver.findElement(By.css('input[type="checkbox"]'));
    await termsCheckbox.click();
    
    const sendOtpButton = await driver.findElement(By.css('button[type="submit"]'));
    await sendOtpButton.click();
    
    // Wait for OTP input to appear
    const otpInput = await driver.wait(
      until.elementLocated(By.css('input[placeholder="Enter OTP"]')),
      5000
    );
    
    // Enter OTP (you'll need to modify this with actual OTP logic)
    await otpInput.sendKeys('123456');
    
    const verifyButton = await driver.findElement(By.css('button[type="submit"]'));
    await verifyButton.click();
    
    // Check countdown timer
    const countdownText = await driver.findElement(By.css('.text-center.mt-3'));
    const text = await countdownText.getText();
    expect(text).to.include('seconds before resending OTP');
  });

  it('should handle resend OTP functionality', async function() {
    // Wait for countdown to finish
    await driver.sleep(60000); // Wait for 60 seconds
    
    const resendButton = await driver.findElement(By.css('button.btn-secondary'));
    await resendButton.click();
    
    const alertMessage = await driver.wait(
      until.elementLocated(By.css('.alert-success')),
      5000
    );
    const alertText = await alertMessage.getText();
    expect(alertText).to.include('OTP Sent');
  });
})