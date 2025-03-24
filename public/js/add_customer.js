let addCustomerForm = document.getElementById('add-customer-form-ajax');


addCustomerForm.addEventListener("submit", function (e) {

    e.preventDefault();

    let inputFirstName = document.getElementById("input-fname");
    let inputLastName = document.getElementById("input-lname");
    let inputEmail = document.getElementById("input-email");
    let inputPhone = document.getElementById("input-phone");
    let inputMemID = document.getElementById("input-memID");

    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let emailValue = inputEmail.value;
    let phoneValue = inputPhone.value;
    let memIDValue = inputMemID.value;

    let data = {
        fname: firstNameValue,
        lname: lastNameValue,
        email: emailValue,
        phone: phoneValue,
        memID: memIDValue
    }
    console.log("The data in add_customer",data)

     // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-customer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

     // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputFirstName.value = '';
            inputLastName.value = '';
            inputEmail.value = '';
            inputPhone.value = '';
            inputMemID.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }
     // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


addRowToTable = (data) => {

    //This data is the data that app.post sends to it. 
    //See what this data looks like. 
    //Make sure the attribute names match(ex: newRow.firstName)
    let currentTable = document.getElementById("customers-table");
    
    let newRowIndex = currentTable.rows.length;

    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length-1]

    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let firstNameCell = document.createElement("TD");
    let lastNameCell = document.createElement("TD");
    let emailCell = document.createElement("TD");
    let phoneCell = document.createElement("TD");
    let memIDCell = document.createElement("TD");
    let deleteCell = document.createElement("TD")

    idCell.innerText = newRow.customerID;
    firstNameCell.innerText = newRow.firstName;
    lastNameCell.innerText = newRow.lastName;
    emailCell.innerText = newRow.email;
    phoneCell.innerText = newRow.phone;
    memIDCell.innerText = newRow.tier;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteCustomer(newRow.customerID)
    }
    
    
    row.appendChild(idCell);
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(emailCell);
    row.appendChild(phoneCell)
    row.appendChild(memIDCell);
    row.appendChild(deleteCell);

    row.setAttribute('data-value', newRow.customerID);
    currentTable.appendChild(row);



    
    let selectmemIDUpdate = document.getElementById("full-name-selection");
    let option = document.createElement("option");
    option.text = newRow.firstName + ' ' +  newRow.lastName;
    option.value = newRow.customerID;
    selectmemIDUpdate.add(option);


}