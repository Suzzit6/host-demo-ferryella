# E-commerce Clothing Store

Welcome to the **E-commerce Clothing Store** project! This is a full-stack e-commerce platform built using the **MERN stack** (MongoDB, Express.js, React, and Node.js). The project allows users to browse clothing items, add them to their cart, and make purchases, while also offering an admin dashboard for managing products and orders.

## Demo

Check out the live demo [here](https://demo-ferryella2.vercel.app/).

## Features

### Frontend (React)
- **State Management:** Implemented using Redux for global state management and Context API for localized component states.
- **Component-based Architecture:** Modular and reusable components across the application.
- **React Hooks:** Utilized hooks like `useState`, `useEffect`, `useContext`, `useReducer`, and `useDispatch` for managing side effects, state, and context.
- **Responsive Design:** Optimized for various screen sizes (mobile, tablet, desktop) using CSS and styled-components.
- **Routing:** Dynamic routing with **React Router** for easy navigation across pages.
- **Product Filtering & Search:** Users can search, filter by categories, and sort products.
- **Authentication:** Integrated user authentication system using JSON Web Tokens (JWT) for secure login and signup functionality.

### Backend (Node.js & Express)
- **User Authentication:** Secured login and signup with JWT and password hashing (bcrypt).
- **Product Management:** Admins can add, update, and delete products.
- **Order Management:** Users can create orders, and admins can view and manage them.
- **Shopping Cart:** Users can add products to the cart and adjust quantities before purchasing.
- **RESTful API:** Built with Express, handles all CRUD operations (Create, Read, Update, Delete).
- **Database:** MongoDB for storing users, products, orders, and cart data.
- **Payment Gateway Integration (Future Scope):** Placeholder for integrating payment solutions like Stripe or PayPal.

## Tech Stack

- **Frontend:** React.js, Redux, Context API, Styled Components, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT (JSON Web Tokens), bcrypt for password hashing
- **Version Control:** Git
- **Deployment:** Vercel (Frontend), Heroku (Backend)
