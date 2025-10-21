
# ExpenseTracker App

- **ExpenseTracker** is a app built for maintaining expenses.  
- The goal is to create a smooth expenseTracker tool application using modern React and TypeScript tools.

## Table of Contents 📚

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Setup & Run](#setup--run)
- [How to Use](#how-to-use)
- [Code Highlights](#code-highlights)
- [Clone the Repo](#clone-the-repo)
- [Contribution](#contribution)
- [Contact](#contact)
- [Troubleshooting](#troubleshooting)
- [License](#license)


## Tech Stack 🛠️

- **[React](https://reactjs.org/)**: JavaScript library for building user interfaces
- **[TypeScript](https://www.typescriptlang.org/)**: Superset of JavaScript that adds static typing
- **[CSS](https://www.w3.org/Style/CSS/)**: For styling the product cards and layout
- **[Node.js](https://nodejs.org/)**: JavaScript runtime for backend

## Features 🔐

## Feature : Add Expense and Edit Feature

- Implement Add Expense Feature with all details .
- Handled submit button with alerts.
- Implement broken Edit option feature successfully.
- Handled edit feature button.

## Feature : Delete Feature

- Implement Delete Feature for expense tracker.
- Handled the errors.
- Handled the delete button gracefully.

## Feature : Testing and Cleaning the code 

- Implement testing for all component files.
- Seperate files based on components and types.
- Clean the code and refactor the code for readability.

## Frontend Update: Backend Integration and Component Modifications

### Overview:
This update integrates the frontend with the backend API, including handling CORS issues and ensuring smooth communication between the frontend and backend.

### Key Changes:
- **API Integration**: The frontend now communicates with the backend API to fetch, add, update and delete expenses.
- **CORS Handling**: CORS headers have been configured and tested to ensure seamless communication between the frontend and backend during development.
- **Components Update**: Multiple components have been updated to handle new API responses and user interactions.
    - **ExpenseTracker**: Modified to fetch expenses from the backend API.
    - **ExpenseItem**: Updated to display expenses fetched from the backend and added editing and deletion capabilities.
    - **ExpenseList**: Adjusted to display a list of expenses fetched from the API and handle user interactions for editing and deleting items.
- **Testing**: Added tests for the modified components to ensure that the changes work as expected, including mock API calls for fetching, adding, updating and deleting expenses.

### Feature:
- **Test the API Integration**: Ensure that the frontend communicates successfully with the backend.
-  **Verify CORS**: Confirm that CORS headers are correctly set up on the backend to allow the frontend to communicate with it.
-  **Run Tests**: Execute all frontend tests to verify that components and API integrations work correctly.

## Setup & Run 🛠

1. **Create react app**:

    ```bash
       npx create-react-app expense-tracker --template typescript
    ```
2. **Switch to current directory**:
      
        cd expense-tracker

3. **Install dependencies**:

    ```bash
    npm install
    ```
4. **Run the Tests**:
    ```bash
    npm test -- --coverage --watchAll
    ```
4. **Run the application**:

    ```bash
    npm start
    ```

## How to Use ⚡

- Start the app using `npm start` and open it in your browser ( `http://localhost:3000`).


## Code Highlights 🚀

### 🔁 Data Management
 
- State is managed using `useState`from React.
- Add expense and edit expense is handled using handler functions.

### 🎨 Custom CSS Styling

- Styled using simple, responsive Flexbox and Grid layouts.

### 📦 TypeScript + Models

- Strongly typed using TypeScript interfaces.

## Clone the Repo 📦

To clone the repository, run:

```bash
git clone https://github.com/mahender-bollam/expense-tracker.git
```
## Contribution 🤝

- Feel free to fork, raise issues or submit pull requests to improve the project.



## Contact 📫

- For questions, feedback or collaboration, contact me via:

-      GitHub: @ruchitha-725

-      Email: ruchitha.bondala@everest.engineering

## Troubleshooting 🛠️

- Ensure that you have run npm install to install all the necessary dependencies.

## License 🧾

MIT License © [Ruchitha]
