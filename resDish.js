import {getDocs, collection, db, getDoc, doc, addDoc, where, query} from './firebase.js'
let urlParams = new URLSearchParams(window.location.search)

const getRestaurant = async() => {
    let resName = document.getElementById("resName");
    let resImg = document.getElementById("resImg");
    let resRev = document.getElementById("resRev");
    let resIntro = document.getElementById("resIntro");
    const docRef = doc(db, "resturants", urlParams.get('resturants'));
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        resImg.src = docSnap.data().img;
        resName.innerHTML = docSnap.data().name;
        resRev.innerHTML = `<b>Reviews: </b>${docSnap.data().rev}+`;
        resIntro.innerHTML = docSnap.data().intro;
        // console.log("Document data:", docSnap.data());
    } else {
        console.log("No such document!");
    }
}
getRestaurant()

let dishes = []
const getAllDishes = async() => {
    try {
            let dishCard = document.getElementById("dishCard");
            if(dishCard){
                // console.log(doc.id, " => ", doc.data());
                dishCard.innerHTML = '';
                const q = query(collection(db, "dishes"), where("resId", "==", urlParams.get("resturants")));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    dishes.push({...doc.data(), id: doc.id});
                dishCard.innerHTML += ` <div class="col-lg-3">
                <div class="card">
                    <img height="200" src='${doc.data().img}' class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${doc.data().name}</h5>
                    <p class="card-text mb-2">${doc.data().intro}</p>
                        <div class="h-auto d-flex justify-content-between">
                        <p class="fw-bold mb-0">${doc.data().price}Rs</p>
                        <p class="mb-0" onclick="addToCart('${doc.id}')"><i class="fa-solid fa-bag-shopping fw-bold"></i></p>
                        </div>
                    </div>
                </div>
                </div>`
            });
        }
        
    } catch (error) {
        console.log("error in getting dish", error);
    }

} 
getAllDishes();
let orderCount = document.getElementById("orderCount");
let orderCart = document.getElementById("orderCart");
let i = 0;
let addToCart = async(id) => {
    orderCount.style.display = "block";
    i++;
    localStorage.setItem("count", JSON.stringify(i));
    orderCount.innerHTML = i;
    // console.log(id);
    for(let key of dishes){
        const docRef = await addDoc(collection(db, "orders"), {
            name: key.name,
            img: key.img,
            price: key.price,
          });
        break;
    }
    localStorage.setItem("order", JSON.stringify(dishes));
    getOrder()
}
let getOrder = () => {

    let a = JSON.parse(localStorage.getItem("order")) || [];
    console.log(a);
    a.map((val) => {
        orderCart.innerHTML = `<div class="card w-100 mb-3">
        <div class="card-body d-flex align-items-center justify-content-between">
        <div class="d-flex">
                <img class="rounded" width="150" src=${val.img} alt="">
            <div class="ps-4">
                <h3 class="card-title">${val.name}</h3>
                <h6 class="card-title">Rs.${val.price}</h6>
                </div>
                </div>
                </div>
                </div>`
                // <p class="card-text">Serves ${serving}</p>
    })
}

window.addToCart = addToCart