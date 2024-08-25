import {storage, ref, uploadBytesResumable, getDownloadURL, addDoc, db, collection, getDocs, deleteDoc, doc} from './firebase.js'

resList.innerHTML = '';
let uploadFile = async(resImg) => {
    return new Promise((resolve, reject) => {

    let file = resImg.files[0];
    const storageRef = ref(storage, `images/${file.name}`);
const uploadTask = uploadBytesResumable(storageRef, file);

uploadTask.on('state_changed', 
  (snapshot) => {
    console.log('Upload is ' + progress + '% done');
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
    let resList = document.getElementById("resList");
    let spinner = document.querySelector(".spinner");
    spinner.style.display = "block";
    let ind = 0;
    const q = collection(db, "resturants");
    const querySnapshot = await getDocs(q);
    if(resList){
    resList.innerHTML = '';
    querySnapshot.forEach((doc) => {
        ind++;
        console.log(doc.id, " => ", doc.data());
            resList.innerHTML += `<tr id = "${doc.id}">
            <th scope="row">${ind}</th>
            <td><img height="65" width="95" class="resLogoImg" src='${doc.data().img}' alt=""></td>
            <td>${doc.data().name}</td>
            <td>${doc.data().rev}</td>
            <td><i onclick = "delFunc('${doc.id}')" class="fa-solid fa-trash ms-3"></i></td>
            </tr>`
            spinner.style.display = "none";
          });
        }
}
getAllRestaurants();

let loader = document.querySelector(".loader");
let btnClose = document.getElementById("btn-close");

let Add = async () => {
let resIg = document.getElementById("resImg");
let resName = document.getElementById("resName");
let resReview = document.getElementById("resReview");
let resIntro = document.getElementById("resIntro");
try {
    loader.style.display = "block";
    let imgSrc = await uploadFile(resIg);
    const docRef = await addDoc(collection(db, "resturants"), {
        img: imgSrc,
        name: resName.value,
        rev: resReview.value,
        intro: resIntro.value,
    });
    console.log("Document written with ID: ", docRef.id);
    loader.style.display = "none";
    btnClose.click();
    resIg.value = '';
    resName.value = '';
    resReview.value = '';
    resIntro.value = '';
    getAllRestaurants();
    } catch (error) {
        console.log("error in store db", error);
    }
}

let addRes = document.getElementById("addRes");
addRes.addEventListener("click", Add)

async function delFunc(resId) {
  let resList = document.getElementById("resList");
  let rows = resList.getElementsByTagName("tr")
  // resList.innerHTML = ''
  for(let i = 0; i < rows.length; i++){
    if(rows[i].id === resId){
      // console.log(rows[i]);
      rows[i].innerHTML = '';
      await deleteDoc(doc(db, "resturants", resId));
      break;
    }
  }
  
  
  // console.log(rows[i].id === resId);
  // console.log(resId);
  
}

window.delFunc = delFunc;
