$(document).ready(function () {
  $(".nav li a").click(function (e) {
    $(".nav li a.active").removeClass("active");
    $(this).addClass("active");
    e.preventDefault();
  });
});
