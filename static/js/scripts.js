document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

      // Add a click event on each of them
      $navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {

          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);

          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');

        });
      });
    }

  });

  function encodeEmail(email, key) {
    // Hex encode the key
    var encodedKey = key.toString(16);

    // ensure it is two digits long
    var encodedString = make2DigitsLong(encodedKey);

    // loop through every character in the email
    for(var n=0; n < email.length; n++) {

        // Get the code (in decimal) for the nth character
        var charCode = email.charCodeAt(n);

        // XOR the character with the key
        var encoded = charCode ^ key;

        // Hex encode the result, and append to the output string
        var value = encoded.toString(16);
        encodedString += make2DigitsLong(value);
    }
    return encodedString;
}

function make2DigitsLong(value){
    return value.length === 1
        ? '0' + value
        : value;
}

    function decodeEmail(encodedString) {
        // Holds the final output
        var email = "";

        // Extract the first 2 letters
        var keyInHex = encodedString.substr(0, 2);

        // Convert the hex-encoded key into decimal
        var key = parseInt(keyInHex, 16);

        // Loop through the remaining encoded characters in steps of 2
        for (var n = 2; n < encodedString.length; n += 2) {

            // Get the next pair of characters
            var charInHex = encodedString.substr(n, 2)

            // Convert hex to decimal
            var char = parseInt(charInHex, 16);

            // XOR the character with the key to get the original character
            var output = char ^ key;

            // Append the decoded character to the output
            email += String.fromCharCode(output);
        }
        return email;
    }

    // Find all the elements on the page that use class="eml-protected"
    var allElements = document.getElementsByClassName("eml-protected");

    // Loop through all the elements, and update them
    for (var i = 0; i < allElements.length; i++) {
        updateAnchor(allElements[i])
    }

    function updateAnchor(el) {
        // fetch the hex-encoded string
        var encoded = el.innerHTML;

        // decode the email, using the decodeEmail() function from before
        var decoded = decodeEmail(encoded);

        // Replace the text (displayed) content
        el.textContent = decoded;

        // Set the link to be a "mailto:" link
        el.href = 'mailto:' + decoded;
    }

    $(document).ready(function(){
        $(window).scroll(function(){
            if(this.scrollY > 20){
                $('.navbar').addClass("sticky");
            } else {
                $('.navbar').removeClass("sticky")
            }
        })
    })

    // slide-up script
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // owl carousel script
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 3,
                nav: false
            }
        }
    });