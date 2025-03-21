# Recipe Management Application

This project is a full-stack web application for managing recipes. It consists of a React frontend and a .NET API backend.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Database Setup](#database-setup)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- View a list of recipes.
- Add new recipes.
- View details of a specific recipe.
- Responsive UI design for different screen sizes.
- Redux for state management.
- RESTful API for backend communication.

## Technologies Used

- **Frontend:**
  - React
  - React Router
  - Redux
  - React Bootstrap
  - Styled Components
  - Axios
- **Backend:**
  - .NET API (C#)
  - Entity Framework Core (or similar ORM, specify if used)
  - SQL Server (or similar database, specify which)
- **Database:**
  - SQL (using `setup.sql` for initial setup)

## Getting Started

### Prerequisites

- Node.js and npm (or yarn) installed.
- .NET SDK installed.
- SQL Server (or specified database) installed.
- Git (optional, but recommended).

### Installation

1.  Clone the repository:

    ```bash
    git clone <your-repository-url>
    cd <your-project-directory>
    ```

### Running the Application

1.  **Backend:** Navigate to the backend directory and run the .NET API.
2.  **Frontend:** Navigate to the frontend directory and start the React application.

## Backend Setup

1.  Navigate to the backend directory.
2.  Restore the NuGet packages:

    ```bash
    dotnet restore
    ```

3.  Build the project:

    ```bash
    dotnet build
    ```

4.  Run the API:

    ```bash
    dotnet run
    ```

5.  Make sure your connection string is set in your `appsettings.json` or user secrets.

## Frontend Setup

1.  Navigate to the frontend directory.
2.  Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3.  Start the development server:

    ```bash
    npm start
    # or
    yarn start
    ```

4.  The frontend will be available at `http://localhost:3000`.

## Database Setup

1.  Place the `setup.sql` file in a suitable location in your backend project (e.g., `database/setup.sql`).
2.  Update your backend code to execute the `setup.sql` script on application startup or using a database migration tool.
3.  Ensure your database connection string is correctly configured.

## Project Structure