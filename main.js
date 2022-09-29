const API = "https://api.thecatapi.com/v1/images/search?limit=4"

const randomBtn = document.getElementById("myButton").addEventListener("click",f1)
const image1 = document.getElementById("img1")
const image2 = document.getElementById("img2")
const image3= document.getElementById("img3")
const image4 = document.getElementById("img4")

async function f1() {
    const path = API;
    try{
        const response = await fetch(path)
        const data = await response.json()
        console.log(data);
        const url1 = data[1-1].url
        const url2 = data[2-1].url
        const url3 = data[3-1].url
        const url4 = data[4-1].url
        image1.setAttribute("src",url1)
        image2.setAttribute("src",url2)
        image3.setAttribute("src",url3)
        image4.setAttribute("src",url4)
    }catch(error){
        throw new Error("API Not Found")
    }
}




