const saveCartItems = (product) => {
  localStorage.setItem('cartItems', product);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
