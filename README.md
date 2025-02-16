# CSE Twin Quiz Application

A fun interactive web application that helps CSE G1 students find their personality matches among classmates through a dynamic branching quiz system.

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

- Adaptive branching quiz system
- Personality-based question paths
- Dynamic result matching based on responses
- Character-specific result pages
- Mobile-responsive interface
- Real-time question navigation

## How It Works

The quiz uses a branching logic system where:

1. Each answer leads to a specific next question
2. Questions adapt based on previous responses
3. Results match you with a specific CSE G1 character
4. Multiple paths can lead to different character matches

## Character Categories

The quiz can match you with various CSE G1 personalities including:

- The Driving Enthusiast
- The Cricket Pro
- The Social Media Star
- The Backend Developer
- The Classification Expert
- And more!

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

## Development

To run the application in development mode with auto-reload:

```
npm run dev
```

```

```
