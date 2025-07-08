// product_listing.js for KHAN'S WARDROBE Product Listing Page

document.addEventListener('DOMContentLoaded', () => {
    console.log('Product Listing page loaded!');

    const categoryTitleElement = document.getElementById('category-title');
    const itemCountElement = document.getElementById('item-count');
    const productGridElement = document.getElementById('product-grid');
    const sortBySelect = document.getElementById('sort-by');
    const loadingIndicator = document.createElement('p'); // Create a loading indicator element
    loadingIndicator.textContent = 'Loading products...';
    loadingIndicator.className = 'col-span-full text-center text-gray-500 text-lg py-10';

    // This variable will hold the products fetched from the backend
    let currentProducts = [];

    // --- Backend Integration (Actual API Call) ---
    async function fetchProductsFromBackend(params) {
        try {
            // Construct the URL for your backend API using all relevant parameters
            // IMPORTANT: If your backend is not on the same domain/port,
            // replace '/api/products' with the full URL, e.g., 'http://localhost:3000/api/products'
            const queryParts = [];
            if (params.category) queryParts.push(`category=${encodeURIComponent(params.category)}`);
            if (params.subcategory) queryParts.push(`subcategory=${encodeURIComponent(params.subcategory)}`);
            // Use full backend URL for API calls
            // For real products:
            const apiUrl = `http://localhost:3000/api/products?${queryParts.join('&')}`;
            // For dummy product testing, uncomment the next line:
            // const apiUrl = 'http://localhost:3000/api/products-dummy';
            
            productGridElement.innerHTML = ''; // Clear previous products
            productGridElement.appendChild(loadingIndicator); // Show loading indicator
            itemCountElement.textContent = 'Loading...';

            console.log('Frontend: Fetching from API:', apiUrl);
            const response = await fetch(apiUrl);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP error! status: ${response.status} - ${errorData.message || response.statusText}`);
            }

            const data = await response.json(); // Expecting { title: "...", products: [...] }
            console.log('Frontend: Received data:', data);

            // Update the category title based on the backend response
            if (data.title) {
                categoryTitleElement.textContent = data.title;
            } else {
                categoryTitleElement.textContent = 'Products'; // Fallback title
            }

            return data.products || []; // Return the products array
        } catch (error) {
            console.error("Frontend: Error fetching products from backend:", error);
            productGridElement.innerHTML = `<p class="col-span-full text-center text-red-600 text-lg py-10">Error loading products: ${error.message}. Please ensure the backend server is running and accessible.</p>`;
            itemCountElement.textContent = '0 ITEMS';
            return []; // Return empty array on error
        } finally {
            // Remove loading indicator if it's still there (e.g., if an error occurred after initial fetch)
            if (productGridElement.contains(loadingIndicator)) {
                productGridElement.removeChild(loadingIndicator);
            }
        }
    }

    // --- Utility Functions ---

    // Function to parse URL query parameters for category, type, pieces, style
    function getQueryParams() {
        const params = {};
        const queryString = window.location.search.substring(1);
        const regex = /([^&=]+)=([^&]*)/g;
        let m;
        while (m = regex.exec(queryString)) {
            params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
        }
        return params;
    }

    // Function to render products to the DOM
    function renderProducts(products) {
        productGridElement.innerHTML = ''; // Clear existing products
        if (products.length === 0) {
            productGridElement.innerHTML = '<p class="col-span-full text-center text-gray-600 text-lg py-10">No products found for this category.</p>';
            itemCountElement.textContent = '0 ITEMS';
            return;
        }

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transform transition-transform duration-200 hover:scale-105 hover:shadow-xl group';
            productCard.innerHTML = `
                <div class="relative overflow-hidden">
                    <img src="${product.imageUrl}" alt="${product.name}" class="w-full h-64 object-cover">
                    <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-sm px-3 py-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex justify-between items-center">
                        <span>Stock: ${product.stock > 0 ? product.stock : 'Out of Stock'}</span>
                        <span class="text-xs ${product.stock > 0 ? 'text-green-400' : 'text-red-400'}">${product.stock > 0 ? 'In Stock' : 'Unavailable'}</span>
                    </div>
                </div>
                <div class="p-4 md:p-5 flex-grow flex flex-col justify-between">
                    <div>
                        <h3 class="text-lg md:text-xl font-semibold text-gray-800 mb-2">${product.name}</h3>
                        <p class="text-gray-600 text-sm mb-3">${product.description}</p>
                    </div>
                    <div class="mt-auto">
                        <p class="text-xl md:text-2xl font-bold text-red-700 mb-3">${product.currency} ${product.price}</p>
                        <button class="add-to-bag-btn w-full bg-red-700 hover:bg-red-800 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                                ${product.stock <= 0 ? 'disabled' : ''}>
                            ${product.stock > 0 ? 'ADD TO BAG' : 'NOT AVAILABLE'}
                        </button>
                    </div>
                </div>
            `;
            // Add event listener to the button
            const btn = productCard.querySelector('.add-to-bag-btn');
            if (btn && product.stock > 0) {
                btn.addEventListener('click', () => handleAddToBag(product));
            }
            productGridElement.appendChild(productCard);
        });
        itemCountElement.textContent = `${products.length} ITEMS`;
    }

    // Function to filter and sort products (now operates on currentProducts)
    function getFilteredAndSortedProducts() {
        const sortBy = sortBySelect.value;
        let sortedProducts = [...currentProducts]; // Create a copy to sort

        // Sort products
        switch (sortBy) {
            case 'newest_arrivals':
                // For real data, you'd sort by a timestamp or creation date field from your DB
                // For mock data, we'll sort by ID assuming higher ID means newer
                sortedProducts.sort((a, b) => b.id.localeCompare(a.id));
                break;
            case 'price_asc':
                // Ensure price is parsed as a number before comparison
                sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
                break;
            case 'price_desc':
                // Ensure price is parsed as a number before comparison
                sortedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
                break;
            case 'name_asc':
                sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name_desc':
                sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
                break;
        }
        return sortedProducts;
    }

    // Function to add product to cart in localStorage
    function addToCart(product, quantity) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        // Check if product already in cart
        const existing = cart.find(item => item.id === product.id);
        if (existing) {
            existing.quantity += quantity;
        } else {
            cart.push({ ...product, quantity });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.name} (x${quantity}) added to cart!`);
    }

    // Function to handle Add to Bag button click
    function handleAddToBag(product) {
        // Prompt for quantity (simple prompt for MVP)
        let quantity = parseInt(prompt('Enter quantity:', '1'), 10);
        if (isNaN(quantity) || quantity < 1) {
            alert('Invalid quantity.');
            return;
        }
        if (quantity > product.stock) {
            alert('Not enough stock available.');
            return;
        }
        addToCart(product, quantity);
    }

    // --- Initialization ---
    async function initializePage() {
        const params = getQueryParams();
        console.log('Frontend: Parsed URL Parameters:', params);

        if (params.category) {
            // Fetch products from the actual backend using all relevant params
            currentProducts = await fetchProductsFromBackend(params);

            // Render products after fetching and sorting
            const productsToDisplay = getFilteredAndSortedProducts();
            renderProducts(productsToDisplay);

        } else {
            categoryTitleElement.textContent = 'All Products'; // Default title if no specific params
            productGridElement.innerHTML = '<p class="col-span-full text-center text-gray-600 text-lg py-10">Please select a category and subcategory from the navigation to view products.</p>';
            itemCountElement.textContent = '0 ITEMS';
            console.warn('Frontend: No specific category or subcategory found in URL parameters. Displaying general message.');
        }
    }

    // Event Listener for sorting
    sortBySelect.addEventListener('change', () => {
        // Re-render based on the already fetched 'currentProducts'
        const productsToDisplay = getFilteredAndSortedProducts();
        renderProducts(productsToDisplay);
    });

    // Initial load of products
    initializePage();
});
