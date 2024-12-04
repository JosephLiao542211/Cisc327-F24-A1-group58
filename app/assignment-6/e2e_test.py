from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def test_register_and_login():
    # Set up the WebDriver
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

    try:
        # Step 1: Navigate to the application
        driver.get("http://localhost:3000")
        print("Opened application homepage.")

        # Step 2: Navigate to the "Register" page
        register_link = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "//button[@class='nav-login-button']"))
        )
        register_link.click()
        print("Navigated to the 'Register' page.")

        # Step 3: Fill in the registration form
        firstname_input = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.NAME, "firstName"))
        )
        firstname_input.send_keys("testuser")

        lastname_input = driver.find_element(By.NAME, "lastName")
        lastname_input.send_keys("Jimmybobjoe")

        phonenum_input = driver.find_element(By.NAME, "phoneNumber")
        phonenum_input.send_keys("4169988201")

        email_input = driver.find_element(By.NAME, "email")
        email_input.send_keys("joa33s@gmail.com")

        password_input = driver.find_element(By.NAME, "password")
        password_input.send_keys("password123")

        # Check the terms and conditions checkbox
        terms_checkbox = driver.find_element(By.XPATH, "//input[@type='checkbox' and @required]")
        terms_checkbox.click()


        print("Filled in the registration form.")

        # Submit the registration form
        register_button = driver.find_element(By.XPATH, "//button[text()='Register']")
        register_button.click()
        print("Submitted the registration form.")

        # # Step 4: Wait for successful registration and navigate to the login page
        # WebDriverWait(driver, 10).until(
        #     EC.presence_of_element_located((By.CLASS_NAME, "success-message"))
        # )
        # print("Registration successful. Navigating to login page.")

        # login_link = driver.find_element(By.LINK_TEXT, "Login")
        # login_link.click()

        # # Step 5: Fill in the login form
        # login_username_input = WebDriverWait(driver, 10).until(
        #     EC.presence_of_element_located((By.NAME, "username"))
        # )
        # login_username_input.send_keys("testuser")

        # login_password_input = driver.find_element(By.NAME, "password")
        # login_password_input.send_keys("password123")

        # print("Filled in the login form.")

        # # Submit the login form
        # login_button = driver.find_element(By.XPATH, "//button[text()='Login']")
        # login_button.click()
        # print("Submitted the login form.")

        # # Step 6: Validate successful login
        # dashboard_element = WebDriverWait(driver, 10).until(
        #     EC.presence_of_element_located((By.ID, "dashboard"))
        # )
        # assert "Welcome, testuser" in dashboard_element.text
        # print("Login successful, user redirected to the dashboard.")

    finally:
        # Close the browser
        driver.quit()

if __name__ == "__main__":
    test_register_and_login()
