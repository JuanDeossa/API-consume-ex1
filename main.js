const API = "https://api.thecatapi.com/v1/images/search"

const randomBtn = document.getElementById("myButton").addEventListener("click",f1)
const image = document.getElementById("img")

async function f1() {
    const path = API;
    try{
        const response = await fetch(path)
        const data = await response.json()
        const url = data[0].url
        image.setAttribute("src",url)
    }catch(error){
        throw new Error("API Not Found")
    }
}




