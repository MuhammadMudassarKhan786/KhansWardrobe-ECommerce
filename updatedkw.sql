


-- 1. Create the PRODUCTS table
CREATE TABLE PRODUCTS (
    ID VARCHAR2(50) PRIMARY KEY, -- Unique identifier for each product
    NAME VARCHAR2(255) NOT NULL,
    PRICE NUMBER(10, 2) NOT NULL,
    CURRENCY VARCHAR2(10) DEFAULT 'PKR' NOT NULL,
    STOCK NUMBER(5) DEFAULT 0 NOT NULL,
    DESCRIPTION VARCHAR2(1000),
    IMAGE_URL VARCHAR2(500), -- URL to the product image (web-accessible or relative static path)
    CATEGORY VARCHAR2(50) NOT NULL,    -- e.g., 'women', 'men', 'boys_girls'
    SUBCATEGORY VARCHAR2(50) NOT NULL, -- e.g., 'unstitched_1pc', 'kameez_shalwar_casual'
    CREATED_AT TIMESTAMP DEFAULT SYSTIMESTAMP NOT NULL,
    UPDATED_AT TIMESTAMP DEFAULT SYSTIMESTAMP NOT NULL
);

-- Add comments to the PRODUCTS table and columns (optional, but good practice)
COMMENT ON TABLE PRODUCTS IS 'Stores product details for KHAN''S WARDROBE.';
COMMENT ON COLUMN PRODUCTS.ID IS 'Unique product identifier.';
COMMENT ON COLUMN PRODUCTS.NAME IS 'Name of the product.';
COMMENT ON COLUMN PRODUCTS.PRICE IS 'Price of the product.';
COMMENT ON COLUMN PRODUCTS.CURRENCY IS 'Currency of the product price (e.g., PKR).';
COMMENT ON COLUMN PRODUCTS.STOCK IS 'Number of units in stock.';
COMMENT ON COLUMN PRODUCTS.DESCRIPTION IS 'Detailed description of the product.';
COMMENT ON COLUMN PRODUCTS.IMAGE_URL IS 'URL to the product image.';
COMMENT ON COLUMN PRODUCTS.CATEGORY IS 'Main category of the product (e.g., women, men, boys_girls).';
COMMENT ON COLUMN PRODUCTS.SUBCATEGORY IS 'Specific subcategory within the main category (e.g., unstitched_1pc, kurti_tops).';
COMMENT ON COLUMN PRODUCTS.CREATED_AT IS 'Timestamp when the product record was created.';
COMMENT ON COLUMN PRODUCTS.UPDATED_AT IS 'Timestamp when the product record was last updated.';


-- 2. Create the USERS table
CREATE TABLE USERS (
    ID NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    NAME VARCHAR2(100) NOT NULL,
    EMAIL VARCHAR2(100) UNIQUE NOT NULL,
    PASSWORD VARCHAR2(100) NOT NULL, -- In a real app, store hashed passwords!
    ADDRESS VARCHAR2(255),
    PHONE VARCHAR2(20),
    CREATED_AT TIMESTAMP DEFAULT SYSTIMESTAMP NOT NULL
);

-- 3. Create the ADMIN table
CREATE TABLE ADMIN (
    ID NUMBER PRIMARY KEY, -- Could also be GENERATED ALWAYS AS IDENTITY
    USERNAME VARCHAR2(50) UNIQUE NOT NULL,
    PASSWORD VARCHAR2(100) NOT NULL -- In a real app, store hashed passwords!
);

-- Insert a single admin (change password as needed)
INSERT INTO ADMIN (ID, USERNAME, PASSWORD) VALUES (1, 'admin', 'admin123');
select * from Admin;

-- 4. Create the ORDERS table
CREATE TABLE ORDERS (
    ID NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    USER_ID NUMBER NOT NULL,
    ORDER_DATE TIMESTAMP DEFAULT SYSTIMESTAMP NOT NULL,
    TOTAL_AMOUNT NUMBER(10,2) NOT NULL,
    STATUS VARCHAR2(20) DEFAULT 'PLACED', -- e.g., 'PLACED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'
    FOREIGN KEY (USER_ID) REFERENCES USERS(ID)
);

-- 5. Create the ORDER_ITEMS table
CREATE TABLE ORDER_ITEMS (
    ID NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ORDER_ID NUMBER NOT NULL,
    PRODUCT_ID VARCHAR2(50) NOT NULL,
    QUANTITY NUMBER(5) NOT NULL,
    PRICE NUMBER(10,2) NOT NULL, -- Price at the time of order
    FOREIGN KEY (ORDER_ID) REFERENCES ORDERS(ID),
    FOREIGN KEY (PRODUCT_ID) REFERENCES PRODUCTS(ID)
);

-- 6. Insert Sample Data into PRODUCTS
select * from Products;
-- WOMEN COLLECTION
-- Women's Unstitched 1PC
INSERT INTO PRODUCTS (ID, NAME, PRICE, CURRENCY, STOCK, DESCRIPTION, IMAGE_URL, CATEGORY, SUBCATEGORY) VALUES
('wu1p001', 'Green Lawn Digital Printed Unstitched 1PC', 1490.00, 'PKR', 28, 'A beautiful digital printed lawn fabric, perfect for a casual 1-piece suit.', 'frontend\assets\images for khan wardrobe\u1.png', 'women', 'unstitched_1pc');
update products set IMAGE_URL ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH0hq4Ykz9lyPwHIZgRq10iEWDEEETAlK8ww&s' where id='wu1p001';
INSERT INTO PRODUCTS (ID, NAME, PRICE, CURRENCY, STOCK, DESCRIPTION, IMAGE_URL, CATEGORY, SUBCATEGORY) VALUES
('wu1p002', 'White Lawn Digital Printed Unstitched 1PC', 1490.00, 'PKR', 15, 'Elegant white lawn with digital prints, versatile for any occasion.', '/assets/images/u2.png', 'women', 'unstitched_1pc');

INSERT INTO PRODUCTS (ID, NAME, PRICE, CURRENCY, STOCK, DESCRIPTION, IMAGE_URL, CATEGORY, SUBCATEGORY) VALUES
('wu1p003', 'Multicolor Lawn Digital Printed Unstitched 1PC', 1490.00, 'PKR', 5, 'Vibrant multicolor digital print for a lively look.', 'frontend/assets/images for khan wardrobe/u3.png', 'women', 'unstitched_1pc');
INSERT INTO PRODUCTS (ID, NAME, PRICE, CURRENCY, STOCK, DESCRIPTION, IMAGE_URL, CATEGORY, SUBCATEGORY) VALUES
('wu1p004', 'Blue Floral Printed Unstitched 1PC', 1650.00, 'PKR', 10, 'Serene blue with delicate floral prints, ideal for summer.', '/assets/images/u5.png', 'women', 'unstitched_1pc');

-- Women's Unstitched 2PC (Added)
INSERT INTO PRODUCTS (ID, NAME, PRICE, CURRENCY, STOCK, DESCRIPTION, IMAGE_URL, CATEGORY, SUBCATEGORY) VALUES
('wu2p001', 'Summer Breeze Unstitched 2PC', 2500.00, 'PKR', 18, 'Lightweight fabric with elegant prints for a two-piece ensemble.', '/assets/images/wu2.png', 'women', 'unstitched_2pc');

-- Women's Unstitched 3PC (Added)
INSERT INTO PRODUCTS (ID, NAME, PRICE, CURRENCY, STOCK, DESCRIPTION, IMAGE_URL, CATEGORY, SUBCATEGORY) VALUES
('wu3p001', 'Grandeur Unstitched 3PC', 3800.00, 'PKR', 10, 'Complete unstitched suit with intricate work for special occasions.', '/assets/images/wu3.png', 'women', 'unstitched_3pc');

-- Women's Stitched 2PC
INSERT INTO PRODUCTS (ID, NAME, PRICE, CURRENCY, STOCK, DESCRIPTION, IMAGE_URL, CATEGORY, SUBCATEGORY) VALUES
('ws2p002', 'Stitched 2PC Suit', 1990.00, 'PKR', 10, 'Ready-to-wear 2-piece suit.', '/assets/images/ws1.png', 'women', 'stitched_2pc');

-- Women's Stitched 3PC
INSERT INTO PRODUCTS (ID, NAME, PRICE, CURRENCY, STOCK, DESCRIPTION, IMAGE_URL, CATEGORY, SUBCATEGORY) VALUES
('ws3p002', 'Stitched 3PC Suit', 2290.00, 'PKR', 8, 'Ready-to-wear 3-piece suit.', '/assets/images/ws2.png', 'women', 'stitched_3pc');

-- Women's Kurti Tops
INSERT INTO PRODUCTS (ID, NAME, PRICE, CURRENCY, STOCK, DESCRIPTION, IMAGE_URL, CATEGORY, SUBCATEGORY) VALUES
('wkt001', 'Kurti Top', 1200.00, 'PKR', 12, 'Trendy kurti top.', '/assets/images/k1.png', 'women', 'kurti_tops');

-- Women's Formal Kurti
INSERT INTO PRODUCTS (ID, NAME, PRICE, CURRENCY, STOCK, DESCRIPTION, IMAGE_URL, CATEGORY, SUBCATEGORY) VALUES
('wkf001', 'Formal Kurti', 1500.00, 'PKR', 7, 'Elegant formal kurti.', '/assets/images/k2.png', 'women', 'kurti_formal');

-- Women's Formals Stitched (Added)
INSERT INTO PRODUCTS (ID, NAME, PRICE, CURRENCY, STOCK, DESCRIPTION, IMAGE_URL, CATEGORY, SUBCATEGORY) VALUES
('wfs001', 'Embroidered Formal Stitched Dress', 6500.00, 'PKR', 6, 'Exquisite stitched formal dress with detailed embroidery.', '/assets/images/f1.png', 'women', 'formals_stitched');

-- Women's Formals Unstitched (Added)
INSERT INTO PRODUCTS (ID, NAME, PRICE, CURRENCY, STOCK, DESCRIPTION, IMAGE_URL, CATEGORY, SUBCATEGORY) VALUES
('wfu001', 'Luxury Unstitched Formal Fabric', 5800.00, 'PKR', 9, 'Premium unstitched fabric for custom formal wear.', '/assets/images/f2.png', 'women', 'formals_unstitched');

-- Women's Formals Kurti (Added)
INSERT INTO PRODUCTS (ID, NAME, PRICE, CURRENCY, STOCK, DESCRIPTION, IMAGE_URL, CATEGORY, SUBCATEGORY) VALUES
('wfk001', 'Designer Formal Kurti', 3200.00, 'PKR', 11, 'Stylish and elegant kurti for formal events.', '/assets/images/f3.png', 'women', 'formals_kurti');

-- Women's Exclusive Gift Box
INSERT INTO PRODUCTS (ID, NAME, PRICE, CURRENCY, STOCK, DESCRIPTION, IMAGE_URL, CATEGORY, SUBCATEGORY) VALUES
('wegb001', 'Luxury Women Gift Box', 7500.00, 'PKR', 5, 'A curated selection of luxury items for women, perfect as a gift.', '/assets/images/g1.png', 'women', 'exclusive_gift_box');


-- MEN COLLECTION
-- Men's Exclusive Gift Box (Added)
INSERT INTO PRODUCTS (ID, NAME, PRICE, CURRENCY, STOCK, DESCRIPTION, IMAGE_URL, CATEGORY, SUBCATEGORY) VALUES
('megb001', 'Gentlemen''s Premium Gift Box', 8000.00, 'PKR', 4, 'A sophisticated gift box for men, featuring premium accessories.', '/assets/images/men_gift_box.png', 'men', 'exclusive_gift_box');

-- Men's Kameez Shalwar Casual
INSERT INTO PRODUCTS (ID, NAME, PRICE, CURRENCY, STOCK, DESCRIPTION, IMAGE_URL, CATEGORY, SUBCATEGORY) VALUES
('mksc001', 'Men Black Kameez Shalwar', 1990.00, 'PKR', 20, 'Classic black kameez shalwar for men, perfect for formal occasions.', '/assets/images/m1.png', 'men', 'kameez_shalwar_casual');

-- Men's Kameez Shalwar Semi-Formal
INSERT INTO PRODUCTS (ID, NAME, PRICE, CURRENCY, STOCK, DESCRIPTION, IMAGE_URL, CATEGORY, SUBCATEGORY) VALUES
('mksf001', 'Men Semi-Formal Kameez Shalwar', 2100.00, 'PKR', 15, 'Semi-formal kameez shalwar.', '/assets/images/m3.png', 'men', 'kameez_shalwar_semi_formal');

-- Men's Kameez Shalwar Formal
INSERT INTO PRODUCTS (ID, NAME, PRICE, CURRENCY, STOCK, DESCRIPTION, IMAGE_URL, CATEGORY, SUBCATEGORY) VALUES
('mkf001', 'Men Formal Kameez Shalwar', 2300.00, 'PKR', 10, 'Formal kameez shalwar.', '/assets/images/m4.png', 'men', 'kameez_shalwar_formal');

-- Men's Kameez Shalwar Exclusive (Added)
INSERT INTO PRODUCTS (ID, NAME, PRICE, CURRENCY, STOCK, DESCRIPTION, IMAGE_URL, CATEGORY, SUBCATEGORY) VALUES
('mkse001', 'Exclusive Embroidered Kameez Shalwar', 4500.00, 'PKR', 7, 'Hand-embroidered kameez shalwar for exclusive events.', '/assets/images/m_exclusive.png', 'men', 'kameez_shalwar_exclusive');

-- Men's Kurta Casual
INSERT INTO PRODUCTS (ID, NAME, PRICE, CURRENCY, STOCK, DESCRIPTION, IMAGE_URL, CATEGORY, SUBCATEGORY) VALUES
('mkc001', 'Men White Kurta', 1750.00, 'PKR', 12, 'Elegant white kurta for men, suitable for all events.', '/assets/images/m2.png', 'men', 'kurta_casual');

-- Men's Kurta Semi-Formal (Added)
INSERT INTO PRODUCTS (ID, NAME, PRICE, CURRENCY, STOCK, DESCRIPTION, IMAGE_URL, CATEGORY, SUBCATEGORY) VALUES
('mksf002', 'Semi-Formal Cotton Kurta', 1850.00, 'PKR', 15, 'Comfortable cotton kurta for semi-formal gatherings.', '/assets/images/m_kurta_sf.png', 'men', 'kurta_semi_formal');

-- Men's Kurta Formal (Added)
INSERT INTO PRODUCTS (ID, NAME, PRICE, CURRENCY, STOCK, DESCRIPTION, IMAGE_URL, CATEGORY, SUBCATEGORY) VALUES
('mkf002', 'Formal Silk Kurta', 2800.00, 'PKR', 8, 'Luxurious silk kurta for formal occasions.', '/assets/images/m_kurta_f.png', 'men', 'kurta_formal');

-- Men's Kurta Short (Added)
INSERT INTO PRODUCTS (ID, NAME, PRICE, CURRENCY, STOCK, DESCRIPTION, IMAGE_URL, CATEGORY, SUBCATEGORY) VALUES
('mks001', 'Short Casual Kurta', 1400.00, 'PKR', 20, 'Stylish short kurta for everyday wear.', '/assets/images/m_kurta_short.png', 'men', 'kurta_short');

-- Men's Kameez Shalwar & Waistcoat (Added)
INSERT INTO PRODUCTS (ID, NAME, PRICE, CURRENCY, STOCK, DESCRIPTION, IMAGE_URL, CATEGORY, SUBCATEGORY) VALUES
('mksw001', 'Kameez Shalwar with Waistcoat Set', 5200.00, 'PKR', 9, 'Complete traditional set with matching waistcoat.', '/assets/images/m_ksw.png', 'men', 'kameez_shalwar_waistcoat');

-- Men's Unstitched Fabric - Platinum Class (Added)
INSERT INTO PRODUCTS (ID, NAME, PRICE, CURRENCY, STOCK, DESCRIPTION, IMAGE_URL, CATEGORY, SUBCATEGORY) VALUES
('mup001', 'Platinum Class Unstitched Fabric', 7000.00, 'PKR', 10, 'Finest quality unstitched fabric for bespoke tailoring.', '/assets/images/m_unstitched_platinum.png', 'men', 'unstitched_platinum');

-- Men's Unstitched Fabric - Gold Class (Added)
INSERT INTO PRODUCTS (ID, NAME, PRICE, CURRENCY, STOCK, DESCRIPTION, IMAGE_URL, CATEGORY, SUBCATEGORY) VALUES
('mug001', 'Gold Class Unstitched Fabric', 5500.00, 'PKR', 15, 'High-quality unstitched fabric with rich texture.', '/assets/images/m_unstitched_gold.png', 'men', 'unstitched_gold');

-- Men's Unstitched Fabric - Silver Class (Added)
INSERT INTO PRODUCTS (ID, NAME, PRICE, CURRENCY, STOCK, DESCRIPTION, IMAGE_URL, CATEGORY, SUBCATEGORY) VALUES
('mus001', 'Silver Class Unstitched Fabric', 4000.00, 'PKR', 20, 'Durable and comfortable unstitched fabric.', '/assets/images/m_unstitched_silver.png', 'men', 'unstitched_silver');

-- Men's Unstitched Fabric - Boski (Added)
INSERT INTO PRODUCTS (ID, NAME, PRICE, CURRENCY, STOCK, DESCRIPTION, IMAGE_URL, CATEGORY, SUBCATEGORY) VALUES
('mub001', 'Authentic Boski Unstitched Fabric', 9000.00, 'PKR', 8, 'Premium Boski fabric for a luxurious feel.', '/assets/images/m_unstitched_boski.png', 'men', 'unstitched_boski');

-- Men's Unstitched Fabric - Expression (Added)
INSERT INTO PRODUCTS (ID, NAME, PRICE, CURRENCY, STOCK, DESCRIPTION, IMAGE_URL, CATEGORY, SUBCATEGORY) VALUES
('mue001', 'Expression Series Unstitched Fabric', 3500.00, 'PKR', 12, 'Unique patterns and colors in unstitched fabric.', '/assets/images/m_unstitched_expression.png', 'men', 'unstitched_expression');

-- Men's Sweaters (Added)
INSERT INTO PRODUCTS (ID, NAME, PRICE, CURRENCY, STOCK, DESCRIPTION, IMAGE_URL, CATEGORY, SUBCATEGORY) VALUES
('msw001', 'Warm Winter Sweater', 2800.00, 'PKR', 25, 'Cozy and stylish sweater for cold weather.', '/assets/images/m_sweater.png', 'men', 'sweaters');

-- Men's Waistcoat (Added)
INSERT INTO PRODUCTS (ID, NAME, PRICE, CURRENCY, STOCK, DESCRIPTION, IMAGE_URL, CATEGORY, SUBCATEGORY) VALUES
('mwc001', 'Classic Formal Waistcoat', 3200.00, 'PKR', 15, 'Elegant waistcoat to complete your traditional look.', '/assets/images/m_waistcoat.png', 'men', 'waistcoat');

-- Men's Caps (Added)
INSERT INTO PRODUCTS (ID, NAME, PRICE, CURRENCY, STOCK, DESCRIPTION, IMAGE_URL, CATEGORY, SUBCATEGORY) VALUES
('mcap001', 'Traditional Sindhi Cap', 800.00, 'PKR', 30, 'Authentic Sindhi cap with traditional embroidery.', '/assets/images/m_cap.png', 'men', 'caps');

-- Men's Shawl (Added)
INSERT INTO PRODUCTS (ID, NAME, PRICE, CURRENCY, STOCK, DESCRIPTION, IMAGE_URL, CATEGORY, SUBCATEGORY) VALUES
('msh001', 'Soft Pashmina Shawl', 4500.00, 'PKR', 10, 'Luxurious pashmina shawl for warmth and style.', '/assets/images/m_shawl.png', 'men', 'shawl');

-- Men's Pocket Square (Added)
INSERT INTO PRODUCTS (ID, NAME, PRICE, CURRENCY, STOCK, DESCRIPTION, IMAGE_URL, CATEGORY, SUBCATEGORY) VALUES
('mps001', 'Silk Pocket Square', 600.00, 'PKR', 40, 'Elegant silk pocket square to add a touch of class.', '/assets/images/m_pocket_square.png', 'men', 'pocket_square');

-- Men's Grooms Collection - Sherwani (Added)
INSERT INTO PRODUCTS (ID, NAME, PRICE, CURRENCY, STOCK, DESCRIPTION, IMAGE_URL, CATEGORY, SUBCATEGORY) VALUES
('mgs001', 'Embroidered Groom Sherwani', 18000.00, 'PKR', 3, 'Grand sherwani with intricate gold embroidery for grooms.', '/assets/images/m_sherwani.png', 'men', 'grooms_sherwani');

-- Men's Grooms Collection - Turban (Added)
INSERT INTO PRODUCTS (ID, NAME, PRICE, CURRENCY, STOCK, DESCRIPTION, IMAGE_URL, CATEGORY, SUBCATEGORY) VALUES
('mgt001', 'Groom''s Wedding Turban', 3500.00, 'PKR', 7, 'Traditional wedding turban with embellishments.', '/assets/images/m_turban.png', 'men', 'grooms_turban');

-- Men's Grooms Collection - Khussa (Added)
INSERT INTO PRODUCTS (ID, NAME, PRICE, CURRENCY, STOCK, DESCRIPTION, IMAGE_URL, CATEGORY, SUBCATEGORY) VALUES
('mgk001', 'Handcrafted Groom Khussa', 2200.00, 'PKR', 10, 'Traditional handcrafted leather khussa for grooms.', '/assets/images/m_khussa.png', 'men', 'grooms_khussa');

-- Men's Grooms Collection - Special Kurta (Added)
INSERT INTO PRODUCTS (ID, NAME, PRICE, CURRENCY, STOCK, DESCRIPTION, IMAGE_URL, CATEGORY, SUBCATEGORY) VALUES
('mgsk001', 'Groom''s Special Kurta', 4800.00, 'PKR', 8, 'Specially designed kurta for pre-wedding events.', '/assets/images/m_special_kurta.png', 'men', 'grooms_special_kurta');

-- Men's Grooms Collection - Teen Boys (Added)
INSERT INTO PRODUCTS (ID, NAME, PRICE, CURRENCY, STOCK, DESCRIPTION, IMAGE_URL, CATEGORY, SUBCATEGORY) VALUES
('mgtb001', 'Teen Boy''s Groom Outfit', 3000.00, 'PKR', 12, 'Smaller size formal outfit for teen boys attending weddings.', '/assets/images/m_groom_teen.png', 'men', 'grooms_teen_boys');

-- Men's Grooms Collection - Kid Boys (Added)
INSERT INTO PRODUCTS (ID, NAME, PRICE, CURRENCY, STOCK, DESCRIPTION, IMAGE_URL, CATEGORY, SUBCATEGORY) VALUES
('mgkb001', 'Kid Boy''s Groom Outfit', 2500.00, 'PKR', 15, 'Adorable formal wear for young boys at weddings.', '/assets/images/m_groom_kid.png', 'men', 'grooms_kid_boys');

-- Men's Like Father Like Son (Added)
INSERT INTO PRODUCTS (ID, NAME, PRICE, CURRENCY, STOCK, DESCRIPTION, IMAGE_URL, CATEGORY, SUBCATEGORY) VALUES
('mlfls001', 'Matching Father Son Kameez Shalwar', 7000.00, 'PKR', 5, 'Coordinated traditional outfits for father and son.', '/assets/images/m_lfls.png', 'men', 'like_father_like_son');


-- BOYS & GIRLS COLLECTION
-- Boys & Girls Teen Girls
INSERT INTO PRODUCTS (ID, NAME, PRICE, CURRENCY, STOCK, DESCRIPTION, IMAGE_URL, CATEGORY, SUBCATEGORY) VALUES
('tgt001', 'Teen Girl Dress', 1200.00, 'PKR', 18, 'Trendy dress for teen girls.', '/assets/images/bg1.png', 'boys_girls', 'teen_girls');

-- Boys & Girls Teen Boys
INSERT INTO PRODUCTS (ID, NAME, PRICE, CURRENCY, STOCK, DESCRIPTION, IMAGE_URL, CATEGORY, SUBCATEGORY) VALUES
('tbt001', 'Teen Boy Shirt', 1100.00, 'PKR', 15, 'Cool shirt for teen boys.', '/assets/images/bg2.png', 'boys_girls', 'teen_boys');

-- Boys & Girls Kid Girls
INSERT INTO PRODUCTS (ID, NAME, PRICE, CURRENCY, STOCK, DESCRIPTION, IMAGE_URL, CATEGORY, SUBCATEGORY) VALUES
('kgt001', 'Kid Girl Frock', 1000.00, 'PKR', 10, 'Cute frock for kid girls.', '/assets/images/bg3.png', 'boys_girls', 'kid_girls');

-- Boys & Girls Kid Boys
INSERT INTO PRODUCTS (ID, NAME, PRICE, CURRENCY, STOCK, DESCRIPTION, IMAGE_URL, CATEGORY, SUBCATEGORY) VALUES
('kbt001', 'Kid Boy Suit', 1050.00, 'PKR', 8, 'Smart suit for kid boys.', '/assets/images/bg4.png', 'boys_girls', 'kid_boys');

-- Boys & Girls Infant
INSERT INTO PRODUCTS (ID, NAME, PRICE, CURRENCY, STOCK, DESCRIPTION, IMAGE_URL, CATEGORY, SUBCATEGORY) VALUES
('inf001', 'Infant Baby Romper', 900.00, 'PKR', 20, 'Soft and comfortable romper for infants.', '/assets/images/bg5.png', 'boys_girls', 'infant');

COMMIT;
