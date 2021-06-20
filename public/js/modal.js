const onclick_new_activity = () => {
    var modal = document.querySelector(".modal");
    if (modal.style.display === "flex") {
        modal.style.display = "none";
    } else {
        modal.style.display = "flex"
        window.location.href = "#head-id";
    }
}