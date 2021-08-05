var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        var currentTooltip = this.firstElementChild
        if (content.style.display === "block") {
            content.style.display = "none";
            currentTooltip.innerHTML = "Click to view details";
        } else {
            content.style.display = "block";
            currentTooltip.innerHTML = "Click to hide details";
        }
    });

}