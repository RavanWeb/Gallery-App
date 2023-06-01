const overlay = $("#overlay");
const btnUpload = $("#btn-upload");

btnUpload.on("click", () => overlay.removeClass("d-none"));

overlay.on("click",(e)=>{
    if (e.target=== overlay[0]) overlay.addClass("d-none");
})

$(document).on("keydown",(e)=>{
    if (e.key==="Escape" && !overlay.hasClass("d-none")) overlay.addClass("d-none")
})