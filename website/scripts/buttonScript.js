// Script to create a button that returns the user to the top of the webpage. This was used in early versions of the site when pages were much longer than they are now.
mybutton = document.getElementById("myBtn");


window.onscroll = function() {scrollFunction()};

//The if statement determines how far the user has scrolled, and if it's greater than the defined quantitity then the button to return to the top would be displayed on the bottom right of the screen.
function scrollFunction() {
  if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
