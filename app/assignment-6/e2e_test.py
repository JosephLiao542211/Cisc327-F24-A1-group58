from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def test_register():
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    try:
        driver.get("http://localhost:3000")
        print("Opened application homepage.")

        # Navigate to the "Register" page
        register_link = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "//button[@class='nav-login-button']"))
        )
        register_link.click()
        print("Navigated to the 'Register' page.")

        # Fill in the registration form
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "firstName"))).send_keys("testuser")
        driver.find_element(By.NAME, "lastName").send_keys("Jimmybobjoe")
        driver.find_element(By.NAME, "phoneNumber").send_keys("4169988201")
        driver.find_element(By.NAME, "email").send_keys("joa33s@gmail.com")
        driver.find_element(By.NAME, "password").send_keys("password123")
        driver.find_element(By.XPATH, "//input[@type='checkbox' and @required]").click()
        print("Filled in the registration form.")

        # Submit the registration form
        driver.find_element(By.XPATH, "//button[text()='Register']").click()
        print("Submitted the registration form.")

        # Handle the success alert
        WebDriverWait(driver, 10).until(EC.alert_is_present())
        alert = driver.switch_to.alert
        alert_text = alert.text
        print(f"Registration alert: {alert_text}")
        alert.accept()

        if alert_text == "Error registering user":
            print("User is already registered.")

    finally:
        driver.quit()


def test_login():
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    try:
        driver.get("http://localhost:3000")
        print("Opened application homepage.")

        # Navigate to the "Login" page
        login_button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "//button[@class='grey-button' and text()='Login']"))
        )
        login_button.click()

        # Fill in the login form
        WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.NAME, "email"))).send_keys("joa33s@gmail.com")
        driver.find_element(By.NAME, "password").send_keys("password123")
        print("Filled in the login form.")

        # Submit the login form
        driver.find_element(By.XPATH, "//button[@class='login-button']").click()
        print("Submitted the login form.")

        # Validate the presence of userData.firstName in the hero-text element
        hero_text = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "//div[@class='hero-text']/h1[@class='userfirstname']"))
        )
        assert hero_text.text == "testuser", f"Expected 'testuser', but got '{hero_text.text}'"
        print("User data validated successfully. LOGIN SUCCESSFUL")

    finally:
        driver.quit()


def test_flights():
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    try:
        driver.get("http://localhost:3000")
        print("Opened application homepage.")

        # Validate discounted flights
        try:
            deal_cards = driver.find_elements(By.CLASS_NAME, "deal-cards")
            if deal_cards:
                print("Discounted flights are available.")
            else:
                print("No discounted flights message is displayed.")
        except Exception as e:
            print(f"An error occurred while validating the deals section: {e}")

        # Navigate to "Explore All Flights" page
        explore_link = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "//button[@class='explore-button' and text()='Explore All Flights']"))
        )
        explore_link.click()
        print("Navigated to 'Explore All Flights' page.")

        # Filter flights by minimum price
        min_price_input = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.NAME, "minPrice"))
        )
        min_price_input.send_keys("200")
        print("Entered minimum price for filtering.")

        # Validate filtered results
        filtered_flight_cards = WebDriverWait(driver, 10).until(
            EC.presence_of_all_elements_located((By.CLASS_NAME, "flight-card"))
        )
        if filtered_flight_cards:
            for card in filtered_flight_cards:
                location = card.find_element(By.XPATH, ".//div[@class='flight-card-overlay']/h1").text
                print(f"Filtered flight location: {location}")
        else:
            print("No flight cards found after applying the filter.")

    finally:
        driver.quit()

if __name__ == "__main__":
    test_register()
    test_login()
    test_flights()
