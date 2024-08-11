import {storage, ref, uploadBytesResumable, getDownloadURL, addDoc, db, collection, getDocs, doc, getDoc} from './firebase.js'

let uploadFile = async(dishImg) => {
    return new Promise((resolve, reject) => {

    let file = dishImg.files[0];
    const storageRef = ref(storage, `images/${file.name}`);
const uploadTask = uploadBytesResumable(storageRef, file);

uploadTask.on('state_changed', 
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    console.log("error in upload img");
  }, 
  () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          resolve(downloadURL)
        }).catch((error) => reject(error));
    }
);
})
}

const getAllRestaurants = async() => {
    let selectRes = document.getElementById("selectRes");
        if(selectRes){
            selectRes.innerHTML = '<option selected>Select a resturant</option>'
            const q = collection(db, "resturants");
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
            selectRes.innerHTML += `<option value="${doc.id}">${doc.data().name}</option>`
        });
    }
    getAllDishes();
}
getAllRestaurants();


const getAllDishes = async() => {
    let dishList = document.getElementById("dishList");
    let spinner = document.querySelector(".spinner");
    if(dishList){
    spinner.style.display = "block";
    let ind = 0;
    const q = collection(db, "dishes");
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        ind++;
        console.log(doc.id, " => ", doc.data());
            dishList.innerHTML += `<tr>
            <th scope="row">${ind}</th>
            <td>${doc.data().resturant}</td>
            <td><img height="65" width="95" class="resLogoImg" src='${doc.data().img}' alt=""></td>
            <td>${doc.data().name}</td>
            <td>${doc.data().price}</td>
            </tr>`
            spinner.style.display = "none";
        });
    }
}

let Add = async () => {
let selectRes = document.getElementById("selectRes");
let loader = document.querySelector(".loader");
let btnClose = document.getElementById("btn-close");
let dishImg = document.getElementById("dishImg");
let dishName = document.getElementById("dishName");
let dishPrice = document.getElementById("dishPrice");
let dishIntro = document.getElementById("dishIntro");
try {
    loader.style.display = "block";
    let imgSrc = await uploadFile(dishImg);
    const resRef = doc(db, "resturants", selectRes.value);
    const docSnap = await getDoc(resRef);

    const dishDetail = {
        resId: selectRes.value,
        resturant: docSnap.data().name ? docSnap.data().name : "resturant not register",
        img: imgSrc,
        name: dishName.value,
        price: dishPrice.value,
        intro: dishIntro.value,
    }
    // console.log(dishDetail);
    const docRef = await addDoc(collection(db, "dishes"), dishDetail);
    console.log("Document written with ID: ", docRef.id);
    loader.style.display = "none";
    btnClose.click();
    dishImg.value = '';
    dishName.value = '';
    dishPrice.value = '';
    dishIntro.value = '';
    getAllDishes();
    } catch (error) {
        console.log("error in store db", error);
    }
}

let addDish = document.getElementById("addDish");
addDish.addEventListener("click", Add)