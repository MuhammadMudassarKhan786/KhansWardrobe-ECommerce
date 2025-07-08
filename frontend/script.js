// script.js for KHAN'S WARDROBE (Main)

document.addEventListener('DOMContentLoaded', () => {
    console.log("KHAN'S WARDROBE frontend loaded!");

    // Example function for future backend integration
    async function fetchProductsByCategory(category) {
        console.log(`Attempting to fetch products for: ${category}`);
        try {
            const response = await fetch(`/api/products?category=${category}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            console.log('Fetched data:', data);
            return data;
        } catch (error) {
            console.error('Error fetching products:', error);
            return null;
        }
    }

    // Log click on the 'WOMEN' link (optional, for debugging/tracking)
    const womenNavLink = document.getElementById('women-nav-link');
    if (womenNavLink) {
        womenNavLink.addEventListener('click', (event) => {
            // No event.preventDefault() here. The browser will handle the navigation to women.html.
            console.log('Women category link clicked, navigating to women.html!');
        });
    }

    // Log click on the 'MEN' link (optional, for debugging/tracking)
    const menNavLink = document.getElementById('men-nav-link');
    if (menNavLink) {
        menNavLink.addEventListener('click', (event) => {
            // No event.preventDefault() here. The browser will handle the navigation to men.html.
            console.log('Men category link clicked, navigating to men.html!');
        });
    }

    // Log click on the 'BOYS & GIRLS' link (optional, for debugging/tracking)
    const boysGirlsNavLink = document.getElementById('boys-girls-nav-link');
    if (boysGirlsNavLink) {
        boysGirlsNavLink.addEventListener('click', (event) => {
            // No event.preventDefault() here. The browser will handle the navigation to boys_girls.html.
            console.log('Boys & Girls category link clicked, navigating to boys_girls.html!');
        });
    }

    // You can add more general interactive elements on the index.html page here.
});
