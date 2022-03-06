$(document).ready(function (e) {
  function showView(viewName) {
    $(".view").hide();
    $("#" + viewName).show();
  }

  $("[data-launch-view]").click(function (e) {
    e.preventDefault();
    var viewName = $(this).attr("data-launch-view");
    showView(viewName);
  });

  $("[studentData-launch-view]").click(function (e) {
    e.preventDefault();
    var viewName = $(this).attr("studentData-launch-view");
    console.log(viewName);
    showView(viewName);
  });

  $("[level-launch-view]").click(function (e) {
    e.preventDefault();
    var viewName = $(this).attr("level-launch-view");
    if (viewName === "masters") {
      $(".bachBtn").hide();
    } else {
      $(".bachBtn").show();
    }
  })
});
