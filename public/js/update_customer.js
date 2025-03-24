// Get the objects we need to modify
let updatePersonForm = document.getElementById('update-customer-form-ajax');

// Modify the objects we need
updatePersonForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputFullName = document.getElementById("full-name-selection");
    let inputFirstName = document.getElementById("input-update-fname");
    let inputLastName = document.getElementById("input-update-lname");
    let inputEmail = document.getElementById("input-update-email");
    let inputPhone = document.getElementById("input-update-phone");
    let inputmemID = document.getElementById("input-memID-update");

    // Get the values from the form fields
    let fullNameValue = inputFullName.value;
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let emailValue = inputEmail.value;
    let phoneValue = inputPhone.value;
    let memIDValue = inputmemID.value;
    
    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld

    // Put our data we want to send in a javascript object
    let data = {
        fullname: fullNameValue,
        firstName: firstNameValue,
        lastName: lastNameValue,
        emailValue: emailValue,
        phoneValue: phoneValue,
        memIDVal: memIDValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-customer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, fullNameValue);

            inputFullName.value = '';
            inputFirstName.value = '';
            inputLastName.value = '';
            inputEmail.value = '';
            inputPhone.value = '';
            inputmemID.value = '';

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, customerID){
    
    let parsedData = JSON.parse(data);
    console.log("The Data I recieved from app.js is", parsedData);
    
    let table = document.getElementById("customers-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == customerID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            console.log(updateRowIndex)

            let firstName = updateRowIndex.getElementsByTagName("td")[1];
            let lastName = updateRowIndex.getElementsByTagName("td")[2];
            let email = updateRowIndex.getElementsByTagName("td")[3];
            let phone = updateRowIndex.getElementsByTagName("td")[4];
            let tier = updateRowIndex.getElementsByTagName("td")[5];

            firstName.innerHTML = parsedData[0].firstName;
            lastName.innerHTML = parsedData[0].lastName;
            email.innerHTML = parsedData[0].email;
            phone.innerHTML = parsedData[0].phone;
            tier.innerHTML = parsedData[0].tier;
       }
    }

    // let dropownName = document.getElementById("full-name-selection")
    // let dropDownOptions = do




}