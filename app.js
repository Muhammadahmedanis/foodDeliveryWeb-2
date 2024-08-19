import {db, addDoc, collection, getDocs, createUserWithEmailAndPassword, auth, onAuthStateChanged, signOut, signInWithEmailAndPassword, } from './firebase.js'

document.getElementById('signin').onclick = function() {
  // Close the current modal
  var loginModal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
  loginModal.hide();

  // Wait until the modal is hidden, then show the new modal
  document.getElementById('staticBackdrop').addEventListener('hidden.bs.modal', function () {
    var signinModal = new bootstrap.Modal(document.getElementById('newModal'));
    signinModal.show();
  }, { once: true });
};




let Login = () => {
    let emailInp = document.getElementById("emailInp");
    let passInp = document.getElementById("passInp");

    createUserWithEmailAndPassword(auth, emailInp.value, passInp.value)
    .then((userCredential) => {
    const user = userCredential.user;
    console.log("Login Suessfully", user);
    alert("Login Suessfully");
  })
  .catch((error) => {
    console.log("Error in login:-", error);
  });
}

let loginBtn = document.getElementById("loginBtn");
loginBtn && loginBtn.addEventListener("click", Login)

let logoutBtn = document.getElementById("logoutBtn");
let login = document.getElementById("Login");

let Signin = () => {
  let signinEmail = document.getElementById("signinEmail");
  let signinPass = document.getElementById("signinPass");

  signInWithEmailAndPassword(auth, signinEmail.value, signinPass.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("user");
  })
  .catch((error) => {
   console.log("error", error);
  });
}

let signinBtn = document.getElementById("signinBtn");
signinBtn && signinBtn.addEventListener("click", Signin)



let Logout = () => {
  signOut(auth).then(() => {
    console.log("Sign-out successful.");
    logoutBtn.style.display = "none";
    login.style.display ="block";
    let users = document.querySelector(".user");
    let userAccess = document.querySelector(".userAccess");
        userAccess.style.display = "none";
        users.style.display = "flex";
  }).catch((error) => {
    console.log("error in logout", error);
  });
}

logoutBtn && logoutBtn.addEventListener("click", Logout)



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


onAuthStateChanged(auth, (user) => {
  if (user) {
    // const uid = user.uid;
    bookTableBtn.disabled = false;
    login.style.display = "none";
    logoutBtn.style.display = "block";
    if(user.email === "admin@gmail.com"){
    let users = document.querySelector(".user");
    let userAccess = document.querySelector(".userAccess");
        userAccess.style.display = "flex";
        users.style.display = "none";
      }
    console.log(user);
  } else {
    console.log("logout");
  }
});


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


