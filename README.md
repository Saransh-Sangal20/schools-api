# 📚 School Management API

A REST API built using **Node.js, Express, and MySQL** to manage school data.
It allows users to add schools and retrieve them sorted by proximity using geographical distance.

---

## 🚀 Live API

👉 https://schools-api-3pf9.onrender.com/

* NOTE: The above link won't work without appropriate endpoints given below.

---

## 🛠 Tech Stack

* Node.js
* Express.js
* MySQL (Railway)
* Render (Deployment)

---

## 📦 Installation (Local Setup)

```bash
git clone https://github.com/your-username/schools-api.git
cd schools-api
npm install
```

Create a `.env` file in root:

```env
DB_HOST=your_host
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_database
DB_PORT=your_port
```

Run the server:

```bash
node index.js
```

---

## 📌 API Endpoints

### 1️⃣ Add School

* **URL:** `/addSchool`
* **Method:** `POST`
* **Full URL (Local):**

```
http://localhost:8000/addSchool
```

* **Full URL (Live):**

```
https://schools-api-3pf9.onrender.com/addSchool
```

#### 📥 Request Body (JSON)

```json
{
  "name": "Delhi Public School",
  "address": "Delhi",
  "latitude": 28.7041,
  "longitude": 77.1025
}
```

#### 📤 Response

```
School added successfully
```

---

### 2️⃣ List Schools (Sorted by Distance)

* **URL:** `/listSchools`

* **Method:** `GET`

* **Full URL (Local):**

```
http://localhost:8000/listSchools?latitude=28.6&longitude=77.2
```

* **Full URL (Live):**

```
https://schools-api-3pf9.onrender.com/listSchools?latitude=28.6&longitude=77.2
```

#### 📤 Response Example

```json
[
  {
    "id": 1,
    "name": "Delhi Public School",
    "address": "Delhi",
    "latitude": 28.7041,
    "longitude": 77.1025,
    "distance": 5.2
  }
]
```

---

## 🧪 How to Test API

You can test using Postman or any API client.

### Steps:

1. Open Postman
2. Create a new request
3. Select method (POST/GET)
4. Enter the API URL
5. For POST → go to Body → raw → JSON and paste sample data
6. Click **Send**
7. Verify response

---

## ⚠️ Notes

* Latitude & Longitude are validated before insertion.
* Distance is calculated using the **Haversine formula**
* First request may be slow due to free hosting (Render sleep).
* First GET request may respond with 'Not Found' due to free hosting. Try Again

---

## 📌 Author

Saransh Sangal
