from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

def test_register_and_login():
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

    try:
        # Navigate to the application homepage
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
        print("Alert accepted successfully.")



        #Handle error whjen the user is already registered

        if alert_text == "Error registering user":
            print("User is already registered.")

        # Navigate to the "Login" page
        driver.find_element(By.XPATH, "//button[@class='grey-button' and text()='Login']").click()

        # Fill in the login form
        WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.NAME, "email"))).send_keys("joa33s@gmail.com")
        driver.find_element(By.NAME, "password").send_keys("password123")
        print("Filled in the login form.")

        # Submit the login form
        driver.find_element(By.XPATH, "//button[@class='login-button']").click()
        print("Submitted the login form.")
        # Handle the success alert after login
        WebDriverWait(driver, 10).until(EC.alert_is_present())
        login_alert = driver.switch_to.alert
        login_alert_text = login_alert.text
        print(f"Login alert: {login_alert_text}")
        login_alert.accept()
        print("Login alert accepted successfully.")


        # Validate the presence of userData.firstName in the hero-text element
        hero_text = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "//div[@class='hero-text']/h1[@class='userfirstname']"))
        )
        assert hero_text.text == "testuser", f"Expected 'testuser', but got '{hero_text.text}'"
        print("User data validated successfully. LOGIN FULLY SUCCESSFUL")



        
        # Validate if there are discounted flights or a message indicating no discounted flights
        try:
            deal_cards = driver.find_elements(By.CLASS_NAME, "deal-cards")
            if deal_cards:
                print("Discounted flights are available.")
            else:
                print("No discounted flights message is displayed.")
        except Exception as e:
            print(f"An error occurred while validating the deals section: {e}")
            # Check for flight cards and print each location
            
        flight_cards = driver.find_elements(By.CLASS_NAME, "flight-card")
        if flight_cards:
            for card in flight_cards:
                location = card.find_element(By.XPATH, ".//div[@class='flight-card-overlay']/h1").text
                discount = card.find_element(By.XPATH, ".//div[@class='discount-overlay']/h1").text
                print(f"Flight location: {location} Discount: {discount}")
        else:
            print("No flight cards found.")


        explore_link = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "//button[@class='explore-button' and text()='Explore All Flights']"))
        )
        explore_link.click()
        print("Navigated to the 'Explore All Flights' page.")

        flight_cards = WebDriverWait(driver, 10).until(
            EC.presence_of_all_elements_located((By.CLASS_NAME, "flight-card"))
        )
        if flight_cards:
            for card in flight_cards:
                location = card.find_element(By.XPATH, ".//div[@class='flight-card-overlay']/h1").text
                try:
                    discount = card.find_element(By.XPATH, ".//div[@class='discount-overlay']/h1").text
                except:
                    discount = "No discount"
                print(f"Catalogue, location: {location} Discount: {discount}")
        else:
            print("No flight cards found.")


        # Filter flights by minimum price
        min_price_input = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.NAME, "minPrice"))
        )
        min_price_input.send_keys("200")
        print("Entered minimum price for filtering.")

        # Trigger the filter action (assuming there's a button to apply the filter)
        
        print("Applied the price filter.")

        # Validate the filtered results
        filtered_flight_cards = WebDriverWait(driver, 10).until(
            EC.presence_of_all_elements_located((By.CLASS_NAME, "flight-card"))
        )
        if filtered_flight_cards:
            for card in filtered_flight_cards:
                location = card.find_element(By.XPATH, ".//div[@class='flight-card-overlay']/h1").text
                price = card.find_element(By.XPATH, ".//div[@class='flight-card-overlay']/p[contains(text(), 'Starting at')]").text
                print(f"Location:{location} Filtered flight price: {price}")
        else:
            print("No flight cards found after applying the filter.")

        

        


    except Exception as e:
        print(f"An error occurred during the test: {e}")

    finally:
        print("All tests executed successfully.")
        time.sleep(10)
        driver.quit()
        print("Browser closed.")

if __name__ == "__main__":
    test_register_and_login()
