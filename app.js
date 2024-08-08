import {db, addDoc, collection} from './firebase.js'

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
bookTableBtn.addEventListener("click", Book);