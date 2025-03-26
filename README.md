# Todo App Backend

## 🚀 Project Overview
This is the backend for a Todo App with authentication, user-specific todo management, and follows the MVC pattern. The database is hosted on **Supabase (PostgreSQL)**, and the project is deployed on **Vercel or Render**.


## 📂 Folder Structure
```
/todo-app-backend
│── /models
│   ├── userSchema.sql
│   ├── todoSchema.sql
│
│── /controllers
│   ├── authController.js
│   ├── todoController.js
│
│── /routes
│   ├── authRoutes.js
│   ├── todoRoutes.js
│
│── /middleware
│   ├── authenticateToken.js
│
│── /config
│   ├── db.js
│
│── server.js
│── .env
│── package.json
│── README.md
```

---

## 🛠️ Setup Instructions

### 1️⃣ Prerequisites
- Node.js (v16+)
- PostgreSQL (hosted on Supabase)
- Git

### 2️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/todo-app-backend.git
cd todo-app-backend
```

### 3️⃣ Install Dependencies
```bash
npm install
```

### 4️⃣ Configure Environment Variables
Create a `.env` file in the root directory:
```env
PORT=5000
DATABASE_URL=your_supabase_postgres_url
JWT_SECRET=your_jwt_secret
```

### 5️⃣ Run the Server
```bash
npm start
```

---

## 📄 API Endpoints

### Authentication Routes
- **POST /register** → Register a new user
- **POST /login** → Authenticate user and return JWT
- **POST /logout** → Invalidate user session

### Todo Routes (Protected)
- **GET /todos** → Get user-specific todos
- **POST /todos** → Create a new todo
- **PUT /todos/:id** → Update a todo
- **DELETE /todos/:id** → Delete a todo

---

## 🛡️ Authentication & Middleware
- Uses **JWT Authentication** for securing routes.
- `authMiddleware.js` ensures users access only their own todos.

---

## 🛢️ Database Schema (PostgreSQL)
```sql
CREATE TABLE public.users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES public.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  is_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🚀 Deployment Guide
### 1️⃣ Deploy Backend on Vercel or Render
#### **Using Vercel**
```bash
vercel login
vercel
```
#### **Using Render**
- Create a new web service.
- Connect your GitHub repository.
- Set environment variables.
- Deploy!

### 2️⃣ Frontend Integration
Ensure your frontend app communicates with the deployed backend API.

---


