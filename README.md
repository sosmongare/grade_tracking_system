# Grade Tracking System

The Grade Tracking System is a web application developed using Django for the backend and React for the frontend. It is designed to facilitate course and grade tracking for both classrooms and universities, providing features such as user authentication, profile management, class creation, and separate accounts for professors and students.

## Table of Contents

- [Grade Tracking System](#grade-tracking-system)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
    - [Backend](#backend)
    - [Frontend](#frontend)
    - [Additional Tools](#additional-tools)
  - [Getting Started](#getting-started)
  - [Contributing](#contributing)


## Features

- **User Authentication**: Secure user registration and login functionality.
- **Profile Management**: Users can edit and update their profiles.
- **Course Creation**: Professors can create Courses, and students can enroll in them.
- **Grade Tracking**: Professors can assign and update grades for students.
- **Role-based Accounts**: Distinct accounts for professors and students, each with relevant permissions.
- **Responsive Design**: A user-friendly interface accessible on both desktop and mobile devices.

## Tech Stack

### Backend

- Django - A high-level Python web framework.
- PostgreSQL - A powerful, open-source relational database.

### Frontend

- React - A popular JavaScript library for building user interfaces.
- Redux - A state management library for handling complex application states.

### Additional Tools

- Material-UI - A React UI framework for building stylish and responsive components.

## Getting Started

To run the Grade Tracking System on your local machine, follow these steps:

1. **Clone the Repository**: `git clone https://github.com/sosmongare/grade_tracking_system.git`
2. **Backend Setup**:
   - Navigate to the `backend` directory: `cd grade_tracking_system/backend`
   - Install Python dependencies: `pip install -r requirements.txt`
   - Set up PostgreSQL database and update database configurations in `backend/grade/settings.py`
   - Run migrations: `python manage.py migrate`
   - Start the backend server: `python manage.py runserver`

3. **Frontend Setup**:
   - Navigate to the `frontend` directory: `cd ../frontend`
   - Install Node.js dependencies: `npm install`
   - Start the frontend development server: `npm start`

4. Access the application in your web browser at `http://localhost:3000`.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes and commit them: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request.

---
Feel free to explore, modify, and use this Grade Tracking System for your educational needs. If you have any questions or need assistance, please don't hesitate to reach out to us. Happy coding!