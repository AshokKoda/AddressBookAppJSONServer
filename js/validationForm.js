let isUpdate = false;
let addressBookObject = {};

window.addEventListener('DOMContentLoaded', (event) => {
    validateName();
    validatePhone();
    validateAddress();
});

function validateName() {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.error-name');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            checkName(name.value);
            textError.textContent = "";
        } catch (e) {
            console.error(e);
            textError.textContent = e;
        }
    });
}

function validatePhone() {
    const phone = document.querySelector('#phone');
    const phoneError = document.querySelector('.error-phone');
    phone.addEventListener('input', function () {
        if (phone.value.length == 0) {
            phoneError.textContent = "";
            return;
        }
        try {
            checkPhone(phone.value);
            phoneError.textContent = "";
        } catch (e) {
            console.error(e);
            phoneError.textContent = e;
        }
    });
}

function validateAddress() {
    const address = document.querySelector('#address');
    const addressError = document.querySelector('.error-address');
    address.addEventListener('input', function () {
        if (address.value.length == 0) {
            addressError.textContent = "";
            return;
        }
        try {
            checkAddress(address.value);
            addressError.textContent = "";
        } catch (e) {
            console.error(e);
            addressError.textContent = e;
        }
    });
}

function redirect() {
    console.log("redirect");
    resetForm();
    window.location.replace(site_properties.homepage);
}

const save = (event) => {
    console.log("Save");
    event.preventDefault();
    event.stopPropagation();
    try {
        setAddressBookObject();
        if (site_properties.localstorage.match("true")) {
            createAndUpdateStorage();
            alert("Data Stored With Name " + addressBookObject._name);
            redirect();
        } else {
            createOrUpdateAddressInJsonServer();
        }
    } catch (e) {
        console.log(e);
        return;
    }
}

const createAndUpdateStorage = () => {
    let personList = JSON.parse(localStorage.getItem("AddressBookList"));
    if (personList) {
        let existingPersonData = personList.find(personData => personData._id == addressBookObject.id);
        if (!existingPersonData) {
            //addressBookObject.id = createNewPersonId();
            personList.push(addressBookObject);
        } else {
            const index = personList.map(person => person._id).indexOf(addressBookObject.id); //Get index of that array using map andindexOf
            personList.splice(index, 1, addressBookObject); //Remove person from the list
        }
    } else {
        //data.id = createNewPersonId();
        personList = [addressBookObject];
    }
    localStorage.setItem('AddressBookList', JSON.stringify(personList));
}

function createOrUpdateAddressInJsonServer() {
    let url = site_properties.server_url;
    let methodCall = "POST";
    let message="Data Store with name ";

    makeServiceCall(methodCall,url,true,addressBookObject)
    .then(response => {
        alert(message + addressBookObject._name);
        redirect();
    }).catch(error => {
        console.log("inside error")
        throw error
    });
}

const getInputValueId = (id) => {
    return document.querySelector(id).value;
}