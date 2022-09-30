const API_URLs = {
    key:"api_key=live_WvEeNCvl4DkeZ2DHgp6AWjjO6m4M7dHbLTkEHPpJ8wQxReVZito9YxO80008hu62",
    base:"https://api.thecatapi.com/v1",
    getInitialImages:"https://api.thecatapi.com/v1/images/search?limit=10",
    getSingleImage:"https://api.thecatapi.com/v1/images/search?limit=1",
    getAddFavPath:"https://api.thecatapi.com/v1/favourites?limit=&api_key=live_WvEeNCvl4DkeZ2DHgp6AWjjO6m4M7dHbLTkEHPpJ8wQxReVZito9YxO80008hu62",
    delFavPath:(id)=>{
        return `https://api.thecatapi.com/v1/favourites/${id}?api_key=live_WvEeNCvl4DkeZ2DHgp6AWjjO6m4M7dHbLTkEHPpJ8wQxReVZito9YxO80008hu62`
    }
}

const gallery = [
    {
      "id": "255",
      "url": "https://cdn2.thecatapi.com/images/255.jpg",
      "width": 449,
      "height": 600
    },
    {
      "id": "2a4",
      "url": "https://cdn2.thecatapi.com/images/2a4.jpg",
      "width": 300,
      "height": 400
    },
    {
      "id": "2n9",
      "url": "https://cdn2.thecatapi.com/images/2n9.jpg",
      "width": 500,
      "height": 378
    },
    {
      "id": "dmd",
      "url": "https://cdn2.thecatapi.com/images/dmd.jpg",
      "width": 500,
      "height": 335
    },
    {
      "id": "duc",
      "url": "https://cdn2.thecatapi.com/images/duc.jpg",
      "width": 604,
      "height": 453
    },
    {
      "id": "MTU4ODMyNg",
      "url": "https://cdn2.thecatapi.com/images/MTU4ODMyNg.png",
      "width": 768,
      "height": 1024
    },
    {
      "id": "MTY0MzUxMw",
      "url": "https://cdn2.thecatapi.com/images/MTY0MzUxMw.jpg",
      "width": 500,
      "height": 667
    },
    {
      "id": "MTY3MDk1MQ",
      "url": "https://cdn2.thecatapi.com/images/MTY3MDk1MQ.jpg",
      "width": 1024,
      "height": 768
    },
    {
      "id": "tp0nHtyze",
      "url": "https://cdn2.thecatapi.com/images/tp0nHtyze.jpg",
      "width": 1200,
      "height": 800
    },
    {
      "id": "ZV_BdSFkA",
      "url": "https://cdn2.thecatapi.com/images/ZV_BdSFkA.png",
      "width": 800,
      "height": 534
    }
  ]

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
                <p>Favourite cat ${index+1}</p>
                <img id="img1" src="${element.image.url}" alt="Cat Image">
                <button class="btn del-btn" data-id="${element.id}">Delete</button>
            </div>
            `
        });
        const butons = document.querySelectorAll(".del-btn")
        butons.forEach(i=>{
            i.addEventListener("click",()=>{
                console.log(`Deleting ${i.dataset.id}`)
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
        console.log(data);
        console.log("Added");
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
        console.log(data);
        console.log("Deleted");
        renderFavourites(API_URLs.getAddFavPath)
    } catch (error) {
        throw new Error(error)
    }
}

async function start() {
    await initialRandomRender(API_URLs.getInitialImages)
    await renderFavourites(API_URLs.getAddFavPath)
}

window.addEventListener("load",()=>start())







