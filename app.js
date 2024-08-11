import {db, addDoc, collection, getDocs} from './firebase.js'

let Book = async() => {
    let reserveName = document.getElementById("resereName");
    let reserveDate = document.getElementById("resereDate");
    let reserveTime = document.getElementById("resereTime");
    let reservePersons = document.getElementById("reserePersons");

    const docRef = await addDoc(collection(db, "table"), {
        name: reserveName.value,
        date: reserveDate.value,
        time: reserveTime.value,
        per: reservePersons.value,
      });
    console.log("Document written with ID: ", docRef.id);
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Your table has been booked",
        showConfirmButton: false,
        timer: 3000,
    });

}
let bookTableBtn = document.getElementById("bookTableBtn");
bookTableBtn && bookTableBtn.addEventListener("click", Book);



const getAllRestaurants = async() =>{
    let getCard = document.querySelector(".c");
    if(getCard){
    getCard.innerHTML = '';
    const q = collection(db, "resturants");
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // console.log(doc.data());
        getCard.innerHTML += `
        <div class="card" style="width: 18rem;">
        <img height="250" class="rounded" src='${doc.data().img}' class="card-img-top" alt="...">
            <div class="card-body bg">
                <div class="d-flex justify-content-between">
                    <h5 class="card-title">${doc.data().name}</h5>
                    <p>${doc.data().rev}+</p>
                </div>
                <p class="card-text">${doc.data().intro}</p>
                <a href="resDish.html?resturants=${doc.id}" class="btn btn-primary">View dishes</a>
            </div>
        </div>`
    })
}
}
getAllRestaurants();


