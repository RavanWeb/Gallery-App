const overlay = $("#overlay"), btnUpload = $("#btn-upload"),dropZone=$('#drop-zone');
btnUpload.on("click", () => {
    overlay.removeClass("d-none")
});

overlay.on("click", (e) => {
    if (e.target === overlay[0]) overlay.addClass("d-none");
})

$(document).on("keydown", (e) => {
    if (e.key === "Escape" && !overlay.hasClass("d-none")) overlay.addClass("d-none")
})

dropZone.on('dragover',(e)=>{
    e.preventDefault();
})
dropZone.on('drop',(e)=>{
    e.preventDefault();
    alert("dfdfdfdf")
})
overlay.on('dragover', (e) => e.preventDefault());
overlay.on('drop', (e) => e.preventDefault());





loadAllImages();

function loadAllImages() {

    const jqxhr = $.ajax("http://localhost:8080/gallery/images");
    jqxhr.done((imageUrlList) => {
        imageUrlList.forEach(imageUrl => {
            const image = $(`<div class="image"></div>`);
            image.css("background-image", `url(${imageUrl})`);
            $('main').append(image);
        })


    });
    jqxhr.fail(() => {
        alert("Failed to load Images");
    })
}


