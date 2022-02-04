let addressBookList;

window.addEventListener('DOMContentLoaded', (event) => {
    if (site_properties.useLocalStorage.match("true")) {
        getDataFromLocalStorage();
    } else
        getAddressDataFromServer();
})

function processAddressDataResponse() {
    //document.querySelector('.address-count').textContent = addressBookList.length;
    createInnerHTML();
    localStorage.removeItem("edit-address");
}

const getDataFromLocalStorage = () => {
    addressBookList = localStorage.getItem('AddressBookList') ?
        JSON.parse(localStorage.getItem('AddressBookList')) : [];
        processAddressDataResponse();
}

const getAddressDataFromServer = () => {

    makeServiceCall("GET", site_properties.server_url, true)
        .then(response => {
            addressBookList = JSON.parse(response);
            processAddressDataResponse();
        })
        .catch(error => {
            console.log("Get Error Status : " + JSON.stringify(error));
            addressBookList = [];
            processAddressDataResponse();
        })
}

const createInnerHTML = () => {
    const headerHtml = `
    <tr>
        <th>Fullname</th>
        <th>Address</th>
        <th>City</th>
        <th>State</th>
        <th>Zip Code</th>
        <th>Phone Number</th>
        <th>Actions</th>
    </tr>`;

    let innerHtml = `${headerHtml}`;
    //if (addressBookList.length == 0) return;
    for (const personData of addressBookList) {
        innerHtml = `${innerHtml}
        <tr>
            <td>${personData._name}</td>
            <td>${personData._address}</td>
            <td>${personData._city}</td>
            <td>${personData._state}</td>
            <td>${personData._zipcode}</td>
            <td>${personData._phone}</td>
            <td>
            <img id="${personData.id}" alt="edit" src="../assets/icons/create-black-18dp.svg" onClick=update(this)>
            <img id="${personData.id}" alt="delete" src="../assets/icons/delete-black-18dp.svg" onClick=remove(this)>
            </td>
        </tr>
        `;
    }
    document.querySelector('#display').innerHTML = innerHtml;
}

//Delete data
const remove = (data) => {
    //alert("Delete")
    let personData = addressBookList.find(addressData => addressData.id == data.id);
    if (!personData) {
        return;
    }
    const index = addressBookList.map(addressData => addressData.id).indexOf(personData.id);
    addressBookList.splice(index, 1);
    if(site_properties.useLocalStorage.match("true")){
        // addressBookList.splice(index, 1);
        localStorage.setItem('AddressBookList', JSON.stringify(addressBookList));
        createInnerHTML();
    } else {
        const deleteUrl = site_properties.server_url + personData.id.toString();
        makeServiceCall("DELETE",deleteUrl,true)
            .then(responseText=>{
                console.log(responseText)
                createInnerHTML();
            })
            .catch(error=>{
                console.log("Delete Error Status: " + JSON.stringify(error));
                alert("Error while deleting "+error)
            })
    }
}

//Update Data
const update = (data) => {
    //alert("Updated")
    let addressData = addressBookList.find(personData => personData.id == data.id);
    if (!addressData) {
        return;
    }
    localStorage.setItem('edit-address', JSON.stringify(addressData));
    window.location.replace(site_properties.addform);
}