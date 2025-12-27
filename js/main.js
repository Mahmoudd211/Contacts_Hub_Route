var fullNameInput = document.getElementById("fullName");
var phoneNumber = document.getElementById("phoneNumber");
var emailAddress = document.getElementById("emailAddress");
var address = document.getElementById("address");
var group = document.getElementById("group");
var notes = document.getElementById("notes");
var isFavorite = document.getElementById("isFavorite");
var isEmergency = document.getElementById("isEmergency");

var rowData = document.getElementById("rowData");


var totalContacts = document.getElementById("totalContacts");

var favoritesCount = document.getElementById("favoritesCount");

var emergencyCount = document.getElementById("emergencyCount");


var favoritesList = document.getElementById("favoritesList");

var emergencyList = document.getElementById("emergencyList");


var allContacts = [];


if (localStorage.getItem("contacts")) {

  allContacts = JSON.parse(   localStorage.getItem("contacts")   );
}


// Validation functions
function validatePhoneNumber(phone) {
  var phoneRegex = /^01[0-2,5]{1}[0-9]{8}$/;
  return phoneRegex.test(phone);
}

function validateEmail(email) {
  if (!email) return true; // Email is optional
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateInputs() {
  var fullName = fullNameInput.value.trim();
  var phone = phoneNumber.value.trim();
  var email = emailAddress.value.trim();

  if (!fullName) {
    Swal.fire({
      title: "Validation Error",
      text: "Full name is required!",
      icon: "error"
    });
    return false;
  }

  if (!phone) {
    Swal.fire({
      title: "Validation Error",
      text: "Phone number is required!",
      icon: "error"
    });
    return false;
  }

  if (!validatePhoneNumber(phone)) {
    Swal.fire({
      title: "Validation Error",
      text: "Please enter a valid Egyptian phone number (e.g., 01012345678)",
      icon: "error"
    });
    return false;
  }

  if (email && !validateEmail(email)) {
    Swal.fire({
      title: "Validation Error",
      text: "Please enter a valid email address",
      icon: "error"
    });
    return false;
  }

  return true;
}


function AddContact() {

    if (!validateInputs()) {
      return;
    }


    var newContact = {
      fullName: fullNameInput.value,
      phoneNumber: phoneNumber.value,
      emailAddress: emailAddress.value,
      address: address.value,
      group: group.value,
      notes: notes.value,

      isEmergency: isEmergency.checked,
      isFavorite: isFavorite.checked,
    };


    allContacts.push(newContact);

    console.log(  allContacts );


    clear();

    closeModal();

    Swal.fire({
      title: "Good job!",
      text: "you added the contact!",
      icon: "success",
    });

    showData();

      localStorage.setItem("contacts",    JSON.stringify(  allContacts ) );



}


function clear() {


  fullNameInput.value = "";
  phoneNumber.value = "";
  emailAddress.value = "";
  address.value = "";
  notes.value = "";
  group.value = "";

  isEmergency.checked = false;

  isFavorite.checked = false;
}

// Function to generate contact card HTML
function generateContactCardHTML(contact, contactIndex) {
  return `
  <div class="col-md-6">
    <div class="contact-card">
      <div class="contact-header">
        <div class="contact-avatar bg-primary ${contact.isFavorite ? "favorite" : ""} ${contact.isEmergency ? "emergency" : ""}">
          US
        </div>
        <div class="contact-info">
          <h4>${contact.fullName}</h4>
        </div>
      </div>
      <div class="contact-details">
        <div class="contact-detail phone">
          <i class="fas fa-phone"></i>
          <span>${contact.phoneNumber}</span>
        </div>
        <div class="contact-detail email">
          <i class="fas fa-envelope"></i>
          <span>${contact.emailAddress}</span>
        </div>
        <div class="contact-detail address">
          <i class="fas fa-map-marker-alt"></i>
          <span>${contact.address}</span>
        </div>
      </div>
      <div class="contact-tags">
        <span class="tag family">${contact.group}</span>
        ${contact.isEmergency ? '<span class="tag emergency"><i class="fas fa-heartbeat"></i> Emergency</span>' : ""}
      </div>
      <div class="contact-actions">
        <button class="contact-action call" title="Call">
          <i class="fas fa-phone"></i>
        </button>
        <button class="contact-action email" title="Email">
          <i class="fas fa-envelope"></i>
        </button>
        <button onclick="toggleFav(${contactIndex})" class="contact-action favorite ${contact.isFavorite ? "active" : ""}" title="Favorite">
          <i class="fas fa-star"></i>
        </button>
        <button onclick="toggleErm(${contactIndex})" class="contact-action emergency ${contact.isEmergency ? "active" : ""}" title="Emergency">
          <i class="fas fa-heart"></i>
        </button>
        <button class="contact-action" onclick="readyToUpdate(${contactIndex})" data-bs-toggle="modal" data-bs-target="#addContactModal" title="Edit">
          <i class="fas fa-edit"></i>
        </button>
        <button class="contact-action delete" onclick="deleteItem(${contactIndex})" title="Delete">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
  </div>
  `;
}

function showData() {


  if (allContacts.length === 0) {
    rowData.innerHTML = `<p class="alert alert-danger text-center">No contacts found</p>`;


    favoritesList.innerHTML = "no data";

    emergencyList.innerHTML = "no data";
    emergencyCount.innerHTML = 0;
    favoritesCount.innerHTML = 0;
    totalContacts.innerHTML = 0;
        

    return;
  }






var allContactsHTML = "";


var favoritesHTML = "";


var emergencyHTML = "";



var favoritesTotal = 0;

var emergencyTotal = 0;






for (var i = 0; i < allContacts.length; i++) {


  if(allContacts[i].isFavorite) {
    favoritesTotal++;

    favoritesHTML += `
    
          <div class="sidebar-contact-card">
                  <div class="sidebar-contact-avatar" style="background: #3b82f6">
                    SG
                  </div>
                  <div class="sidebar-contact-info">
                    <h5>${allContacts[i].fullName}</h5>
                    <p>${allContacts[i].phoneNumber}</p>
                  </div>
                  <button class="sidebar-call-btn favorites-call">
                    <i class="fas fa-phone"></i>
                  </button>
                </div>

    `;
  }


  if( allContacts[i].isEmergency) {
    emergencyTotal++;

    emergencyHTML += `
    

                <div class="sidebar-contact-card">
                  <div class="sidebar-contact-avatar" style="background: #3b82f6">
                    SG
                  </div>
                  <div class="sidebar-contact-info">
                    <h5>${allContacts[i].fullName}</h5>
                    <p>${allContacts[i].phoneNumber}</p>
                  </div>
                  <button class="sidebar-call-btn emergency-call">
                    <i class="fas fa-phone"></i>
                  </button>
                </div>
    
    `;

  }


  // Use the reusable function for contact card
  allContactsHTML += generateContactCardHTML(allContacts[i], i);




 

  
}


rowData.innerHTML = allContactsHTML;




favoritesList.innerHTML = favoritesHTML;


emergencyList.innerHTML = emergencyHTML;



totalContacts.innerHTML = allContacts.length;


favoritesCount.innerHTML = favoritesTotal;

emergencyCount.innerHTML = emergencyTotal;




}

showData()


function deleteItem(contactIndex) {



  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {

        allContacts.splice(contactIndex, 1);

        showData();

        localStorage.setItem("contacts", JSON.stringify(allContacts));


      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  });





}


var btnUpdate = document.getElementById("updateContactBtn");

var btnAdd = document.getElementById("saveContactBtn");

var updateIndex = 0;

function readyToUpdate(index) {


  fullNameInput.value = allContacts[index].fullName;
  phoneNumber.value = allContacts[index].phoneNumber;
  address.value = allContacts[index].address;
  emailAddress.value = allContacts[index].emailAddress;

  group.value = allContacts[index].group;


  isEmergency.checked = allContacts[index].isEmergency;

  isFavorite.checked = allContacts[index].isFavorite;
  
  btnUpdate.classList.remove("d-none");

  btnAdd.classList.add("d-none");

  updateIndex = index;

}


function updateItem() {

    if (!validateInputs()) {
      return;
    }

   var newContact = {
     fullName: fullNameInput.value,
     phoneNumber: phoneNumber.value,
     emailAddress: emailAddress.value,
     address: address.value,
     group: group.value,
     notes: notes.value,

     isEmergency: isEmergency.checked,
     isFavorite: isFavorite.checked,
   };


   allContacts.splice(updateIndex, 1, newContact);


   showData();
 localStorage.setItem("contacts", JSON.stringify(allContacts));


closeModal();
    Swal.fire({
      title: "Good job!",
      text: "you updated the contact!",
      icon: "success",
    });



    btnAdd.classList.remove("d-none");
    btnUpdate.classList.add("d-none");

        clear();
}



function closeModal() {

      var myModal = document.getElementById("addContactModal");

      var bootsrapmodal = bootstrap.Modal.getInstance(myModal);

      bootsrapmodal.hide();

}


function toggleFav(index) {


  console.log(  ! allContacts[index].isFavorite   );


  allContacts[index].isFavorite = ! allContacts[index].isFavorite;

  showData();


  localStorage.setItem("contacts", JSON.stringify(allContacts));

  


}


function toggleErm(index) {



  allContacts[index].isEmergency = !allContacts[index].isEmergency; 

  showData();

    localStorage.setItem("contacts", JSON.stringify(allContacts));



}

var searchInput = document.getElementById("searchInput");


function search() {


var searchText = searchInput.value;


  var searchResults = "";


  for( var i = 0 ; i < allContacts.length ; i++) {


    if (
      allContacts[i].fullName.toLowerCase().includes(searchText.toLowerCase()) ||
      allContacts[i].phoneNumber.toLowerCase().includes(searchText.toLowerCase()) ||
      allContacts[i].emailAddress.toLowerCase().includes(searchText.toLowerCase())
    ) {
      // Use the reusable function for search results too
      searchResults += generateContactCardHTML(allContacts[i], i);
    }


  }

  rowData.innerHTML = searchResults;

}

