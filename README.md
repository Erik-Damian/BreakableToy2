
# Breakable Toy Project

This project is part of the **Encora Spark Program**. It is a **flight search engine** consisting of a **front-end** (built with Node.js) and a **back-end** (built with Java). Docker is used to containerize both the front-end and back-end services.

---

## Table of Contents
1. [Project Structure](#project-structure)
2. [Front-End Setup](#front-end-setup)
3. [Back-End Setup](#back-end-setup)
4. [Docker Setup](#docker-setup)
5. [Running the Project](#running-the-project)

---

## Project Structure
```
project-root/
├── back-end/               # Back-End (Java) code
│   ├── src/               # Source code
│         ├── pom.xml            # Maven build file
│         ├── Dockerfile         # Dockerfile for back-end
├── front-end/              # Front-End (Node.js) code
│   ├── src/               # Source code
│   ├── lib/               # React Redux states
│   ├── package.json       # Node.js dependencies
│   ├── Dockerfile         # Dockerfile for front-end
├── docker-compose.yml     # Docker Compose configuration
├── README.md              # This file
```

---

## Front-End Setup

The front-end is built using **Node.js** and **npm**.

### Prerequisites
- Node.js (v21.7.1 or higher)
- npm (v10.2.4 or higher)

### Steps
1. Navigate to the `front-end` directory:
   ```bash
   cd front-end
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start

   #or for a dev server

   npm run dev
   ```
4. The front-end will be available at `http://localhost:3000`.

---

## Back-End Setup

The back-end is built using **Java** and **Maven**.

### Prerequisites
- Java (JDK 23 or higher)
- Maven (3.8.6 or higher)

### Steps
1. Navigate to the `back-end` directory:
   ```bash
   cd back-end
   ```
2. Build the project:
   ```bash
   mvn clean install
   ```
3. Run the application:
   ```bash
   java -jar target/your-back-end-app.jar
   ```
4. The back-end will be available at `http://localhost:8080`.

---

## Docker Setup

The project is containerized using **Docker** and **Docker Compose**.

### Prerequisites
- Docker (v20.10 or higher)
- Docker Compose (v2.0 or higher)

### Steps
1. Navigate to the project root:
   ```bash
   cd project-root
   ```
2. Build and start the containers:
   ```bash
   docker-compose up --build
   ```
3. The services will be available at:
   - Front-End: `http://localhost:8080`
   - Back-End: `http://localhost:9090`

---

## Running the Project

### Without Docker
1. Start the back-end:
   ```bash
   cd back-end
   mvn clean install
   java -jar target/your-back-end-app.jar
   ```
2. Start the front-end:
   ```bash
   cd front-end
   npm install
   npm start
   ```

### With Docker
1. Build and start the containers:
   ```bash
   docker-compose up --build
   ```

---

## Troubleshooting

- **403 Permission Denied**: Ensure you have write access to the repository or use a Personal Access Token (PAT) for authentication.
- **Docker Build Errors**: Verify that the `Dockerfile` and `docker-compose.yml` are correctly configured.
- **Front-End/Back-End Not Starting**: Check the logs for errors and ensure all dependencies are installed.

---
