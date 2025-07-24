# 🚀 Nexus API

A modern **RESTful API** for a social media platform built with security, scalability, and clean code in mind. Includes features like user authentication, post management, commenting, following, and liking — everything you need to build a social networking backend.

> 🔗 Live Swagger Docs: [https://nexus.reza-derakhshan.ir/reference](https://nexus.reza-derakhshan.ir/reference)

---

## 🛠 Features

- ✅ JWT-based Authentication (Register/Login)  
- 🖼 Create, Edit, and Delete Posts with File Uploads  
- 💬 Commenting with Reply Support  
- 👥 Follow/Unfollow Users  
- ❤️ Like/Dislike Posts  
- 🧾 Well-documented with OpenAPI (Swagger)  

---

## 📦 Tech Stack

- **Backend:** Node.js, [NestJS](https://nestjs.com/)  
- **Validation:** class-validator, DTOs  
- **Docs:** Swagger (OpenAPI v3)  
- **Auth:** JWT (Bearer Token)  
- **Storage:** File Upload with `multipart/form-data`  

---

## 📁 API Endpoints Overview

### 🔐 Auth

| Method | Endpoint         | Description       |
|--------|------------------|-------------------|
| POST   | `/auth/register` | Register new user |
| POST   | `/auth/login`    | Login with JWT    |

### 📝 Posts

| Method | Endpoint         | Description              |
|--------|------------------|--------------------------|
| GET    | `/post`          | Get all posts            |
| GET    | `/post/user`     | Get current user's posts |
| POST   | `/post`          | Create a new post        |
| GET    | `/post/:id`      | Get post by ID           |
| PUT    | `/post/:id`      | Update post by ID        |
| DELETE | `/post/:id`      | Delete post by ID        |

### 💬 Comments

| Method | Endpoint         | Description                |
|--------|------------------|----------------------------|
| POST   | `/comment`       | Create new comment         |
| GET    | `/comment/:id`   | Get all comments of a post |
| PUT    | `/comment/:id`   | Update a comment           |
| DELETE | `/comment/:id`   | Delete a comment           |

### 👥 Follows

| Method | Endpoint         | Description     |
|--------|------------------|-----------------|
| POST   | `/follow/:id`    | Follow a user   |
| DELETE | `/follow/:id`    | Unfollow a user |

### ❤️ Likes

| Method | Endpoint         | Description        |
|--------|------------------|--------------------|
| POST   | `/like/:id`      | Like a post        |
| DELETE | `/like/:id`      | Dislike (unlike)   |

---

## 🔐 Authentication

All routes (except `/auth/*`) require an **Authorization** header:

```
Authorization: Bearer <JWT_TOKEN>
```

---

## 📸 Example Request

**Create Post (with image):**

```
POST /post
Content-Type: multipart/form-data
Authorization: Bearer <token>

Form Data:
- content: "My first post"
- files: <image files>
```

---

## 🧪 Running Locally

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/nexus-api.git

# 2. Install dependencies
cd nexus-api
npm install

# 3. Set environment variables
cp .env.example .env

# 4. Start the server
npm run start:dev
```

---

## 📄 License

This project is licensed under the MIT License.

---


## 🌐 Swagger

For full API documentation and schema:

➡️ [https://nexus.reza-derakhshan.ir/reference](https://nexus.reza-derakhshan.ir/reference)
