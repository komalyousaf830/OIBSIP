# 🍕 Pizza Delivery Full-Stack Application

A production-grade full-stack pizza ordering and inventory management platform built as part of the OASIS INFOBYTE Level 3 Web Development internship task.

## 📌 Project Overview

This application allows users to register, log in, browse available pizzas, create custom pizzas, place orders, make payments using Razorpay test mode, and track their order status.

The application also provides a separate Admin panel for managing pizzas, inventory, and customer orders.

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* JavaScript
* CSS
* Vite

### Backend

* Node.js
* Express.js
* REST API
* JWT Authentication
* bcrypt

### Database

* MongoDB
* MongoDB Atlas

### Payment

* Razorpay Test Mode

### Other Technologies

* Nodemailer
* node-cron

## 👤 User Features

* User registration
* Email verification
* User login
* JWT-based authentication
* Forgot password functionality
* Password reset
* Pizza menu
* Pizza dashboard
* Custom pizza builder
* Pizza base selection
* Sauce selection
* Cheese selection
* Multiple vegetable selection
* Order summary
* Razorpay test payment
* Order placement
* Order history
* Real-time/polling order status updates
* User profile

## 👨‍💼 Admin Features

* Separate Admin Login
* Admin Dashboard
* Pizza/Menu management
* Inventory dashboard
* View current stock
* Manual inventory updates
* Automatic inventory deduction after orders
* Low-stock notification system
* Order management
* Update order status
* Customer order monitoring

## 📦 Custom Pizza Builder

The custom pizza builder allows users to create their own pizza by selecting:

1. Pizza Base
2. Sauce
3. Cheese
4. Vegetables

Users can then review their customized pizza in the order summary before payment.

## 💳 Payment Integration

Razorpay is integrated in **Test Mode** for payment processing.

No real money is charged during testing.

## 📊 Inventory Management

The admin can monitor inventory for:

* Pizza Bases
* Sauces
* Cheese
* Vegetables

Inventory quantities are automatically reduced when an order is placed.

A scheduled job can be used to detect low-stock items and send notifications to the administrator.

## 🔐 Authentication & Security

* JWT-based authentication
* Protected routes
* Password hashing using bcrypt
* Separate user and admin authentication
* Email verification
* Password reset functionality

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/komalyousaf830/OIBSIP.git
```

### 2. Navigate to the Project

```bash
cd OIBSIP/WebDev-L3-PizzaDelivery
```

## ⚙️ Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file and configure your environment variables.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

Start the backend:

```bash
node server.js
```

Backend runs on:

```text
http://localhost:5000
```

## 💻 Frontend Setup

Open another terminal and navigate to:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

## 🗂️ Project Structure

```text
WebDev-L3-PizzaDelivery/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── README.md
└── screenshots/
```

## 📸 Screenshots

Screenshots demonstrating the working application will be added to the `screenshots` folder.

## 🎥 Demo

A screen-recorded demonstration of the completed application will be provided as part of the OASIS INFOBYTE task submission requirements.

## 🎯 Internship Task

**Organization:** OASIS INFOBYTE
**Track:** Web Development
**Level:** Level 3
**Task:** Pizza Delivery Full-Stack Application

## 👩‍💻 Developer

**Komal Yousaf**

---

⭐ This project was developed as part of the OASIS INFOBYTE Web Development Internship.
