// boys_girls.js for KHAN'S WARDROBE Boys & Girls Collection page

document.addEventListener('DOMContentLoaded', () => {
    console.log('Boys & Girls Collection page loaded!');

    // Function to dynamically load products for a specific subcategory
    async function loadProductsForSubcategory(subcategory) {
        console.log(`Loading products for subcategory: ${subcategory}`);
        // In a real application, this would fetch data from your Node.js backend
        // Example API call: /api/boys-girls/products?subcategory=Teen_Girls
        try {
            const response = await fetch(`/api/boys-girls/products?subcategory=${encodeURIComponent(subcategory)}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const products = await response.json();
            console.log(`Fetched ${products.length} products for ${subcategory}:`, products);

            // TODO: Implement logic to render these products into the appropriate section
            // For example, find the section with id like 'teen-girls-section'
            // and append product cards dynamically.
            // For now, we'll just log them.
            // displayProducts(products, subcategory);

        } catch (error) {
            console.error(`Error loading products for ${subcategory}:`, error);
        }
    }

    // Example of how to trigger loading products when the page loads
    // You might want to load a default set of products or all of them initially
    // loadProductsForSubcategory('Teen_Girls'); // Example

    // Smooth scrolling for internal navigation links (from dropdown)
    document.querySelectorAll('#boys-girls-submenu a').forEach(anchor => {
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
