# E-Commerce Web Application

A responsive and modern e-commerce web application built using **React.js**, **TypeScript**, **React Router**, and **Context API**.

The application allows users to:

- Browse products
- Filter products by categories
- Sort products by price
- View detailed product information
- Add and remove items from the cart
- Persist cart state using localStorage
- Share filtered URLs
- Navigate while preserving filters and sorting

---

# Tech Stack

- React.js
- TypeScript
- React Router DOM
- Context API
- Playwright
- CSS

---

# Features

## Product Listing Page

- Responsive product grid
- Dynamic category filtering
- Multiple category selection
- Price sorting
- Shareable filter URLs
- Query parameter based state persistence

Example:

```bash
/?categories=2,3&sort=high
```

---

## Product Detail Page

- Dynamic routing using:

```bash
/product/:id
```

- Dynamically fetched product details
- Product image, title, description, and price
- Add To Cart functionality
- Preserved filters/sorting during navigation

---

## Cart Functionality

- Add items to cart
- Remove items from cart
- Total cart value calculation
- Total item count display
- Persistent cart state using localStorage

---

# Responsive Design

The application is fully responsive across:

- Mobile devices
- Tablets
- Desktop screens

---

# Accessibility

Implemented accessibility improvements including:

- Semantic HTML elements
- Accessible form controls
- Proper button usage
- Alt text for images
- Accessible labels for filters and sorting

---

# Assumptions

- The categories API (`https://api.escuelajs.co/api/v1/categories`) returns many inconsistent and invalid categories that do not reliably return products.

  To ensure a stable and predictable filtering experience, the application limits filtering to the following verified categories:

  - Clothes
  - Electronics
  - Furniture
  - Shoes
  - Miscellaneous

- Product filtering is implemented entirely through API requests based on selected categories, as required in the assignment.

  No client-side/local filtering is performed after fetching products.

- Duplicate cart items are allowed because quantity management was not explicitly required in the assignment.

  Each **Add To Cart** action is treated as a separate cart entry.

- Filters and sorting are persisted using URL query parameters to support:

  - Page refresh persistence
  - Browser back/forward navigation
  - Sharable filtered URLs

- The application assumes the external API remains publicly available and continues returning data in the expected format.

---

# Additional Features Implemented

- Cart persistence using localStorage
- Query parameter based filter persistence
- Broken image fallback handling
- Case-insensitive category matching
- Preserved filters/sorting across navigation
- Playwright E2E testing setup

---

# Limitations

- The external API occasionally returns inconsistent image/category data.
- Product pagination is not implemented.
- Cart quantity management is not implemented.
- Product search functionality is not implemented.

---

# Setup Instructions

## 1. Clone Repository

```bash
git clone <your-github-repository-url>
```

---

## 2. Navigate To Project

```bash
cd <project-folder>
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Run Development Server

```bash
npm run dev
```

Application runs on:

```bash
http://localhost:5173
```

---

# Run Playwright Tests

## Install Playwright Browsers

```bash
npx playwright install
```

---

## Run Tests

```bash
npx playwright test
```

---

# Project Structure

```bash
src/
├── components/
│   ├── Navbar.tsx
│   └── ProductCard.tsx
│
├── context/
│   └── CartContext.tsx
│
├── pages/
│   ├── Cart.tsx
│   ├── Home.tsx
│   └── ProductDetail.tsx
│
├── types/
│   └── product.ts
│
├── App.tsx
├── main.tsx
├── index.css
```

---

# Testing

Basic end-to-end test coverage has been implemented using Playwright for:

- Home page rendering
- Product navigation
- Add to cart flow
- Remove from cart flow
- Category filtering
- Sorting
- Filter persistence across navigation
