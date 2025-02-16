# CSE Twin Quiz Application

A fun interactive web application that helps CSE G1 students find their personality matches among classmates.

## Project Structure

```
cse-twin
├── src
│   ├── app.js                # Entry point of the application
│   ├── controllers           # Contains controller files
│   │   └── quizController.js # Handles quiz logic
│   ├── routes               # Contains route files
│   │   └── quizRoutes.js    # Defines quiz routes
│   ├── views                # Contains frontend files
│   │   └── home.html        # Main quiz interface
│   └── data                 # Contains application data
│       └── questions.json   # Quiz questions
├── public                   # Static assets
│   ├── styles              # CSS files
│   ├── scripts             # Frontend JavaScript
│   └── images              # Image assets
├── package.json            # NPM configuration file
└── README.md               # Project documentation
```

## Features

- Interactive personality quiz
- Real-time question navigation
- Result matching with classmates
- Responsive design for all devices
- Sign-up form for new character additions

## Setup Instructions

1. **Clone the repository:**

   ```
   git clone <repository-url>
   cd cse-twin
   ```

2. **Install dependencies:**

   ```
   npm install
   ```

3. **Run the application:**
   ```
   npm start
   ```

The application will be available at `http://localhost:3000`

## Dependencies

- Express.js: Web application framework
- Body Parser: Request parsing middleware
- Express Session: Session management
- Cookie Parser: Cookie handling
- SQLite3: Database management

## Development

To run the application in development mode with auto-reload:

```
npm run dev
```
