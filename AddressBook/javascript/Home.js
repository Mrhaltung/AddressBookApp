let addressBookList;

window.addEventListener('DOMContentLoaded',(event)=> {
    addressBookList = getAddressBookDataFromStorage();
    document.querySelector('.address-count').textContent = addressBookList.length;
    createInnerHtml();
    localStorage.removeItem('');
});

const getAddressBookDataFromStorage = () => {
    return localStorage.getItem('Address_Book_App') ? JSON.parse(localStorage.getItem('AddressBookList')) : [];
};

const createInnerHtml = () => {

    const headerHtml = 
    `<th>Name</th>
    <th>PhoneNumber</th>
    <th>Address</th>
    <th>City</th>
    <th>State</th>
    <th>ZipCode</th>
    <th>Action</th>`;

    if (addressBookList.length == 0)
      return;

    let innerHtml = `${headerHtml}`;

    for (const addressBookData of addressBookList) {

        innerHtml = `${innerHtml}
        <tr>
            <td>${addressBookData._name}</td>
            <td>${addressBookData._phoneNumber}</td>
            <td>${addressBookData._address}</td>
            <td>${addressBookData._city}</td>
            <td>${addressBookData._state}</td>
            <td>${addressBookData._zip}</td>
            <td><img id="${addressBookData._id}" src="../assets/icon/delete.svg" alt="delete" onclick="remove(this)">
                <img id="${addressBookData._id}" src="../assets/icon/edit.svg" alt="edit" onclick="remove(this)"></td>
        </tr>`;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
};

const remove = (node) => {
    let addressBookData = addressBookList.find(addressData => addressData.id == node.id);
    if (!addressData)
        return;

    const index = addressBookList
                  .map(addressData => addressData.id)
                  .indexOf(addressBookData.id);
    addressBookData.splice(index,1);
    localStorage.setItem("Address_Book_App", JSON.stringify(addressBookData));
    document.querySelector(".address-count").textContent = addressBookData.length;
    createInnerHtml();
};

const update = (node) => {
    let addressBookData = addressBookList.find(addressData => addressData.id == node.id);
    if(!addressBookData)
    return;
    localStorage.setItem('editAddress', JSON.stringify(addressBookData));
    window.location.replace(site_properties.add_Address_Book_page);
};