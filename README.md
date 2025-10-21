# Expense Tracker

A simple and efficient expense tracking application implemented with React and TypeScript to manage daily expenses with a Node.js backend.

## Tech Stack

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Lucide React](https://lucide.dev/) (Icons)
- [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/react)

## Features

- Add new expenses with description, amount, category, and date
- Edit existing expenses
- Delete expenses
- View total expenses summary
- Categorize expenses - Food, Transport, Entertainment, Bills, Shopping, Health, Other
- Form validation for all expense fields
- Real-time data synchronization with backend API
- Persistent storage using Firebase Firestore

## Setup Instructions

### Clone the repository
```bash
git clone https://github.com/Mahender-Bollam/expense-tracker.git
cd expense-tracker
```

### Install dependencies
```bash
npm install
```

### Environment Configuration

Create a `.env` file in the root directory:

```env
REACT_APP_EXPENSE_SERVICE_API=http://localhost:4000/api/expenses
```

### Run in Development Mode
```bash
npm start
```

App runs at: `http://localhost:3000`

**Note:** Ensure the backend server is running before starting the frontend.

### Run Tests
```bash
npm test
```

Run tests with coverage:
```bash
npm test -- --coverage
```

## Backend Integration

This frontend application connects to a Express backend API. Make sure to:
1. Clone and set up the [backend repository](https://github.com/mdivyaswarupa2004/backend-application)
2. Configure CORS settings in the backend
3. Start the backend server before running the frontend

## Testing

Tests are written using Jest and React Testing Library.

## License

This project is licensed under the MIT License.

## Author

Mahender Bollam  
GitHub: [Mahender-Bollam](https://github.com/Mahender-Bollam)

## Contributors

Backend by M. Divyaswarupa - [mdivyaswarupa2004](https://github.com/mdivyaswarupa2004)