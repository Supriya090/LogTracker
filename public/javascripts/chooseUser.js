$(document).ready(function (e) {
  $(".addSuper").on("click", addSuper);
  const superPastChildren = $("#new_supervisor").children().length;
  const studPastChildren = $("#new_student").children().length;
  const masterStudPastChildren = $("#new_student_master").children().length;
  console.log(superPastChildren);

  function addSuper() {
    var superValue = $("#addSuper").val();
    if (superValue === "") return;
    var lastField = $("#new_supervisor div:last");
    var intId = (lastField && lastField.length && lastField.data("idx") + 1) || 1;
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
    var studValue = $("#addStudent").val();
    if (studValue === "") return;
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

  $(".addStudMaster").on("click", addStudMaster);
  function addStudMaster() {
    var masterStudValue = $("#addStudentMaster").val();
    if (masterStudValue === "") return;
    var lastField = $("#new_student_master div:last");
    var intId = (lastField && lastField.length && lastField.data("idx") + 1) || 1;
    var userSelect = document.getElementById("addStudentMaster");
    var fieldWrapper = $(
      '<div class="fieldwrapper" id="masterStudField' + (intId + masterStudPastChildren) + '"/>'
    );
    fieldWrapper.data("idx", intId);
    var new_input = $("<input class='button-type' name='std1" + (intId + masterStudPastChildren) + "' value ='" + userSelect.value + "' readonly />")
    var removeButton = $(
      '<input type="button" class="remove" value="-" />'
    );
    removeButton.click(function () {
      $(this).parent().remove();
      enableButton()
    });
    fieldWrapper.append(new_input);
    fieldWrapper.append(removeButton);
    $("#new_student_master").append(fieldWrapper);
    $("#addStudentMaster").val("");
    enableButton();
  }
})