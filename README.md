To create an application in Node.js and React that presents a questionnaire and captures the data in a SQLite database, we need to follow these steps:

# Step 1: Initialize Node.js Project

### `mkdir mental-health-app`

### `cd mental-health-app`

### `npm init -y`

### `npm install express sqlite3 body-parser cors`

# Step 2: Set Up Express Server : Create a file named server.js and implement the backend logic on this file

# Step 3: Initialize React Project

### `npx create-react-app mental-health-client`

### `cd mental-health-client`

### `npm install axios`

# Step 4: Create Questionnaire Form : Modify src/App.js to create the form and handle submissions and modify a file named App.css in the src directory of your React project according to your style.

# Step 5: Running the Application

# 1. Run the Backend:

The node_modules folder is ignored when converting to a Zip file because the node_modules folder can be extremely large, containing thousands of files and directories. We can easily recreate the node_modules directory by installing the dependencies listed in the package.json file. Here are the steps:

### `cd mental-health-app`

### `npm install`

Now run the backend server:

### `node server.js`

The node_modules folder is ignored when converting to a Zip file because the node_modules folder can be extremely large, containing thousands of files and directories. We can easily recreate the node_modules directory by installing the dependencies listed in the package.json file. Here are the steps:

# 2. Install Dependencies: Use a package manager like npm to install the dependencies. This will recreate the node_modules folder based on the package.json and package-lock.json files.

### `cd mental-health-client`

### `npm install`

This command will read the package.json file, download all the required dependencies, and place them in a newly created node_modules folder. After this, we can run the forntend of the project as intended.

# 3. Run the Frontend:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in our browser.

The page will reload when we make changes.\
We may also see any lint errors in the console.
