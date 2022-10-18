const fetchProducts = async (product) => {
  if (product === undefined) {
    throw new Error('You must provide an url');
  }
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  const promise = await fetch(url);
  const requireData = promise.json();
  return requireData;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
