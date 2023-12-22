window.addEventListener("scroll", function () {
  var fixedHeader = document.getElementById("fixed-header");
  var headerHeight = document.getElementById("header").offsetHeight;

  if (window.scrollY > headerHeight / 2) {
    fixedHeader.style.top = "0";
  } else {
    fixedHeader.style.top = "130px"; /* Initial position beneath the top */
  }
});
