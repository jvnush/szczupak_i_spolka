document.addEventListener('keydown', function(event) {
  var key = event.key || event.keyCode;

  if (key === 'ArrowLeft' || key === 'Left' || key === 37) {

    document.querySelector('#carouselExampleIndicators .carousel-control-prev').click();
  } else if (key === 'ArrowRight' || key === 'Right' || key === 39) {

    document.querySelector('#carouselExampleIndicators .carousel-control-next').click();
  }
});