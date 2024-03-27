# NextJS OpenJira App

NextJS OpenJira App is a web application designed to manage tasks in a project management style, inspired by Jira. This application allows users to create, update, and delete tasks, as well as change their status between pending, in progress, and finished. Additionally, it features a drag-and-drop functionality for tasks between the three statuses, providing a visual way to track task progress.

## Prerequisites

Before running the application locally, you need to have the database set up.

## Running the Database Locally

To start the database locally, use Docker Compose with the following command:

```
docker-compose up -d
```

The `-d` flag runs the containers in detached mode, meaning they run in the background.

## Environment Variables

You need to configure the environment variables for the application. Copy the `.env.template` file to `.env` and set the following variables:

- `MONGO_URL`: The MongoDB connection string. For local development, use `mongodb://localhost:27017/entriesdb`.
- `SECRET_KEY`: Any private value for the secret key.

## Installing Node Dependencies

To install the Node.js dependencies, run:

```
yarn install
```

## Running the Application

To start the development server, run:

```
yarn dev
```

## Seeding the Database

To populate the database with initial data, navigate to the following URL in your browser:

```
http://localhost:3000/api/seed
```

## Features

- **Task Management**: Create, update, and delete tasks.
- **Task Status**: Change the status of tasks between pending, in progress, finished.
- **Drag-and-Drop**: Drag and drop tasks between the three statuses for visual tracking.
