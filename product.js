console.log('product.js is loaded');

const urlParams = new URLSearchParams(window.location.search);

const productId = urlParams.get('productId');

const productContainer = document.querySelector('.product-container');

fetch(`https://fakestoreapi.com/products/${productId}`)
.then((res) => res.json())

.then((product) => {
    const div = document.createElement('div');
    div.classList.add('pproduct');
    div.innerHTML = `
    <div class="product-infos">
            <div class="product-img">
            <img src="${product.image}" alt="product_image">
            </div>
            <div class="product-subinfo">
            <div class="product-title">${product.title}</div>
            <div class="product-description">${product.description}</div>
            <div class="product-rating">${product.rating.rate}</div>
            </div>
        </div>
    `;
    productContainer.appendChild(div);
}).catch(error => console.error(error));