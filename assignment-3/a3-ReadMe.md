# App Setup and Usage Guide

This app is built using React.js as the frontend framework. Follow the steps below to set up and run the app locally.

## Steps to Run the App

1. **Clone the Repository**
   - Clone the repository to your local machine.

2. **Ensure Node.js and npm are Installed**
   - Make sure you have a working version of Node.js and npm installed on your machine.

3. **Install Dependencies and Start the App**
   - Open your terminal and enter the following commands:
     ```bash
     cd app
     cd frontend
     npm install
     npm start
     ```

4. **Access the Webpages**
   - Once the app is running, you can access the following pages in your browser:
     - **Sign Up Page**: [http://localhost:3000/signup](http://localhost:3000/signup)
     - **Login Page**: [http://localhost:3000/login](http://localhost:3000/login)
     - **Landing Page**: [http://localhost:3000/](http://localhost:3000/)

## Backend Information

- The backend for the app is complete and functional, implemented with MongoDB. The backend logic is accessible, but it has not been deployed yet.
- Since the backend is not yet deployed, attempting to interact with the login page may lead to errors.
- To access the backend, you will need an API key. Please contact Joseph privately in our group to obtain the API key to keep it secure and private.

## Testing
To ensure the app functions correctly, we have implemented unit tests using [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/). Follow the steps below to run the tests locally.

1. **Navigate to the Frontend Directory**
   ```bash
   cd app/frontend
   ```
   
2. **Run the Tests**
Use the following command to execute all tests:
    ```bash
    npm test
    ```
This will start Jest in watch mode, allowing you to run all tests automatically

**To run tests for a specific file**, use the following command:

  ```bash
  npm test -- <file-path>
   ```
Replace <file-path> with the relative path to the test file you want to run.