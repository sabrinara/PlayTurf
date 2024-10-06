# PlayTurf- A Sports Facility Booking Website
###   [Live Website](https://playturf.netlify.app)
<!--
### **Submission : (Please check my submissions:)**

- Frontend Live Link: [Live Website](https://fitflex-equipment-selling.netlify.app)
- Backend Live Link: [Backend Link](https://fit-flex-server-ochre.vercel.app/)
- GitHub Repository URL (Frontend): https://github.com/ashiqee/L2B3-assignment-4-ZFitX-0920
- GitHub Repository URL (Backend): https://github.com/ashiqee/ZfitX-Backend
-->

**Overview:**  PlayTurf is a sports facility booking platform for enthusiasts, utilizing cutting-edge technologies like React, Redux, Mongoose, and Express. The website will deliver a smooth and intuitive booking experience, featuring dynamic facility listings, immersive facility detail pages, and a seamless, user-friendly booking system. Administrators will benefit from powerful facility management tools, while users will enjoy advanced functionalities like lightning-fast, debounced search, and smart page loading for an optimized experience. For secure and hassle-free booking. Role-based dashboard, admin can manage facility curd operations. Admin can also add admin and can see user listing. This project is designed to create a modern, high-performance online facility booking, offering everything sports lovers need in one place.

## Technical Stack
- Frontend: React, Redux for state management.
- Backend: Node.js, Express, Mongoose, CORS.
- Database: MongoDB for storing product and user data.
- TypeScript: Ensures robust type safety and code quality.

## Core Features
#### 1. Homepage
- Header with logo and site name
- Navigation links
- Banner Section
- Featured Facility
- How it works section
- Parallax section
- What Our Client Say
- Footer with contact and social media links

#### 2. Facility Page

- Facility listings with images, names, prices per hour, description, and details button
- Search bar
- Sorting options price per hour
- Pagination. 


#### 3. Facility Details Page

- Product information (name, price per hour, location, description, image)
- Book now button


#### 4. Booking Page
- List of cart items with quantity controls
- Button to remove items
- Dynamic pricing details
- Proceed to the checkout button

#### 5. Booking Page
- Facility details with a view button
- Facility slot checking via date.
- Book facility with desired time.
- Pay and Place booking functionality with available time management

#### 6. Facility Management
- Facility list table with action buttons
- Update and delete functionality with confirmation prompts
- Add new facility form
- pagination view all facilities.

#### 7. About Us Page
- Company overview, 
- team introduction,
- customer testimonials
- Contact information with basic animations and gradients


#### 8. Contact Page
 - Order list table with order details
 

### Additional Features
- Debounced API Calls: Reduces API call frequency during searches
- Page Refresh Warning: Warns users before refreshing if the cart is not empty
- Pagination: Custom implementation for product listings


## Table of Contents for using

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)


## Prerequisites

Ensure you have the following installed on your local machine:

- Node.js (version 14 or higher)
- npm (version 6 or higher) or yarn
- MongoDB (running locally or a connection URI to a remote instance)

## Installation

1. Clone the repository:

```bash
   <!-- Frontend clone  -->
   git clone https://github.com/ashiqee/L2B3-assignment-4-ZFitX-0920.git
```

 ```bash
   <!-- Backend clone  -->
   git clone https://github.com/ashiqee/ZfitX-Backend.git
```


2. Install dependencies:

### usi npm:

```tsc
npm i
```

## Configuration

1. Create a `.env.local` file in the root directory of the project and add the following enviroment variables:


Frontend .env.local
```bash
VITE_PAYMENT_GATEWAY=
```

Banckend .env
```bash

NODE_ENV = development
PORT=5000
DATABASE_URL = 
STRIPE_SECRET_KEY=
```

### Running the Application both

1. To compile and run the TypeScript application in development mode with hot-reloading, use:

```bash
npm run dev
```

2. To build the application for production

```bash
npm run build
```

Visit: http://localhost:5173/

This project aims to create a modern, efficient, and user-centric online store for fitness enthusiasts, providing a smooth and enjoyable shopping experience while ensuring secure and reliable transactions.
