import {db, addDoc, getDocs, collection, doc } from './firebase.js';

let orderList  = document.getElementById("orderList");
let ind = 0;
let order = async() => {
    if(orderList){
        orderList.innerHTML = '';
        const q = collection(db, "orders");
        const querySnapshot = await getDocs(q);
        ind++;
        // let status = doc.data().status;
        // if(status == "pending"){
        //     statusColor = "text-bg-warning"
        // }
        querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        orderList.innerHTML += `<tr>
        <th scope="row">${ind}</th>
        <td>${doc.data().res}</td>
        <td>${doc.data().user}</td>
        <td>${doc.data().name}</td>
        <td><img height="65" width="95" class="resLogoImg" src='${doc.data().img}' alt=""></td>
        <td>${doc.data().price} Rs</td>
        <td></td>
        </tr>`
        // <td><img height="65" width="95" class="resLogoImg" src='${doc.data().img}' alt=""></td>
    });
}
}

order()