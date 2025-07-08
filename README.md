# KhansWardrobe-ECommerce
Khan's Wardrobe: A full-stack e-commerce platform for traditional &amp; contemporary apparel (women, men, kids). Built with HTML, Tailwind CSS, JavaScript, Node.js, and Oracle SQL, it offers dynamic product listings, sorting, and local favorites for a responsive shopping experience.
This project is a comprehensive full-stack e-commerce application designed for "Khan's Wardrobe," a clothing brand offering traditional and contemporary apparel for women, men, and children. It's structured into distinct frontend and backend components, interacting with an Oracle SQL database for data management.

I. Frontend (User-Facing Application)

The frontend is built using standard web technologies: HTML for structure, Tailwind CSS for styling, and JavaScript for interactivity. It's designed to be responsive, ensuring a consistent user experience across various devices (desktops, tablets, and mobile phones).

Key Frontend Components & Features:

index.html: The main landing page of the website, likely showcasing featured products, new arrivals, or promotional content to attract visitors.

women.html, men.html, boys_girls.html: Dedicated category landing pages. These pages act as hubs for their respective collections, presenting subcategories (e.g., "Unstitched 1PC," "Formal Kurti" for women; "Kameez Shalwar," "Kurta," "Grooms Collection" for men; "Teen Girls," "Kid Boys" for children). These pages use static image cards that link to the dynamic product_listing.html.

product_listing.html: This is the dynamic product display page. It fetches product data from the backend based on the category and subcategory parameters passed in the URL.

product_listing.js: The JavaScript file responsible for:

Parsing URL parameters (category, subcategory).

Making asynchronous fetch requests to the Node.js backend (/api/products) to retrieve relevant product data.

Dynamically rendering product cards (including image, name, price, description, stock).

Implementing client-side features like product sorting (by price, name, etc.).

Managing a frontend-only "like" (favorites) feature that persists liked product IDs in the browser's localStorage.

cart.html & cart.js: These files would handle the shopping cart functionality, allowing users to add products, adjust quantities, and view their selected items before checkout.

checkout.html & checkout.js: For the checkout process, collecting shipping information, and potentially integrating with payment gateways.

login.html & login.js: User authentication, allowing existing users to sign in.

register.html & register.js: User registration, enabling new users to create accounts.

admin_dashboard.html & admin_dashboard.js: An administrative interface for managing products, orders, users, etc. (This would likely interact with separate, protected backend API endpoints).

style.css: The main stylesheet, although Tailwind CSS is heavily used for utility-first styling. This file might contain custom CSS rules or overrides.

script.js: A general-purpose JavaScript file for common functionalities across the site, such as navigation toggles or global event listeners.

Individual JavaScript files (e.g., women.js, men.js, boys_girls.js): These are likely used for page-specific interactivity, such as handling dropdown menus or initial content loading on their respective pages.

II. Backend (Server-Side Logic & Database Interaction)

The backend is a Node.js application built with the Express framework, responsible for serving static files, handling API requests, and interacting with the Oracle SQL database.

Key Backend Components & Features:

server.js: The core of your backend application. It handles:

Static File Serving: Serves all your HTML, CSS, JavaScript, and image files (specifically from the /assets/images directory).

API Endpoints:

GET /api/test: A simple endpoint to verify the server is running.

GET /api/products/all: Fetches all products from the database, useful for debugging and testing the database connection.

GET /api/products: The primary endpoint for fetching products based on category and subcategory query parameters (e.g., /api/products?category=women&subcategory=unstitched_1pc).

Imaginary Product Fallback: Includes a crucial testing feature where if the Oracle database query returns no products, it provides hardcoded "imaginary" product data. This ensures the frontend always has data to display, aiding development and debugging.

POST /api/products: An endpoint for adding new products to the database (likely used by the admin dashboard).

Oracle Database Integration: Uses the oracledb Node.js driver to connect to and interact with your Oracle SQL database.

It relies on environment variables (DB_USER, DB_PASSWORD, DB_CONNECT_STRING) loaded from a .env file for secure database credentials.

Includes a testDbConnection function to verify the database connection on server startup.

CORS Handling: Uses the cors middleware to allow your frontend (running on a different origin, like a local file system or a different port) to make requests to your backend.

.env: A hidden file (not committed to Git) that stores sensitive environment variables like database credentials.

package.json & package-lock.json: Node.js package manager files listing project dependencies (e.g., express, oracledb, cors, dotenv) and their exact versions.

node_modules/: Directory containing all installed Node.js packages.

III. Database (Oracle SQL)

The project uses an Oracle SQL database to persist all application data.

Key Database Components & Structure:

updatedkw.sql: This SQL script contains the DDL (Data Definition Language) for creating your database tables and DML (Data Manipulation Language) for inserting sample data.

Tables:

PRODUCTS: Stores detailed information about each item for sale (ID, Name, Price, Currency, Stock, Description, Image URL, Category, Subcategory, Created/Updated Timestamps).

USERS: Manages user accounts (ID, Name, Email, Hashed Password, Address, Phone, Created Timestamp).

ADMIN: Stores administrative user credentials.

ORDERS: Records customer orders (ID, User ID, Order Date, Total Amount, Status).

ORDER_ITEMS: Details the individual products within each order (ID, Order ID, Product ID, Quantity, Price).

Overall Project Goal:

The "Khan's Wardrobe" project aims to create a functional and aesthetically pleasing e-commerce platform that demonstrates a complete full-stack web development workflow, from database design and backend API development to a responsive and interactive frontend user experience. It serves as a solid foundation for a real-world online clothing store.
