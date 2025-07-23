<<<<<<< HEAD

# **Re-Art MERN Server**

This is the backend for the Re-Art MERN application, built with **Express.js**, **MongoDB (Mongoose)**, **Passport Authentication**, and **Stripe** integration for payments.

---

## **Features**
- RESTful API built with **Express.js**
- **MongoDB Atlas** connection using **Mongoose**
- **Authentication** with Passport & Bearer tokens
- **Stripe Payment API** for test payments
- **CORS enabled** for communication with React frontend
- **Environment variable support** with `.env`
- **Nodemon** for development and **concurrently** for running frontend + backend

---

## **Project Setup**

### **1. Clone the repository**
```bash
git clone https://github.com/isaac8069/Re-Art-Server.git
cd Re-Art-Server
```

### **2. Install dependencies**
```bash
=======
Re-Art MERN Server
This is the backend for the Re-Art MERN application, built with Express.js, MongoDB (Mongoose), Passport Authentication, and Stripe integration for payments.
Features
RESTful API built with Express.js

MongoDB Atlas connection using Mongoose

Authentication with Passport & Bearer tokens

Stripe Payment API for test payments

CORS enabled for communication with React frontend

Environment variable support with .env

Nodemon for development and concurrently for running frontend + backend
Project Setup
1. Clone the repository
bash
Copy code
git clone https://github.com/isaac8069/Re-Art-Server.git
cd Re-Art-Server
2. Install dependencies
bash
Copy code
>>>>>>> f3d4609 (Prepare MERN app for deployment)
npm install
3. Environment variables
Create a .env file in the project root with:

<<<<<<< HEAD
### **3. Environment variables**
Create a `.env` file in the project root with:

```env
=======
env
Copy code
>>>>>>> f3d4609 (Prepare MERN app for deployment)
PORT=8000
MONGODB_URI=mongodb+srv://<USERNAME>:<PASSWORD>@<CLUSTER>.mongodb.net/<DBNAME>?retryWrites=true&w=majority
STRIPE_SECRET_KEY=sk_test_yourStripeTestKey
NODE_ENV=development
<<<<<<< HEAD
```

*(Never commit `.env` — it’s already in `.gitignore`.)*

### **4. Run the server**
#### **Development (with hot reload)**
```bash
npm run server
```

#### **Production**
```bash
=======
(Never commit .env — it’s already in .gitignore.)
4. Run the server
Development (with hot reload)
bash
Copy code
npm run server
Production
bash
Copy code
>>>>>>> f3d4609 (Prepare MERN app for deployment)
npm start
5. Run MERN (Full Stack)
If you have a React client inside /client, start both servers:

<<<<<<< HEAD
### **5. Run MERN (Full Stack)**
If you have a React client inside `/client`, start both servers:
```bash
npm run dev
```
*(Uses `concurrently` to run backend + React frontend.)*

---

## **API Routes**

### **Test Route**
```http
GET /
```
Response:
```
Stripe Integration Server
```

### **Payment Route**
```http
POST /api/pay
```
**Request Body:**
```json
=======
bash
Copy code
npm run dev
(Uses concurrently to run backend + React frontend.)

API Routes
Test Route
h
Copy code
GET /
Response:

arduino
Copy code
Stripe Integration Server
Payment Route
http
Copy code
POST /api/pay
Request Body:

json
Copy code
>>>>>>> f3d4609 (Prepare MERN app for deployment)
{
  "payment_method_id": "<Stripe Payment Method ID>",
  "amount": 1000
}
<<<<<<< HEAD
```

**Response:**
```json
{
  "success": true
}
```

---

## **Folder Structure**
```
=======
Response:

json
Copy code
{
  "success": true
}
Folder Structure
r
Copy code
>>>>>>> f3d4609 (Prepare MERN app for deployment)
Re-Art-Server/
│
├── app/
│   ├── data/         # Seed data
│   └── routes/       # Route files
│
├── lib/              # Auth & middleware
├── config/           # DB connection
├── client/           # React frontend (if present)
│
├── server.js         # Main server file
├── package.json
└── .env.example
<<<<<<< HEAD
```

---

## **Scripts**
- `npm start` – Start server (production)
- `npm run server` – Start server with nodemon (development)
- `npm run client` – Start React client (if exists in `/client`)
- `npm run dev` – Start backend & frontend concurrently
=======
Scripts
npm start – Start server (production)

npm run server – Start server with nodemon (development)

npm run client – Start React client (if exists in /client)

npm run dev – Start backend & frontend concurrently
>>>>>>> f3d4609 (Prepare MERN app for deployment)
