// men.js for KHAN'S WARDROBE Men's Collection page

document.addEventListener('DOMContentLoaded', () => {
    console.log('Men\'s Collection page loaded!');

    // Function to dynamically load products for a specific subcategory
    async function loadProductsForSubcategory(subcategory) {
        console.log(`Loading products for subcategory: ${subcategory}`);
        // In a real application, this would fetch data from your Node.js backend
        // Example API call: /api/men/products?subcategory=Kameez_Shalwar_Casual
        try {
            const response = await fetch(`/api/men/products?subcategory=${encodeURIComponent(subcategory)}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const products = await response.json();
            console.log(`Fetched ${products.length} products for ${subcategory}:`, products);

            // TODO: Implement logic to render these products into the appropriate section
            // For example, find the section with id like 'kameez-shalwar-section'
            // and append product cards dynamically.
            // For now, we'll just log them.
            // displayProducts(products, subcategory);

        } catch (error) {
            console.error(`Error loading products for ${subcategory}:`, error);
        }
    }

    // Example of how to trigger loading products when the page loads
    // You might want to load a default set of products or all of them initially
    // loadProductsForSubcategory('Kameez_Shalwar_Casual'); // Example

    // Smooth scrolling for internal navigation links (from dropdown)
    document.querySelectorAll('#men-submenu a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100, // Adjust offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // You can add more specific interactions here,
    // like filters, sorting, or product detail modals.
});
