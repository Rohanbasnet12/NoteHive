# NoteHive

NoteHive is a full-stack web application designed to simplify note-taking with a modern user interface and efficient functionality. It provides users with an intuitive platform to 
create, organize, and manage their notes effortlessly.

### Screenshots
![NoteHive](./client/src/assets/noteHive.png)

## Features
- **User Authentication**: Sign up and log in securely.
- **Create Notes**: Add new notes with ease.
- **Pin Notes**: Highlight important notes by pinning them.
- **Edit Notes**: Modify notes anytime.
- **Delete Notes**: Remove unwanted notes with a click.
- **Search Notes**: Quickly find specific notes using the search bar.

## Tech Stack
NoteHive leverages the following technologies:
- **Frontend**: React
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Other Tools & Libraries**:
  - **Nodemon**: For backend development.
  - **Bcrypt**: For password hashing.
  - **CORS**: To handle cross-origin requests.
  - **JSON Web Tokens (JWT)**: For authentication.
  - **dotenv**: For managing environment variables.
  - **Git**: For version control.

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js
- PostgreSQL
- Git

### Steps
1. **Clone the Repository**:
  ```bash
   git clone https://github.com/your-username/notehive.git
   cd notehive

2. **Install Dependencies**:
  ```bash
   git clone https://github.com/your-username/notehive.git
   cd notehive

3. **Set Up the Database**:
-Create a PostgreSQL database.
-Configure the database connection in the .env file:
  ```bash
  DB_USER=your_db_user
  DB_PASSWORD=your_db_password
  DB_HOST=localhost
  DB_PORT=5432
  DB_NAME=notehive
4. **Run the Backend**:
  ```bash
  npm run dev
5. **Run the Frontend**:
  ```bash
cd client
npm start

### Usage
- Sign up or log in to your account.
- Start creating, pinning, editing, and deleting notes.
- Use the search bar to quickly find specific notes.
