const overlay = $("#overlay"), mainElm = $('main'), btnUpload = $("#btn-upload"),dropZone=$('#drop-zone');
const cssLoaderHtml =`<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>`;

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

mainElm.on('click','.image:not(.loader)',(e)=>{
    e.target.requestFullscreen();
})

function uploadImages(imageFiles){
    const formData = new FormData();
    imageFiles.forEach(imageFile=>{
        const imgDivElm = $(`<div class="image loader"></div>`);
        imgDivElm.append(cssLoaderHtml);
        mainElm.append(imgDivElm);

        formData.append("images", imageFile);
    })
    const jqxhr = $.ajax("http://localhost:8080/gallery/images",{
        method: 'POST',
        data: formData,
        contentType: false,
        processData: false,


    });
    jqxhr.done((imageUrlList)=>{
        imageUrlList.forEach((imageUrl)=>{
            const divElm = $('.image.loader').first();
            divElm.css('background-image', `url(${imageUrl})`);
            divElm.empty();
            divElm.removeClass('loader');

        })
    });
    jqxhr.always(() => $('.image.loader').remove());
    jqxhr.fail(()=>{});


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


