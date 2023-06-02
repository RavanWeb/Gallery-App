const overlay = $("#overlay"), mainElm = $('main'), btnUpload = $("#btn-upload"),dropZone=$('#drop-zone');
const cssLoaderHtml =$(`<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>`);

btnUpload.on("click", () => {
    overlay.removeClass("d-none")
});

overlay.on("click", (e) => {
    if (e.target === overlay[0]) overlay.addClass("d-none");
})

$(document).on("keydown", (e) => {
    if (e.key === "Escape" && !overlay.hasClass("d-none")) overlay.addClass("d-none")
})

overlay.on('dragover', (e) => e.preventDefault());

overlay.on('drop', (e) => e.preventDefault());

dropZone.on('dragover',(e)=>{
    e.preventDefault();
})

dropZone.on('drop',(e)=>{
    e.preventDefault();
    const droppedFiles = e.originalEvent.dataTransfer.files;
    const imageFiles = Array.from(droppedFiles).filter(file => file.type.startsWith("image/"));
    if (!imageFiles.length) return;
    overlay.addClass('d-none');
    uploadImages(imageFiles);
})

function uploadImages(imageFiles){
    imageFiles.forEach(imageFile=>{
        const imgDivElm = $(`<div class="image"></div>`);
        mainElm.append(imgDivElm);
    })


}





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


