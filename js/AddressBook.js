class AddressBook {

    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }

    get name() {
        return this._name;
    }
    set name(name) {
        const nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
        if (nameRegex.test(name)) {
            this._name = name;
        } else {
            throw "1)First letter must be in uppercase."
            + "\n2)Minimum 3 characters";
        }
    }

    get phone() {
        return this._phone;
    }
    set phone(phone) {
        const phoneRegex = RegExp('^[+][1-9]{2}[-][0-9]{10}$');
        if (phoneRegex.test(phone)) {
            this._phone = phone;
        } else {
            throw "1)Phone number should be starts with country code"
            + "\n2)Phone number must be have 10 digits (Ex:+91-1234567890)";
        }
    }

    get address() {
        return this._address;
    }
    set address(address) {
        const addressRegex = RegExp('^([A-Za-z0-9/.,-]{3,}.)+$');
        if (addressRegex.test(address)) {
            this._address = address;
        } else {
            throw "Invalid address";
        }
    }

    get state() {
        return this._state;
    }
    set state(state) {
        this._state = state;
    }

    get city() {
        return this._city;
    }
    set city(city) {
        this._city = city;
    }

    get zipcode() {
        return this._zipcode;
    }
    set zipcode(zipcode) {
        const zipcodeRegex = RegExp('^[0-9]{6}$');
        if (zipcodeRegex.test(zipcode)) {
            this._zipcode = zipcode;
        } else {
            throw "Invalid Zipcode.";
        }
    }

    toString() {
        return "id=" + this.id + ",name='" + this.name + ", phone='" +
            this.phone + ",address='" + this.address + ",city='" +
            this.city + ",state='" + this.state + ",zipcode='" + this.zipcode;
    }
}