$(document).ready(function (e) {
  $(".addSuper").on("click", addSuper);
  const superPastChildren = $("#new_supervisor").children().length;
  const studPastChildren = $("#new_student").children().length;
  console.log(superPastChildren);

  function addSuper() {
    var lastField = $("#new_supervisor div:last");
    console.log(lastField.data("idx"))
    var intId = (lastField && lastField.length && lastField.data("idx") + 1) || 1;
    console.log(intId);
    var userSelect = document.getElementById("addSuper");
    var fieldWrapper = $(
      '<div class="fieldwrapper" id="field' + (intId + superPastChildren) + '"/>'
    );
    fieldWrapper.data("idx", intId);
    var new_input = $("<input class='button-type' name='supervisor" + (intId + superPastChildren) + "' value ='" + userSelect.value + "' readonly />")
    var removeButton = $(
      '<input type="button" class="remove" value="-" />'
    );
    removeButton.click(function () {
      $(this).parent().remove();
      enableButton();
    });
    fieldWrapper.append(new_input);
    fieldWrapper.append(removeButton);
    $("#new_supervisor").append(fieldWrapper);
    $("#addSuper").val("");
    enableButton();
  }


  $(".addStud").on("click", addStud);
  function addStud() {
    var lastField = $("#new_student div:last");
    var intId = (lastField && lastField.length && lastField.data("idx") + 1) || 1;
    var userSelect = document.getElementById("addStudent");
    var fieldWrapper = $(
      '<div class="fieldwrapper" id="studField' + (intId + studPastChildren) + '"/>'
    );
    fieldWrapper.data("idx", intId);
    var new_input = $("<input class='button-type' name='std" + (intId + studPastChildren) + "' value ='" + userSelect.value + "' readonly />")
    var removeButton = $(
      '<input type="button" class="remove" value="-" />'
    );
    removeButton.click(function () {
      $(this).parent().remove();
      enableButton()
    });
    fieldWrapper.append(new_input);
    fieldWrapper.append(removeButton);
    $("#new_student").append(fieldWrapper);
    $("#addStudent").val("");
    enableButton();
  }
})