window.addEventListener ('DOMContentLoaded', (event) => {

    const name = document.querySelector('#name');
    const nameError = document.querySelector('.name-error');
    name.addEventListener('input', function(){
        if(name.value.length == 0)
        {
            nameError.textContent = "";
            return;
        }
        try 
        {
            (new Contact()).name = name.value;
            nameError.textContent = "";
        } 
        catch (e) 
        {
            nameError.textContent = e;
        }  
    });

    const phone = document.querySelector('#phoneNumber');
    const phoneError = document.querySelector('.phoneNumber-error');
    phone.addEventListener('input', function() 
    {
        if(phone.value.length == 0)
        {
            phoneError.textContent = "";
            return;
        }
        try 
        {
            (new Contact()).phoneNumber = phone.value;
            phoneError.textContent = "";
        } 
        catch (e) 
        {
            phoneError.textContent = e;
        }  
    });  

    const address = document.querySelector('#address');
    const addressError = document.querySelector('.address-error');
    phone.addEventListener('input', function() 
    {
        if(address.value.length == 0)
        {
            addressError.textContent = "";
            return;
        }
        try 
        {
            (new Contact()).address = address.value;
            addressError.textContent = "";
        } 
        catch (e) 
        {
            addressError.textContent = e;
        }  
    });
    
    const zip = document.querySelector('#zip');
    const zipError = document.querySelector('.zip-error');
    phone.addEventListener('input', function() 
    {
        if(zip.value.length == 0)
        {
            zipError.textContent = "";
            return;
        }
        try 
        {
            (new Contact()).zip = zip.value;
            zipError.textContent = "";
        } 
        catch (e) 
        {
            zipError.textContent = e;
        }  
    });
});

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
};

const save = () => {
	try	{
		let addressBookData = createAddressBook();
        createAndUpdateStorage(addressBookData); 
    } catch (e) {
		return;
	}
}

function createAndUpdateStorage(addressBookData)
{
	let addressBookList = JSON.parse(localStorage.getItem("AddressBookList"));

	if(addressBookList != undefined) {
		addressBookList.push(addressBookData);
	} else {
		addressBookList = [addressBookData];
	}
	alert(addressBookList.toString());
	localStorage.setItem("AddressBookList",JSON.stringify(addressBookList));
}

const createAddressBook = () => {
	let addressBookData = new Contact();

	try {
		addressBookData.name = getInputValueById('#name');
	} catch (e) {
		setTextValue('.name-error', e);
		throw e;
	}

    try {
		addressBookData.phoneNumber = getInputValueById('#phoneNumber');
	} catch (e) {
		setTextValue('.phoneNumber-error', e);
		throw e;
	}

    try {
		addressBookData.address = getInputValueById('#address');
	} catch (e) {
		setTextValue('.address-error', e);
		throw e;
	}

    addressBookData.city = getSelectedValues('[name=city]').pop();
    addressBookData.state = getSelectedValues('[name=state]').pop();
    
    try {
		addressBookData.zip = getInputValueById('#zip');
	} catch (e) {
		setTextValue('.zip-error', e);
		throw e;
	}

	alert(addressBookData.toString());
	return addressBookData;
}

const getSelectedValues = (propertyValue) => {
	let allItems = document.querySelectorAll(propertyValue);
	let selItems = [];
	allItems.forEach(item => {
		if(item.checked) selItems.push(item.value);
	});
	return selItems;
}

const getInputValueById = (id) => {
	let value = document.querySelector(id).value;
	return value;
}

const getInputElementValue = (id) => {
	let value = document.getElementById(id).value;
	return value;
}

const resetForm = () => {
	setTextValue('#name','');
	setTextValue('#phoneNumber','');
	setTextValue('#address','');
	setValue('#city','');
	setValue('#state','');
    setTextValue('#zip','');
}

const setTextValue = (id, value) => {
	const element = document.querySelector(id);
	element.textContent = value;
}

const setValue = (id, value) => {
	const element = document.querySelector(id);
	element.value = value;
}