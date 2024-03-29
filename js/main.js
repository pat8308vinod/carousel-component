$(document).ready(function () {
  var percent = 0,
    bar = $(".transition-timer-carousel-progress-bar"),
    crsl = $("#alaska-bannerCarousel"),
    startX = 0,
    endX = 0,
    threshold = 50, // Adjust swipe threshold as needed
    pause = false; // Initialize pause variable

  function progressBarCarousel() {
    bar.css({ width: percent + "%" });
    percent = percent + 0.5;
    if (percent > 100) {
      percent = 0;
      crsl.carousel("next");
    }
  }

  crsl.carousel({
    interval: false,
    pause: true,
  })
  .on("slid.bs.carousel", function () {
    percent = 0; // Reset the progress bar when the slide changes
  });

  var barInterval = setInterval(progressBarCarousel, 30);

  // Pause or resume carousel on button click
  $('#toggleCarousel').click(function(){
    if (pause == false) { // Check if carousel is not paused
      clearInterval(barInterval); // Pause progress bar animation
      crsl.carousel("pause"); // Pause carousel
      pause = true; // Update pause variable
      $(this).find('i').addClass('fa-play').removeClass('fa-pause');
    } else { // If carousel is paused
      barInterval = setInterval(progressBarCarousel, 30); // Resume progress bar animation
      crsl.carousel("cycle"); // Resume carousel
      pause = false; // Update pause variable
      $(this).find('i').addClass('fa-pause').removeClass('fa-play');
    }
  });

  // Swipe left and right functionality
  crsl.on('touchstart mousedown', function(e) {
    startX = (e.type === 'touchstart') ? e.touches[0].clientX : e.clientX;
  });

  crsl.on('touchmove mousemove', function(e) {
    endX = (e.type === 'touchmove') ? e.touches[0].clientX : e.clientX;
  });

  crsl.on('touchend mouseup', function(e) {
    var deltaX = endX - startX;
    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        crsl.carousel('prev');
      } else {
        crsl.carousel('next');
      }
    }
  });
});
