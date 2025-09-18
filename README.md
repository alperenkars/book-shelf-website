# Project
**KUtüphane** is a social web application built for the Database Management Systems (COMP306) course at Koç University. 

Users can create personal libraries, list books they’ve read, and follow other users to explore their collections. The app allows for a collaborative and interactive reading experience and makes it easy to discover new books and share recommendations. 

Built with a focus on database design and efficient data management with SQL, KUtüphane demonstrates the integration of relational database principles with a user-friendly web interface.

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
1. Navigate to the project directories one by one /backend, /database, /frontend in your terminal.
2. Run the following command to install the required Node.js modules:

    ```bash
    npm install
    ```
---

## Running the Project

### 1. Fill the database
Run the following command in the databse file to fill up the database:
  ```bash
  node insert_all.js  
  ```

### 2. Start the Server
Go to backend/ direcotry and run the following command to start the project server:

  ```bash
  node app.js  
  ```
---

### 3. Start the frontend: 
Go to frontend/ direcotry and run the following command to start frontend, it will automatically direct you to webpage:
  ```bash
  npm start  
  ```

