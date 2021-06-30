$(document).ready(function () {
  $(".nav li a").click(function (e) {
    $(".nav li a.active").removeClass("active");
    $(this).addClass("active");
    e.preventDefault();
  });

  $(".buttons-div button").click(function (e) {
    $(".buttons-div button.activeBtn").removeClass("activeBtn");
    $(this).addClass("activeBtn");
    e.preventDefault();
  });
});
