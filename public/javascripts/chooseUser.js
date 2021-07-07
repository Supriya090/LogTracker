$(document).ready(function (e) {
    $(".addSuper").on("click", addSuper);
    $(".removeSuper").on("click", removeSuper);

    function addSuper() {
        var new_supervisor_no = parseInt($("#total_supervisor").val()) + 1;
        var userSelect = document.getElementById("addSuper");
        var new_input = "<legend class='button-type' id='newSuper_" + new_supervisor_no + "' name='supervisor" + new_supervisor_no + "'>" + userSelect.options[userSelect.selectedIndex].text + "</legend>"
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
        var new_student_no = parseInt($("#total_student").val()) + 1;
        var userSelect = document.getElementById("addStudent");
        var new_input = "<legend class='button-type' id='newStud_" + new_student_no + "' name='std" + new_student_no + "'>" + userSelect.options[userSelect.selectedIndex].text + "</legend>"
        //"<select name='std' id='addStudent'><% if( Array.isArray(users) ) { %> <%users.forEach( function(users ){ %> <% if (users.userstatus=='student') { %><option><%= users.username%></option><% } %><%})}%></select>"
        $("#new_student").append(new_input);
        $("#total_student").val(new_student_no);
    }

    function removeStud() {
        var last_student_no = $("#total_student").val();

        if (last_student_no > 1) {
            $("#newStud_" + last_student_no).remove();
            $("#total_student").val(last_student_no - 1);
        }
    }
})