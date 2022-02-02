const checkName = (name) => {
    let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z]{2,}$');
    if (!nameRegex.test(name))
        throw "1)First letter must be in uppercase."
        + "\n2)Minimum 3 characters";
}

const checkPhone = (phone) => {
    let phoneRegex = RegExp('^[+][1-9]{2}[-][0-9]{10}$');
    if (!phoneRegex.test(phone))
        throw "1)Phone number should be starts with country code"
        + "\n2)Phone number must be have 10 digits (Ex:+91-1234567890)";
}

const checkAddress = (address) => {
    let addressRegex = RegExp('^([A-Za-z0-9/.,-]{3,}.)+$');
    if (!addressRegex.test(address))
        throw "Invalid address";
}