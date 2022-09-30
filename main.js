const API_URLs = {
    key:"api_key=live_WvEeNCvl4DkeZ2DHgp6AWjjO6m4M7dHbLTkEHPpJ8wQxReVZito9YxO80008hu62",
    base:"https://api.thecatapi.com/v1",
    getImages:"https://api.thecatapi.com/v1/images/search?limit=4",
    getAddFavPath:"https://api.thecatapi.com/v1/favourites?limit=&api_key=live_WvEeNCvl4DkeZ2DHgp6AWjjO6m4M7dHbLTkEHPpJ8wQxReVZito9YxO80008hu62",
    delFavPath:(id)=>{
        return `https://api.thecatapi.com/v1/favourites/${id}?api_key=live_WvEeNCvl4DkeZ2DHgp6AWjjO6m4M7dHbLTkEHPpJ8wQxReVZito9YxO80008hu62`
    }
}

const randomBtn = document.getElementById("myButton").addEventListener("click",render)
const cardsCointainer = document.getElementById("cards-container")
const favsCointainer = document.getElementById("favs-container")
const image1 = document.getElementById("img1")










