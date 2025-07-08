// server.js (Conceptual Node.js Backend with Oracle DB Integration)
// IMPORTANT: This server requires Node.js, Express, Cors, and the OracleDB module.
// You will need to install these: npm install express body-parser cors oracledb dotenv
// Additionally, you MUST have Oracle Instant Client installed and configured on your system
// for 'oracledb' to connect to an Oracle database.
// This code is conceptual for demonstration purposes as direct Oracle DB connection
// is not possible in this browser-based environment.

require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const path = require('path'); // Ensure 'path' module is imported
const bodyParser = require('body-parser');
const oracledb = require('oracledb');
const cors = require('cors'); // Import cors
const crypto = require('crypto'); // For generating UUIDs

const app = express();
const port = process.env.PORT || 3000; // Use port from environment or default to 3000

// Serve static files from the current directory (for HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));
// Serve images from the assets/images directory
app.use('/assets/images', express.static(path.join(__dirname, 'assets', 'images')));

// Middleware
app.use(cors()); // Enable CORS for all routes (adjust origin in production for security)
app.use(bodyParser.json()); // To parse JSON request bodies

// Oracle Database Configuration (store these in .env file for security)
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECT_STRING // e.g., 'localhost:1521/ORCLPDB1' or 'hostname:port/service_name'
};

// Set up oracledb thin mode (optional, but good for simpler deployments)
// If you're using Instant Client, uncomment and set the path:
// oracledb.initOracleClient({ libDir: '/path/to/your/instantclient' });

// Test Database Connection (optional, but good for debugging during setup)
async function testDbConnection() {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        console.log('Successfully connected to Oracle Database!');
    } catch (err) {
        console.error('Error connecting to Oracle Database:', err);
        // In a real application, you might want to gracefully handle this
        // e.g., by not starting the server or retrying.
        // For this example, we'll just log and continue, but product fetching will fail.
        // process.exit(1); // Uncomment to exit if DB connection fails on startup
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error('Error closing connection:', err);
            }
        }
    }
}
testDbConnection(); // Call on server start to verify connection

// API Routes

// Test endpoint to verify server is running
app.get('/api/test', (req, res) => {
    res.status(200).json({ message: 'Server is up and running!', timestamp: new Date().toISOString() });
});

// NEW: Endpoint to fetch ALL products for general testing
app.get('/api/products/all', async (req, res) => {
    let connection;
    try {
        console.log('Fetching all products...');
        connection = await oracledb.getConnection(dbConfig);

        const sql = `SELECT ID, NAME, PRICE, CURRENCY, STOCK, DESCRIPTION, IMAGE_URL, CATEGORY, SUBCATEGORY
                     FROM PRODUCTS`;
        const options = {
            outFormat: oracledb.OUT_FORMAT_OBJECT
        };

        console.log('Executing SQL (all products):', sql);
        const result = await connection.execute(sql, [], options); // No binds for fetching all
        console.log('SQL Result Rows (all products):', result.rows.length);

        const products = result.rows.map(row => ({
            id: row.ID,
            name: row.NAME,
            price: row.PRICE,
            currency: row.CURRENCY,
            stock: row.STOCK,
            description: row.DESCRIPTION,
            imageUrl: row.IMAGE_URL,
            category: row.CATEGORY,
            subcategory: row.SUBCATEGORY
        }));

        res.json({ products: products });

    } catch (err) {
        console.error("Error fetching all products from database:", err);
        res.status(500).json({ message: 'Internal server error while fetching all products.', error: err.message, products: [] });
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error("Error closing connection (all products):", err);
            }
        }
    }
});

// GET products by category and subcategory (robust, case-insensitive, trimmed)
app.get('/api/products', async (req, res) => {
    let connection;
    try {
        // Extract and normalize parameters
        const category = (req.query.category || '').toLowerCase().trim();
        const subcategory = (req.query.subcategory || '').toLowerCase().trim();

        console.log('Backend Received Query Params:', { category, subcategory });

        if (!category || !subcategory) {
            return res.status(400).json({ message: 'Category and subcategory parameters are required for product lookup.', products: [] });
        }

        connection = await oracledb.getConnection(dbConfig);

        const sql = `SELECT ID, NAME, PRICE, CURRENCY, STOCK, DESCRIPTION, IMAGE_URL, CATEGORY, SUBCATEGORY
                     FROM PRODUCTS
                     WHERE LOWER(TRIM(CATEGORY)) = :category_bind AND LOWER(TRIM(SUBCATEGORY)) = :subcategory_bind`;

        const binds = {
            category_bind: category,
            subcategory_bind: subcategory
        };

        const options = { outFormat: oracledb.OUT_FORMAT_OBJECT };

        const result = await connection.execute(sql, binds, options);

        const products = result.rows.map(row => ({
            id: row.ID,
            name: row.NAME,
            price: row.PRICE,
            currency: row.CURRENCY,
            stock: row.STOCK,
            description: row.DESCRIPTION,
            imageUrl: row.IMAGE_URL,
            category: row.CATEGORY,
            subcategory: row.SUBCATEGORY
        }));

        res.json({ products: products });

    } catch (err) {
        console.error("Error fetching products from database:", err);
        res.status(500).json({ message: 'Internal server error while fetching products.', error: err.message, products: [] });
    } finally {
        if (connection) {
            try { await connection.close(); } catch (err) { }
        }
    }
});

// TEST: Get all products (for debugging)
app.get('/api/test-products', async (req, res) => {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        const sql = `SELECT * FROM PRODUCTS`;
        const result = await connection.execute(sql, [], { outFormat: oracledb.OUT_FORMAT_OBJECT });
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        if (connection) await connection.close();
    }
});

// POST (Add) a new product - Example route for adding data to DB
app.post('/api/products', async (req, res) => {
    let connection;
    try {
        // Destructure product data from request body
        const { name, description, price, currency, stock, imageUrl, category, subcategory } = req.body;

        // Basic validation
        if (!name || !price || !category || !subcategory || !imageUrl || currency === undefined || stock === undefined) {
            return res.status(400).json({ message: 'Missing required product fields. Ensure name, price, currency, stock, imageUrl, category, and subcategory are provided.' });
        }

        connection = await oracledb.getConnection(dbConfig);

        // Generate a unique ID for the new product (UUID v4)
        const productId = crypto.randomUUID();

        const sql = `INSERT INTO PRODUCTS (ID, NAME, PRICE, CURRENCY, STOCK, DESCRIPTION, IMAGE_URL, CATEGORY, SUBCATEGORY)
                     VALUES (:id, :name, :price, :currency, :stock, :description, :imageUrl, :category, :subcategory)`;

        const binds = {
            id: productId,
            name: name,
            price: price,
            currency: currency,
            stock: stock,
            description: description,
            imageUrl: imageUrl,
            category: category,
            subcategory: subcategory // This should be the combined subcategory like 'unstitched_1pc'
        };

        const options = { autoCommit: true }; // Commit the transaction immediately

        console.log('Attempting to insert product:', binds);
        const result = await connection.execute(sql, binds, options);
        console.log('Product insert result:', result.rowsAffected, 'rows affected.');
        res.status(201).json({ message: 'Product added successfully', productId: productId, rowsAffected: result.rowsAffected });

    } catch (err) {
        console.error('Error adding product:', err);
        res.status(500).json({ message: 'Internal server error while adding product', error: err.message });
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error('Error closing connection:', err);
            }
        }
    }
});

// TEST: Return a dummy product for frontend testing
app.get('/api/products-dummy', (req, res) => {
    res.json({
        products: [
            {
                id: 'dummy1',
                name: 'Dummy Product',
                price: 1234.56,
                currency: 'PKR',
                stock: 10,
                description: 'This is a dummy product for testing.',
                imageUrl: 'https://via.placeholder.com/300x400?text=Dummy+Product',
                category: 'women',
                subcategory: 'unstitched_1pc'
            }
        ]
    });
});

// Place an order and update product stock (with stock check and detailed logging)
app.post('/api/orders', async (req, res) => {
    const { userId, items, totalAmount } = req.body; // items: [{ productId, quantity, price }]
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);

        // 1. Check stock for all items first
        for (const item of items) {
            const stockResult = await connection.execute(
                `SELECT STOCK FROM PRODUCTS WHERE ID = :productId`,
                { productId: item.productId }
            );
            const currentStock = stockResult.rows[0]?.STOCK;
            if (currentStock === undefined) {
                console.error(`Product not found: ${item.productId}`);
                throw new Error(`Product not found: ${item.productId}`);
            }
            if (currentStock < item.quantity) {
                console.error(`Not enough stock for product ${item.productId}. Requested: ${item.quantity}, Available: ${currentStock}`);
                throw new Error(`Not enough stock for product ${item.productId}`);
            }
        }

        // 2. Create the order
        const orderResult = await connection.execute(
            `INSERT INTO ORDERS (USER_ID, TOTAL_AMOUNT) VALUES (:userId, :totalAmount) RETURNING ID INTO :orderId`,
            { userId, totalAmount, orderId: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER } },
            { autoCommit: false }
        );
        const orderId = orderResult.outBinds.orderId[0];

        // 3. For each item, insert into ORDER_ITEMS and update product stock
        for (const item of items) {
            // Insert order item
            await connection.execute(
                `INSERT INTO ORDER_ITEMS (ORDER_ID, PRODUCT_ID, QUANTITY, PRICE) VALUES (:orderId, :productId, :quantity, :price)`,
                { orderId, productId: item.productId, quantity: item.quantity, price: item.price }
            );
            // Update product stock
            console.log(`Updating stock for product ${item.productId}: -${item.quantity}`);
            const updateResult = await connection.execute(
                `UPDATE PRODUCTS SET STOCK = STOCK - :quantity WHERE ID = :productId`,
                { quantity: item.quantity, productId: item.productId }
            );
            console.log(`Stock update result for ${item.productId}:`, updateResult.rowsAffected, 'rows affected');
        }

        await connection.commit();
        res.status(201).json({ message: 'Order placed and stock updated!', orderId });

    } catch (err) {
        if (connection) await connection.rollback();
        console.error('Order placement failed:', err.message);
        res.status(400).json({ message: err.message || 'Order failed', error: err.message });
    } finally {
        if (connection) await connection.close();
    }
});

// Admin login endpoint
app.post('/api/admin-login', async (req, res) => {
    const { username, password } = req.body;
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        const sql = `SELECT * FROM ADMIN WHERE LOWER(USERNAME) = :username AND LOWER(PASSWORD) = :password`;
        const result = await connection.execute(
            sql,
            { username: username.toLowerCase(), password: password.toLowerCase() },
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );
        if (result.rows.length === 1) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: 'Invalid admin credentials.' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    } finally {
        if (connection) await connection.close();
    }
});

// Start the server
app.listen(port, () => {
    console.log(`KHAN'S WARDROBE backend listening at http://localhost:${port}`);
    console.log('\n--- IMPORTANT SETUP INSTRUCTIONS ---');
    console.log('To run this server:');
    console.log('1. Make sure you have Node.js installed.');
    console.log('2. Open your terminal in this directory.');
    console.log('3. Install required packages: `npm install express body-parser cors oracledb dotenv`');
    console.log('4. Ensure Oracle Instant Client is set up and its path is configured for `oracledb` to work.');
    console.log('   (Refer to Oracle documentation for Instant Client setup)');
    console.log('5. Create a `.env` file in the same directory with your Oracle database credentials:');
    console.log('   DB_USER=your_oracle_username');
    console.log('   DB_PASSWORD=your_oracle_password');
    console.log('   DB_CONNECT_STRING=your_oracle_connection_string (e.g., localhost:1521/ORCLPDB1)');
    console.log('6. Run the server: `node server.js`');
    console.log('7. To test the server is running, open your browser and go to: http://localhost:3000/api/test');
    console.log('8. To fetch ALL products for testing, go to: http://localhost:3000/api/products/all');
    console.log('------------------------------------');
});
