const btnCart = document.querySelector('#cart-icon');
const cart = document.querySelector('.cart');
const btnClose = document.querySelector('#cart-close');

btnCart.addEventListener('click', () => {
    cart.classList.add('cart-active');
});
btnClose.addEventListener('click', () => {
    cart.classList.remove('cart-active');
});

document.addEventListener('DOMContentLoaded', loadFood);

function loadFood() {
    loadcontent();
}
function loadcontent() {
    //remove food item from cart
    let btnRemove = document.querySelectorAll('.cart-remove');
    btnRemove.forEach((btn) => {
        btn.addEventListener('click', removeItem);
    });
    //product item change event

    let qtyElements = document.querySelectorAll('.cart-quantity');
    qtyElements.forEach((input) => {
        input.addEventListener('change', changeQty);
    });
    //product Cart
    let cartBtns = document.querySelectorAll('.add-cart');
    cartBtns.forEach((btn) => {
        btn.addEventListener('click', addCart);
    });
    updateTotal();

}



//remove Item
function removeItem() {
    if (confirm('Are You Sure to Remove')) {
        let title = this.parentElement.querySelector('.cart-food-title').innerHTML;

        itemList = itemList.filter(el => el.title != title);
        this.parentElement.remove();
        loadcontent();

    }
}
//change quantity

function changeQty() {
    if (isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    loadcontent();
}

let itemList = [];
//addCart
function addCart() {
    let food = this.parentElement;
    let title = food.querySelector('.food-title').innerHTML;
    let price = food.querySelector('.food-price').innerHTML;
    let imgSrc = food.querySelector('.food-img').src;
    let newProdectElement = createCartProduct(title, price, imgSrc);

    let newProduct = { title, price, imgSrc }

    //check product already exist in cart

    if (itemList.find((el) => el.title == newProduct.title)) {
        alert("Product Already added in Cart");
        return;
    } else {
        itemList.push(newProduct);
    }


    let element = document.createElement('div');
    element.innerHTML = newProdectElement;

    let cartBasket = document.querySelector('.cart-content');
    cartBasket.append(element);
    loadcontent();
}


function createCartProduct(title, price, imgSrc) {

    return `
        <div class="cart-box">
                        <img src="${imgSrc}" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-food-title">${title}</div>
                            <div class="price-box">
                                <div class="cart-price">${price}</div>
                                <div class="cart-amt">${price}</div>
                            </div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <ion-icon name="trash" class="cart-remove"></ion-icon>
                    </div> `;
}
//add product Count in cart icon
function updateTotal() {
    const carItems = document.querySelectorAll('.cart-box');
    const totalValue = document.querySelector('.total-price');
    let total = 0;
    carItems.forEach(product => {
        let priceElement = product.querySelector('.cart-price');
        let price = parseFloat(priceElement.innerHTML.replace("Rs.", ""));
        let qty = product.querySelector('.cart-quantity').value;
        total += (price * qty);
        product.querySelector('.cart-amt').innerText = "Rs." + price * qty;

    });
    totalValue.innerHTML = 'Rs.' + total;
    const cartCount = document.querySelector('.cart-count');
    let count = itemList.length;

    cartCount.innerHTML = count;
    if (count == 0) {
        cartCount.style.display = 'none';
    } else {
        cartCount.style.display = 'block';
    }
}







