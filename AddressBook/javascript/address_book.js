let isUpdate = false;
let addressBookDataObject = {};

window.addEventListener('DOMContentLoaded', (event) => {
    
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

const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      setEmployeePayrollObject();
      createAndUpdateStorage();
      resetForm();
      window.location.replace(site_properties.home_page);
    }
    catch (e) {
      alert(e);
    }
};

const setAddressBookObject = () => {
    if(!isUpdate && site_properties.use_local_storage.match("true")){
        addressBookDataObject.id = createNewAddressId();
    }

    addressBookDataObject._name = getInputValueById('#name');
    addressBookDataObject._phoneNumber = getInputValueById('#phoneNumber');
    addressBookDataObject._address = getInputValueById('#address');
    addressBookDataObject._city = getInputValueById('#city');
    addressBookDataObject._state = getInputValueById('#state');
    addressBookDataObject._zip = getInputValueById('#zip');
};

const createNewAddressId = () => {
    let addressId = localStorage.getItem('AddressId');
    addressId = !employee ? 1: (parseInt(addressId)+1).toString();
    localStorage.setItem('AddressId',addressId);
    return addressId;
}

const createAndUpdateStorage = () => {
    let addressBookList = JSON.parse(localStorage.getItem("Address_Book_App"));
    if(addressBookList) {
        let addressBookData = addressBookList.find(addressData => addressData.id == addressBookDataObject.id);
        if(!addressData)
          addressBookList.push(setAddressBookDataObject);
        else{
          const index = addressBookList.map(addressData => addressData.id).indexOf(addressBookData.id);
          addressBookList.splice(index, 1, addressBookDataObject);
        }
    }
    else
        addressBookList = [addressBookDataObject];

    localStorage.setItem("Address_Book_App", JSON.stringify(addressBookList));
};

const setForm = () =>
{
    setValue('#name', addressBookDataObject._name);
    setValue('#phoneNumber', addressBookDataObject._phoneNumber);
    setValue('#address', addressBookDataObject._address);
    setValue('#city', addressBookDataObject._city);
    setValue('#state', addressBookDataObject._state);
    setValue('#zip', addressBookDataObject._zip);
};

const resetForm = () => {
	setValue('#name','');
	setValue('#phoneNumber','');
	setValue('#address','');
	setValue('#city','');
	setValue('#state','');
    setValue('#zip','');
}

const checkForUpdate = () => {
    const addressBookDataJson = localStorage.getItem('editAddress');
    isUpdate = addressBookDataJson ? true : false;
    if (!isUpdate)
        return;
    addressBookDataObject = JSON.parse(addressBookDataJson);
    setForm();
};

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
};
  
const getInputElementValue = (id) => {
    let value = document.getElementById(id).value;
    return value;
};

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
};

