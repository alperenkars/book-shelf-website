# Project Setup Instructions

This guide will help you set up and run the project on your local machine. You can follow the steps below to get started.

---

## Prerequisites

- Ensure you have the following installed on your system:
  - **Node.js** (v14 or later)
  - **Python** (v3 or later)

---

## Project Setup

### 1. Create a `.env` File
1. In the project's root directory, create a file named `.env`.
2. Add the following content to the file, replacing `[your db password]` with your database password:

    ```plaintext
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=[your db password]
    DB_NAME=kutuphane
    ```

---

### 2. Install Dependencies
1. Navigate to the project directory in your terminal.
2. Run the following command to install the required Node.js modules:

    ```bash
    npm install
    ```
---

## Running the Project

### 1. Start the Server
Run the following command in the backend file to start the project server:

  ```bash
  node app.js  
  ```
---
### 2. Route the Server
Run the following command in the project file in different terminal:

  ```bash
  python -m http.server 8000
  ```
### 3. Open your browser and go to: 
http://localhost:8000

