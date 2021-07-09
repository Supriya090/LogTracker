$(document).ready(function (e) {
    $(".addSuper").on("click", addSuper);
      $(".removeSuper").on("click", removeSuper);
      function addSuper() {
        var new_supervisor_no = parseInt($("#total_supervisor").val());
        var userSelect = document.getElementById("addSuper");
       // var new_input = userSelect.options[userSelect.selectedIndex].text
        var new_input = "<input class='button-type' id='newSuper_" + new_supervisor_no + "' name='supervisor" + new_supervisor_no + "' value ='"+userSelect.options[userSelect.selectedIndex].text+"' />"
        new_supervisor_no++;
        //var new_input ="<label type='text' id='newSuper_" + new_supervisor_no + "' name='supervisor" + new_supervisor_no + "></label>";
        $("#new_supervisor").append(new_input);
        $("#total_supervisor").val(new_supervisor_no);
      }
      function removeSuper() {
        var last_supervisor_no = $("#total_supervisor").val();
        if (last_supervisor_no > 1) {
          $("#newSuper_" + last_supervisor_no).remove();
          $("#total_supervisor").val(last_supervisor_no - 1);
        }
      }
      $(".addStud").on("click", addStud);
      $(".removeStud").on("click", removeStud);
      function addStud() {
        var new_student_no = parseInt($("#total_student").val());
        var userSelect = document.getElementById("addStudent");
        var new_input = "<input class='button-type' id='newStud_" + new_student_no + "' name='std" + new_student_no + "' value ='"+userSelect.options[userSelect.selectedIndex].text+"' />"
        new_student_no++;
        $("#new_student").append(new_input);
        $("#total_student").val(new_student_no);
      }
      function removeStud() {
        var last_student_no = $("#total_student").val();
        if (last_student_no > 0) {
          $("#newStud_" + last_student_no).remove();
          $("#total_student").val(last_student_no - 1);
        }
      }
})