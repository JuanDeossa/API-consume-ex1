const API_URLs = {
    key:"api_key=live_WvEeNCvl4DkeZ2DHgp6AWjjO6m4M7dHbLTkEHPpJ8wQxReVZito9YxO80008hu62",
    base:"https://api.thecatapi.com/v1",
    getInitialImages:"https://api.thecatapi.com/v1/images/search?limit=10",
    getSingleImage:"https://api.thecatapi.com/v1/images/search?limit=1",
    getAddFavPath:"https://api.thecatapi.com/v1/favourites?limit=3&api_key=live_WvEeNCvl4DkeZ2DHgp6AWjjO6m4M7dHbLTkEHPpJ8wQxReVZito9YxO80008hu62",
    delFavPath:(id)=>{
        return `https://api.thecatapi.com/v1/favourites/${id}?api_key=live_WvEeNCvl4DkeZ2DHgp6AWjjO6m4M7dHbLTkEHPpJ8wQxReVZito9YxO80008hu62`
    }
}

let gallery 

async function obtainImages(path){
    const response = await fetch(path)
    try{
        const data = await response.json()
        gallery = data
    }catch(error){
        throw new Error("API Not Found")
    }
}

const cardsCointainer = document.getElementById("cards-container")
const favsCointainer = document.getElementById("favs-container")
const image1 = document.getElementById("img1")

function renderGallery(array) {
    while (cardsCointainer.firstChild) {
        cardsCointainer.removeChild(cardsCointainer.firstChild);
    }
    array.forEach((element,index) => {
        cardsCointainer.innerHTML += `
        <div class="card">
            <p>Cat ${index+1}</p>
            <img id="img1" src="${element.url}" alt="Cat Image">
            <button class="btn add-btn" data-id="${element.id}">Save as favourite</button>
            <button class="btn change-btn" data-id="${element.id}">Change cat</button>
        </div>
        `
    });
    const addButtons = document.querySelectorAll(".add-btn")
    addButtons.forEach(i=>{
        i.addEventListener("click",async()=>{
            addFavItem(i.dataset.id)
        })
    })
    const changeButtons = document.querySelectorAll(".change-btn")
    changeButtons.forEach(i=>{
        i.addEventListener("click",()=>{
            replaceSingleItem(API_URLs.getSingleImage,i.dataset.id)
        })
    })
}

async function replaceSingleItem(path,id) {
    const response = await fetch(path)
    try {
        const data = await response.json()
        const newItem = data[0]
        const index = gallery.findIndex(i=>i.id===id)
        gallery[index]=newItem
        renderGallery(gallery)
    } catch (error) {
        throw new Error(error)
    }
}

async function renderFavourites(path) {
    const response = await fetch(path)
    try {
        const data = await response.json()
        while (favsCointainer.firstChild) {
            favsCointainer.removeChild(favsCointainer.firstChild);
        }
        data.forEach((element,index) => {
            favsCointainer.innerHTML += `
            <div class="card">
                <p>Favourite cat ${index+1}</p>
                <img id="img1" src="${element.image.url}" alt="Cat Image">
                <button class="btn del-btn" data-id="${element.id}">Delete</button>
            </div>
            `
        });
        const butons = document.querySelectorAll(".del-btn")
        butons.forEach(i=>{
            i.addEventListener("click",()=>{
                delFavItem(API_URLs.delFavPath(i.dataset.id))
            })
        })
    } catch (error) {
        throw new Error(error)
    }
}

async function addFavItem(id) {
    const path = API_URLs.getAddFavPath
    const response = await fetch(path,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify({
            image_id:id
        })
    })
    try {
        const data = await response.json()
        renderFavourites(API_URLs.getAddFavPath)
    } catch (error) {
        throw new Error(error)
    }
}

async function delFavItem(path) {
    const response = await fetch(path,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
        }
    })
    try {
        const data = await response.json()
        renderFavourites(API_URLs.getAddFavPath)
    } catch (error) {
        throw new Error(error)
    }
}

async function start() {
    await obtainImages(API_URLs.getInitialImages) 
    await renderGallery(gallery)
    await renderFavourites(API_URLs.getAddFavPath)
}

window.addEventListener("load",()=>start())







