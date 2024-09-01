var tablBox = '';
var tBody = document.getElementById("tBody");
var editIndex = null;  // To keep track of the contact being edited

// Load and display existing contacts from local storage when the page loads
window.onload = function() {
    loadContacts();
}

function validName(uName){
    var regex = /^[a-zA-Z0-9\s.,'"\-!?:()]{3,49}$/;
    return regex.test(uName);
}

function validNumber(uTel){
    var regex = /^(002){0,1}01[0125][0-9]{8}$/;
    return regex.test(uTel);
}

function addContactData() {
    var uName = document.getElementById("uName").value;
    var uTel = document.getElementById("uTel").value;

    // Perform validation
    if (!validName(uName)) {
        alert('Name Invalid');
        return;
    }
    if (!validNumber(uTel)) {
        alert('Number Invalid');
        return;
    }

    var time = new Date();
    var contact = {
        name: uName,
        tel: uTel,
        time: `${time.getHours()} : ${time.getMinutes()} : ${time.getSeconds()}`
    };

    var contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    if (editIndex !== null) {
        contacts[editIndex] = contact;  // Update the existing contact
        editIndex = null;  // Reset edit mode
    } else {
        contacts.push(contact);  // Add a new contact
    }

    localStorage.setItem("contacts", JSON.stringify(contacts));
    loadContacts();
    resetForm();
}

function loadContacts() {
    var contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    tablBox = '';

    contacts.forEach((contact, index) => {
        tablBox += `
            <tr>
                <th scope="row">${contact.name}</th>
                <td>${contact.tel}</td>
                <td>${contact.time}</td>
                <td>
                   <button onclick="removeContact(${index})">Remove</button>
                </td>
            </tr>
        `;
    });

    tBody.innerHTML = tablBox;
}

function removeContact(index) {
    var contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    contacts.splice(index, 1);  // Remove the contact at the given index
    localStorage.setItem("contacts", JSON.stringify(contacts));
    loadContacts();  // Refresh the table
}

function resetForm() {
    document.getElementById("uName").value = "";
    document.getElementById("uTel").value = "";
    editIndex = null;  // Reset edit mode
}
