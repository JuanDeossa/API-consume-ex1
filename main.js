const API_URLs = {
    key:"api_key=live_WvEeNCvl4DkeZ2DHgp6AWjjO6m4M7dHbLTkEHPpJ8wQxReVZito9YxO80008hu62",
    base:"https://api.thecatapi.com/v1",
    getImages:"https://api.thecatapi.com/v1/images/search?limit=4",
    getAddFavPath:"https://api.thecatapi.com/v1/favourites?limit=&api_key=live_WvEeNCvl4DkeZ2DHgp6AWjjO6m4M7dHbLTkEHPpJ8wQxReVZito9YxO80008hu62",
    delFavPath:(id)=>{
        return `https://api.thecatapi.com/v1/favourites/${id}?api_key=live_WvEeNCvl4DkeZ2DHgp6AWjjO6m4M7dHbLTkEHPpJ8wQxReVZito9YxO80008hu62`
    }
}

const cardsCointainer = document.getElementById("cards-container")
const favsCointainer = document.getElementById("favs-container")
const image1 = document.getElementById("img1")

async function initialRandomRender(path) {
    const response = await fetch(path)
    // console.log(response);
    try{
        const data = await response.json()
        // console.log(data);
        // while (cardsCointainer.firstChild) {
        //     cardsCointainer.removeChild(cardsCointainer.firstChild);
        // }
        data.forEach((element,index) => {
            cardsCointainer.innerHTML += `
            <div class="card">
                <p>Animal ${index+1}:<br>${element.name}</p>
                <img id="img1" src="${element.url}" alt="Cat Image">
                <button class="btn add-btn" data-id="${element.id}">Save as favourite</button>
                <button class="btn change-btn">Change cat</button>
            </div>
            `
        });
        const addButtons = document.querySelectorAll(".add-btn")
        addButtons.forEach(i=>{
            i.addEventListener("click",async()=>{
                console.log(`Adding${i.dataset.id}`)
                addFavItem(i.dataset.id)
            })
        })
        const changeButtons = document.querySelectorAll(".change-btn")
        changeButtons.forEach(i=>{
            i.addEventListener("click",()=>{
                console.log(`Changing`)
            })
        })
    }catch(error){
        throw new Error("API Not Found")
    }
}

async function renderFavourites(path) {
    const response = await fetch(path)
    try {
        const data = await response.json()
        console.log("Favs");
        console.log(data);
        while (favsCointainer.firstChild) {
            favsCointainer.removeChild(favsCointainer.firstChild);
        }
        data.forEach((element,index) => {
            favsCointainer.innerHTML += `
            <div class="card">
                <p>Animal ${index+1}:<br>${element.name}</p>
                <img id="img1" src="${element.image.url}" alt="Cat Image">
                <button class="btn del-btn" data-id="${element.id}">Delete from favourites</button>
            </div>
            `
        });
        const butons = document.querySelectorAll(".del-btn")
        butons.forEach(i=>{
            i.addEventListener("click",()=>{
                console.log(`Deleting ${i.dataset.id}`)
                deleteFav(deletePath(i.dataset.id))
                render()
                getFavourites(API_FAV+API_key)
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
        console.log(data);
        console.log("Added");
        renderFavourites(API_URLs.getAddFavPath)
    } catch (error) {
        throw new Error(error)
    }
}

async function start() {
    await initialRandomRender(API_URLs.getImages)
    await renderFavourites(API_URLs.getAddFavPath)
}

window.addEventListener("load",()=>start())







