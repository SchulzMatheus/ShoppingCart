const itemSec = document.querySelector('.items');

const cartItems = document.querySelector('.cart__items');

const emptyCartBtn = document.querySelector('.empty-cart');

const total = document.querySelector('.total-price');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.classList = 'item__image';
  img.src = imageSource;
  return img;
};

const summary = () => {
  const allCartItems = document.querySelectorAll('.cart__item');
  let sum = 0;
  allCartItems.forEach((element) => {
    sum += Number(element.id);
  });
  const x = sum.toFixed(2);
  total.innerText = `Total: $${x}`;
};

const cartItemClickListener = (event) => {
  event.target.remove();
  saveCartItems(cartItems.innerHTML);
  summary();
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.classList = 'item list-group-item d-flex justify-content-between align-items-center';
  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add btn-dark', 
  'Adicionar ao carrinho!'));
  return section;
};

// const getIdFromProductItem = (product) => product.querySelector('span.id').innerText;

const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.classList = 'cart__item list-group-item list-group-item-action';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  li.id = `${price}`;
  return li;
};
const getItens = async () => {
await fetchProducts('computador').then((obj) => {
const loadingText = document.querySelector('.items');
loadingText.innerHTML = '';
obj.results.forEach((e) => itemSec.appendChild(createProductItemElement(e)));
});
};
const addToCart = async ({ target }) => {
  const id = target.parentNode.firstChild.innerText;
  const product = await fetchItem(id);
  cartItems.appendChild(createCartItemElement(product));
  summary();
  saveCartItems(cartItems.innerHTML);
};
const btnFunc = () => {
  const addBtn = document.querySelectorAll('.item__add');
addBtn.forEach((button) => {
  button.addEventListener('click', addToCart);
});
emptyCartBtn.addEventListener('click', () => {
cartItems.innerHTML = null;
localStorage.clear();
summary();
});
};
const auxLocalStorage = () => {
  const savedCart = cartItems;
  savedCart.innerHTML = getSavedCartItems();
  const newItem = document.querySelectorAll('.cart__item');
  newItem.forEach((e) => e.addEventListener('click', cartItemClickListener));
};
window.onload = async () => {
await getItens();
btnFunc();
auxLocalStorage();
summary();
};
