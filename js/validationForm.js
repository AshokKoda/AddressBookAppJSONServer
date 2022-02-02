let isUpdate = false;
let addressBookObject = {};

window.addEventListener('DOMContentLoaded', (event) => {
    validateInputs();
    //validatePhone();
    //validateAddress();
});

function validateInputs() {
    const name = document.querySelector('#name');
    const nameError = document.querySelector('.error-name');
    const phone = document.querySelector('#phone');
    const phoneError = document.querySelector('.error-phone');
    const address = document.querySelector('#address');
    const addressError = document.querySelector('.error-address');
    const zipcode = document.querySelector('#zipcode');
    const zipcodeError = document.querySelector('.error-zipcode');

    name.addEventListener('input', function () {
        try {
            let personData = new AddressBook();
            personData.name = name.value;
            nameError.textContent = "";
        } catch (e) {
            nameError.textContent = e;
        }
    });

    phone.addEventListener('input', function () {
        try {
            let personData = new AddressBook();
            personData.phone = phone.value;
            phoneError.textContent = "";
        } catch (e) {
            phoneError.textContent = e;
        }
    });

    address.addEventListener('input', function () {
        try {
            let personData = new AddressBook();
            personData.address = address.value;
            addressError.textContent = "";
        } catch (e) {
            addressError.textContent = e;
        }
    });

    zipcode.addEventListener('input', function () {
        try {
            let personData = new AddressBook();
            personData.zipcode = zipcode.value;
            zipcodeError.textContent = "";
        } catch (e) {
            zipcodeError.textContent = e;
        }
    });
}

function redirect() {
    console.log("redirect");
    window.location.replace(site_properties.homepage);
}

const save = (event) => {
    console.log("Save");
    event.preventDefault();
    event.stopPropagation();
    try {
        setAddressBookObject();
        if (site_properties.useLocalStorage.match("true")) {
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

const setAddressBookObject = () => {
    addressBookObject._name = getInputValueId('#name');
    addressBookObject._phone = getInputValueId('#phone');
    addressBookObject._address = getInputValueId('#address');
    addressBookObject._city = getInputValueId('#city');
    addressBookObject._state = getInputValueId('#state');
    addressBookObject._zipcode = getInputValueId('#zipcode');
}

const createOrUpdateAddressInJsonServer = () => {
    let url = site_properties.server_url;
    let methodCall = "POST";
    let message = "Data Store with name ";

    makeServiceCall(methodCall, url, true, addressBookObject)
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

const cancel = () => {
    //alert("Cancel")
    window.location.replace(site_properties.homepage);
}