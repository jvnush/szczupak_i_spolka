document.addEventListener('DOMContentLoaded', function () {
  const showButton = document.getElementById('showTable');
  const hideButton = document.getElementById('hideTable');
  const tableContainer = document.getElementById('table_options');

  showButton.addEventListener('click', function () {
    tableContainer.style.display = 'block';
    showButton.style.display = 'none';
    hideButton.style.display = 'inline-block';
  });

  hideButton.addEventListener('click', function () {
    tableContainer.style.display = 'none';
    showButton.style.display = 'inline-block';
    hideButton.style.display = 'none';
  });
});
