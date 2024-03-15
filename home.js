const myContainer = document.querySelector('.products-container');
const sortSelect = document.getElementById('sort-select');
const minPriceInput = document.getElementById('min-price');
const maxPriceInput = document.getElementById('max-price');
const ratingFilter = document.getElementById('rating-filter');

let productsData = [];

fetch("https://fakestoreapi.com/products")
.then(response => response.json())
.then((products) => {
    productsData = products;
    renderProducts(products);
})
.catch((e) => {
    console.log(e);
});

const renderProducts = (products) => {
    myContainer.innerHTML = '';

    products.forEach(product => {
        const div = document.createElement('div');
        div.classList.add('product');
        div.innerHTML = `
            <div class="product-infos">
                <div class="product-img">
                    <img src="${product.image}" alt="product_image">
                </div>
                <div class="product-subinfo">
                    <div class="product-title">${product.title}</div>
                    <div class="product-rating">${product.rating.rate}</div>
                    <div class="product-price">$${product.price}</div>
                </div>
            </div>
        `;

        myContainer.appendChild(div);
        div.addEventListener("click", () => {
            window.location.href = `product.html?productId=${product.id}`;
        });
    });
};

const filterByPrice = () => {
    const minPrice = parseFloat(minPriceInput.value);
    const maxPrice = parseFloat(maxPriceInput.value);
    const filteredProducts = productsData.filter(product => product.price >= minPrice && product.price <= maxPrice);
    renderProducts(filteredProducts);
};

const filterByRating = () => {
    const selectedRating = parseInt(ratingFilter.value);
    if (selectedRating === 0) {
        renderProducts(productsData);
    } else {
        const filteredProducts = productsData.filter(product => product.rating.rate >= selectedRating);
        renderProducts(filteredProducts);
    }
};

const sortProducts = (products, sortType) => {
    switch(sortType) {
        case 'nameAsc':
            return products.slice().sort((a, b) => a.title.localeCompare(b.title));
        case 'nameDesc':
            return products.slice().sort((a, b) => b.title.localeCompare(a.title));
        case 'priceAsc':
            return products.slice().sort((a, b) => a.price - b.price);
        case 'priceDesc':
            return products.slice().sort((a, b) => b.price - a.price);
        default:
            return products;
    }
};

sortSelect.addEventListener('change', () => {
    const sortedProducts = sortProducts(productsData, sortSelect.value);
    renderProducts(sortedProducts);
});
