<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Nexus API - Documentation</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      background-color: #f9f9f9;
      color: #222;
    }
    h1, h2, h3 {
      color: #333;
    }
    code {
      background-color: #eee;
      padding: 2px 4px;
      border-radius: 4px;
      font-size: 90%;
    }
    pre {
      background-color: #272822;
      color: #f8f8f2;
      padding: 1rem;
      border-radius: 6px;
      overflow-x: auto;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 2rem;
    }
    table, th, td {
      border: 1px solid #ccc;
    }
    th, td {
      padding: 0.5rem;
      text-align: left;
    }
    a {
      color: #0077cc;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    .badge {
      display: inline-block;
      padding: 0.2rem 0.6rem;
      font-size: 90%;
      background: #eee;
      border-radius: 4px;
    }
  </style>
</head>
<body>

  <h1>🚀 Nexus API</h1>
  <p>
    A modern <strong>RESTful API</strong> for a social media platform built with security, scalability, and clean code in mind. Includes features like user authentication, post management, commenting, following, and liking — everything you need to build a social networking backend.
  </p>
  <p>
    🔗 <strong>Live Swagger Docs:</strong> <a href="https://nexus.reza-derakhshan.ir/reference" target="_blank">https://nexus.reza-derakhshan.ir/reference</a>
  </p>

  <h2>🛠 Features</h2>
  <ul>
    <li>✅ JWT-based Authentication (Register/Login)</li>
    <li>🖼 Create, Edit, and Delete Posts with File Uploads</li>
    <li>💬 Commenting with Reply Support</li>
    <li>👥 Follow/Unfollow Users</li>
    <li>❤️ Like/Dislike Posts</li>
    <li>🧾 Well-documented with OpenAPI (Swagger)</li>
  </ul>

  <h2>📦 Tech Stack</h2>
  <ul>
    <li><strong>Backend:</strong> Node.js, <a href="https://nestjs.com/" target="_blank">NestJS</a></li>
    <li><strong>Validation:</strong> class-validator, DTOs</li>
    <li><strong>Docs:</strong> Swagger (OpenAPI v3)</li>
    <li><strong>Auth:</strong> JWT (Bearer Token)</li>
    <li><strong>Storage:</strong> File Upload with <code>multipart/form-data</code></li>
  </ul>

  <h2>📁 API Endpoints Overview</h2>

  <h3>🔐 Auth</h3>
  <table>
    <thead>
      <tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
    </thead>
    <tbody>
      <tr><td>POST</td><td>/auth/register</td><td>Register new user</td></tr>
      <tr><td>POST</td><td>/auth/login</td><td>Login with JWT</td></tr>
    </tbody>
  </table>

  <h3>📝 Posts</h3>
  <table>
    <thead>
      <tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
    </thead>
    <tbody>
      <tr><td>GET</td><td>/post</td><td>Get all posts</td></tr>
      <tr><td>GET</td><td>/post/user</td><td>Get current user's posts</td></tr>
      <tr><td>POST</td><td>/post</td><td>Create a new post</td></tr>
      <tr><td>GET</td><td>/post/:id</td><td>Get post by ID</td></tr>
      <tr><td>PUT</td><td>/post/:id</td><td>Update post by ID</td></tr>
      <tr><td>DELETE</td><td>/post/:id</td><td>Delete post by ID</td></tr>
    </tbody>
  </table>

  <h3>💬 Comments</h3>
  <table>
    <thead>
      <tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
    </thead>
    <tbody>
      <tr><td>POST</td><td>/comment</td><td>Create new comment</td></tr>
      <tr><td>GET</td><td>/comment/:id</td><td>Get all comments of a post</td></tr>
      <tr><td>PUT</td><td>/comment/:id</td><td>Update a comment</td></tr>
      <tr><td>DELETE</td><td>/comment/:id</td><td>Delete a comment</td></tr>
    </tbody>
  </table>

  <h3>👥 Follows</h3>
  <table>
    <thead>
      <tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
    </thead>
    <tbody>
      <tr><td>POST</td><td>/follow/:id</td><td>Follow a user</td></tr>
      <tr><td>DELETE</td><td>/follow/:id</td><td>Unfollow a user</td></tr>
    </tbody>
  </table>

  <h3>❤️ Likes</h3>
  <table>
    <thead>
      <tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
    </thead>
    <tbody>
      <tr><td>POST</td><td>/like/:id</td><td>Like a post</td></tr>
      <tr><td>DELETE</td><td>/like/:id</td><td>Dislike (unlike)</td></tr>
    </tbody>
  </table>

  <h2>🔐 Authentication</h2>
  <p>All routes (except <code>/auth/*</code>) require an <strong>Authorization</strong> header:</p>
  <pre><code>Authorization: Bearer &lt;JWT_TOKEN&gt;</code></pre>

  <h2>📸 Example Request</h2>
  <p><strong>Create Post (with image):</strong></p>
  <pre><code>POST /post
Content-Type: multipart/form-data
Authorization: Bearer &lt;token&gt;

Form Data:
- content: "My first post"
- files: &lt;image files&gt;</code></pre>

  <h2>🧪 Running Locally</h2>
  <pre><code># 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/nexus-api.git

# 2. Install dependencies
cd nexus-api
npm install

# 3. Set environment variables
cp .env.example .env

# 4. Start the server
npm run start:dev</code></pre>

  <h2>📄 License</h2>
  <p>This project is licensed under the MIT License.</p>

  <h2>🧑‍💻 Author</h2>
  <p>
    Made with ❤️ by <a href="https://reza-derakhshan.ir" target="_blank">Reza Derakhshan</a><br />
    <a href="https://linkedin.com/in/reza-derakhshan" target="_blank">🔗 LinkedIn</a> |
    <a href="https://reza-derakhshan.ir" target="_blank">🌐 Website</a>
  </p>

  <h2>🌐 Swagger</h2>
  <p>For full API documentation and schema:</p>
  <p><a href="https://nexus.reza-derakhshan.ir/reference" target="_blank">➡️ https://nexus.reza-derakhshan.ir/reference</a></p>

</body>
</html>
