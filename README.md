# NoteHive

NoteHive is a full-stack PERN (PostgreSQL, Express, React, Node.js) application designed for efficient note-taking. It features a modern UI and powerful functionalities, including user authentication, note pinning, editing, deleting, and searching.

---

## Features

- **User Authentication:** Secure login and signup using JSON Web Tokens (JWT) and bcrypt.
- **Create Notes:** Add and manage notes with ease.
- **Pin Notes:** Keep important notes easily accessible by pinning them.
- **Edit Notes:** Update note content directly.
- **Delete Notes:** Remove unwanted notes.
- **Search Notes:** Quickly find notes using the search bar.
- **Responsive Design:** Optimized for both desktop and mobile devices.

---

## Screenshots

![NoteHive Screenshot](./client/src/assets/noteHive.png)

---

## Tech Stack

- **Frontend:** React, Tailwind CSS, GSAP for animations
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Authentication:** bcrypt, JWT
- **Tools:** Nodemon, Git, dotenv, CORS

---

## Getting Started

Follow these steps to set up and run NoteHive locally.

### 1. Prerequisites

- Install [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/get-npm).
- Install [PostgreSQL](https://www.postgresql.org/).

---

### 2. Clone the Repository

```bash
git clone https://github.com/your-username/notehive.git
cd notehive
```

### 3. Install Dependencies

```bash
npm install
```
### 4. Set Up the Database:

- Create a PostgreSQL database.
- Configure the database connection in the .env file:

```bash
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=notehive
```

### 5. Run the Backend:

```bash
cd server
nodemon server.js
```

### 6. Run the Frontend:

```bash
cd client
npm run dev
```
## Usage

1. Sign up or log in to your account.
2. Start creating, pinning, editing, and deleting notes.
3. Use the search bar to quickly find specific notes.
   
## APIs and Backend
- RESTful APIs are used for note management and user authentication.
- JSON Web Tokens (JWT) ensure secure user sessions.

## Contributing
1. Fork the repository.
2. Create a new branch for your feature:
  ```bash
  git checkout -b feature-name
  ```
3. Commit your changes:
  ```bash
  git commit -m "Description of changes"
  ```
4. Push to the branch:
  ```bash
  git push origin feature-name
  ```
5. Submit a pull request.

## Project Link

## Contact
For inquiries or feedback, feel free to reach out:
- GitHub: [Rohanbasnet12](https://www.github.com/Rohanbasnet12)
- Email: [rohanbmyname@gmail.com](https://mail.google.com/mail/u/0/)
