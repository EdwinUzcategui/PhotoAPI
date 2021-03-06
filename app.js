// Variables:
const app = document.querySelector("#root"),
    search = document.querySelector("#search"),
    btnSearch = document.querySelector("button"),
    next = document.querySelector(".next"),
    prev = document.querySelector(".prev"),
    perPage = document.querySelector("#per-page");

// Fetch api:

const photos = async (value, page, perpage) => {
    const container = document.createElement("div");
    container.setAttribute("class","container");
    app.appendChild(container);
    
    const settings = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": "563492ad6f91700001000001de724c6a8c5e49e0b0ff25c80ec77d3d"
        }
    }
    
    const URL = `https://api.pexels.com/v1/search/?page=${page}&per_page=${perpage}&query=${value}`;

    const response = await fetch(URL, settings);
    const data = await response.json();
    const photos = data.photos;

    if(response.status >= 200 && response.status < 400){
        photos.forEach(photo => {
            const card = document.createElement("div");
            card.setAttribute("class","card");

            const h2 = document.createElement("h2");
            h2.textContent = photo.photographer;

            const img = document.createElement("img");
            img.src = photo.src.large;

            card.appendChild(h2);
            card.appendChild(img);
            container.appendChild(card);
        });
    }else{
        const err = document.createElement("h2");
        err.textContent = "Sorry, it's nor working!";
        app.appendChild(err)
    }
}
let value = "house";
let page = 1;
let perpage = 15;

function showPhotos(){
    const reset = document.querySelector(".container");
    app.removeChild(reset);
    photos(value,page,perpage);
}

btnSearch.addEventListener("click", (e) => {
    e.preventDefault();
    value = search.value.toLowerCase();
    if (value !== "") {
        showPhotos();   
    }
});

next.addEventListener("click", () =>{
    page += 1;
    showPhotos();
});

prev.addEventListener("click", () =>{
    page === 1 ? page = 1 : page -= 1;
    showPhotos();
});

perPage.addEventListener("change", () => {
    perpage = perPage.value;
    showPhotos();
});

photos(value,page,perpage);
