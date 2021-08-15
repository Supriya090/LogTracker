function enableButton() {
    var buttonId = document.getElementById("createTeamSubmit");
    var buttonTitle = buttonId.getAttribute("title");
    if (
        document.getElementById("new_supervisor").childElementCount > 0 &&
        document.getElementById("new_student").childElementCount > 0
    ) {
        buttonId.disabled = false;
        buttonId.removeAttribute("title");
    } else {
        buttonId.disabled = true;
        buttonId.setAttribute("title", "Fill all fields to enable")
    }
}