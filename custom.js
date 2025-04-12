(function ($) {
  
  "use strict";

    // HERO SLIDE
    $('.hero-slide').backstretch([
      "images/slideshow/glav1.jpg", 
      "images/slideshow/glav2.jpg",
      "images/slideshow/glav3.jpg"
    ],  {duration: 2000, fade: 750});

    // REVIEWS CAROUSEL
    $('.reviews-carousel').owlCarousel({
    items:3,
    loop:true,
    dots: false,
    nav: true,
    autoplay: true,
    margin:30,
      responsive:{
        0:{
          items:1
        },
        600:{
          items:2
        },
        1000:{
          items:3
        }
      }
    })

    // FLOWER CAROUSEL
    $('.flower-carousel').owlCarousel({
      items: 4,
      loop: true,
      dots: true,
      nav: true,
      autoplay: true,
      margin: 20,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 2
        },
        1000: {
          items: 4
        }
      }
    });

    // CUSTOM LINK
    $('.smoothscroll').click(function(){
    var el = $(this).attr('href');
    var elWrapped = $(el);
    var header_height = $('.navbar').height();

    scrollToDiv(elWrapped,header_height);
    return false;

    function scrollToDiv(element,navheight){
      var offset = element.offset();
      var offsetTop = offset.top;
      var totalScroll = offsetTop-navheight;

      $('body,html').animate({
      scrollTop: totalScroll
      }, 300);
    }
});

function applyFilters(event) {
    event.preventDefault();

    const category = document.getElementById('filter-category').value;
    const price = document.getElementById('filter-price').value;
    const color = document.getElementById('filter-color').value;
    const search = document.getElementById('filter-search').value.toLowerCase();

    const items = document.querySelectorAll('#flower-catalog .flower-item');

    items.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        const itemPrice = parseInt(item.getAttribute('data-price'), 10);
        const itemColor = item.getAttribute('data-color');
        const itemName = item.querySelector('h4').textContent.toLowerCase();

        let matchesCategory = category === 'all' || itemCategory === category;
        let matchesPrice = price === 'all' || (
            (price === '0-1000' && itemPrice <= 1000) ||
            (price === '1000-5000' && itemPrice > 1000 && itemPrice <= 5000) ||
            (price === '5000-10000' && itemPrice > 5000 && itemPrice <= 10000) ||
            (price === '10000+' && itemPrice > 10000)
        );
        let matchesColor = color === 'all' || itemColor === color;
        let matchesSearch = !search || itemName.includes(search);

        if (matchesCategory && matchesPrice && matchesColor && matchesSearch) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

document.getElementById('load-more-reviews').addEventListener('click', function () {
    const hiddenReviews = document.querySelectorAll('#reviews-container .d-none');
    let count = 0;

    hiddenReviews.forEach((review) => {
        if (count < 6) { // Show up to 6 hidden reviews
            review.classList.remove('d-none');
            count++;
        }
    });

    if (document.querySelectorAll('#reviews-container .d-none').length === 0) {
        this.style.display = 'none'; // Hide the "Далее" button if no more reviews
        document.getElementById('collapse-reviews').classList.remove('d-none'); // Show "Свернуть" button
    }
});

document.getElementById('collapse-reviews').addEventListener('click', function () {
    const allReviews = document.querySelectorAll('#reviews-container .col-md-4');
    allReviews.forEach((review, index) => {
        if (index >= 3) { // Keep the first 3 reviews visible
            review.classList.add('d-none');
        }
    });

    this.classList.add('d-none'); // Hide "Свернуть" button
    document.getElementById('load-more-reviews').style.display = 'inline-block'; // Show "Далее" button
});

document.querySelectorAll('.click-scroll').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
    
  })(window.jQuery);


