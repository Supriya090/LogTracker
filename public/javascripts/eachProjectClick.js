var coll = document.getElementsByClassName("collapsible");
var i;

var tooltip = document.getElementById("tooltiptext");

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
            tooltip.innerHTML = "Click to view details";
        } else {
            content.style.display = "block";
            tooltip.innerHTML = "Click to hide details";
        }
    });

}