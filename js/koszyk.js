document.addEventListener('DOMContentLoaded', function () {
  let cart = [];
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const subTotalElement = document.getElementById('sub-total');
  const deliveryCostElement = document.getElementById('delivery-cost');
  const clearCartButton = document.querySelector('.clear-cart');
  const checkoutButton = document.querySelector('.check-out');
  const deliveryMethod = document.getElementById('delivery-method');
  const distanceInput = document.getElementById('distance');

  addToCartButtons.forEach(button => {
    button.addEventListener('click', function () {
      const productRow = this.closest('.cart-item');
      const quantityInput = productRow.querySelector('input[type="number"]');
      const quantity = parseInt(quantityInput.value, 10);

      if (quantity <= 0) {
        alert('Proszę wybrać przynajmniej jeden produkt.');
        return;
      }

      const priceElement = this.previousElementSibling;
      const priceText = priceElement.textContent.trim();
      const price = parseFloat(priceText.replace('PLN', '').replace(',', '.'));

      if (!isNaN(price)) {
        const totalPrice = price * quantity;
        cart.push(totalPrice);
        updateSummary();
      }
    });
  });

  function calculateDeliveryCost() {
    const method = deliveryMethod.value;
    let baseCost = 0;

    switch (method) {
      case 'inpost':
        baseCost = 12;
        break;
      case 'courier':
        baseCost = 20;
        break;
      case 'pickup':
        baseCost = 0;
        break;
    }

    const distance = parseFloat(distanceInput.value);
    if (!isNaN(distance) && method === 'courier') {
      if (distance > 10) {
        baseCost += (distance - 10) * 0.5; // np. 50 gr za każdy km powyżej 10 km
      }
    }

    return baseCost;
  }

  function updateSummary() {
    const productsTotal = cart.reduce((acc, price) => acc + price, 0);
    const deliveryTotal = calculateDeliveryCost();

    subTotalElement.textContent = (productsTotal + deliveryTotal).toFixed(2);
    deliveryCostElement.textContent = deliveryTotal.toFixed(2);
  }

  checkoutButton.addEventListener('click', function () {
    if (cart.length > 0) {
      updateSummary();
      alert('Dziękujemy za zakupy! Do zapłaty: PLN ' + subTotalElement.textContent);
    } else {
      alert('Twój koszyk jest pusty.');
    }
  });

  clearCartButton.addEventListener('click', function () {
    cart = [];
    updateSummary();
    document.querySelectorAll('input[type="number"]').forEach(input => input.value = 0);
    alert('Koszyk został wyczyszczony.');
  });

  deliveryMethod.addEventListener('change', updateSummary);
  distanceInput.addEventListener('input', updateSummary);
});
