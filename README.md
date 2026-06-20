# 🍔 FoodApp — Zomato-style Food Delivery App

A full-stack food delivery web application built with **Core Java + Advanced Java** (Servlets, JSP, JDBC) and **MySQL**.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 Auth | Register / Login with SHA-256 password hashing |
| 🍽️ Restaurants | Browse all restaurants with search & rating |
| 📋 Menu | View menu items per restaurant with descriptions |
| 🛒 Cart | Client-side cart with quantity controls (localStorage) |
| 📦 Orders | Place orders & view order history with status tracking |
| 🎨 UI | Dark glassmorphism theme, animations, toast notifications |

---

## 🛠️ Tech Stack

```
Frontend  : JSP, HTML5, CSS3 (Glassmorphism), Vanilla JS
Backend   : Java Servlets (Jakarta EE 6)
ORM/DB    : JDBC + MySQL
Server    : Apache Tomcat 10
Build     : Maven (WAR)
```

---

## 📁 Project Structure

```
foodApp/
├── pom.xml
├── db_setup.sql                  ← Run this first!
└── src/main/
    ├── java/com/foodapp/
    │   ├── model/                ← User, Restaurant, MenuItem, Order
    │   ├── dao/                  ← UserDAO, RestaurantDAO, MenuDAO, OrderDAO
    │   ├── service/              ← UserService, RestaurantService, OrderService
    │   ├── servlet/              ← RegisterServlet, LoginServlet, HomeServlet...
    │   └── util/                 ← DBUtil, PasswordUtil
    └── webapp/
        ├── css/style.css
        ├── js/app.js
        ├── WEB-INF/web.xml
        ├── index.jsp             ← Landing page
        ├── login.jsp
        ├── register.jsp
        ├── home.jsp              ← Restaurant listing
        ├── menu.jsp              ← Menu per restaurant
        ├── cart.jsp              ← Cart & checkout
        └── orders.jsp            ← Order history
```

---

## 🚀 Setup & Run

### 1. Database Setup
```sql
-- In MySQL Workbench or CLI:
mysql -u root -p < db_setup.sql
```

### 2. Build
```bash
mvn clean package
```

### 3. Deploy
- Copy `target/foodApp.war` to `[Tomcat]/webapps/`
- Start Tomcat: `[Tomcat]/bin/startup.bat`

### 4. Access
```
http://localhost:8080/foodApp
```

---

## 🔗 URL Mapping

| URL | Servlet | Description |
|---|---|---|
| `/` | index.jsp | Landing page |
| `/register` | RegisterServlet | Registration |
| `/login` | LoginServlet | Login |
| `/home` | HomeServlet | Restaurant listing |
| `/menu?restaurantId=X` | MenuServlet | Restaurant menu |
| `/cart.jsp` | — | Cart (client-side) |
| `/order` | OrderServlet | Place / view orders |
| `/orders` | OrderServlet (GET) | Order history |
| `/logout` | LogoutServlet | End session |

---

## 🗄️ Database

```
MySQL: foodApp  |  Host: localhost:3306
User: root      |  Password: Jaya@8978
```

**Tables:** `users`, `restaurants`, `menu`, `orders`

---

## 📐 Architecture (Layered)

```
JSP (View)  ←→  Servlet (Controller)  ←→  Service (Business)  ←→  DAO (Data)  ←→  MySQL
```
