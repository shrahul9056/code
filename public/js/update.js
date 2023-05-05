form.addEventListener("submit", (event) => {

    event.preventDefault(); 
    const Skills = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    
    checkboxes.forEach(function(checkbox) {
      Skills.push(checkbox.value);
    });
    const formData = {
      id : document.getElementById("userId").value,
      firstName: document.getElementById("inputFirstName").value,
      lastName: document.getElementById("inputLastName").value,
      email: document.getElementById("inputEmail").value,
      phoneNumber: document.getElementById("inputPhoneNumber").value,
      address: document.getElementById("inputAddress").value,
      country: document.getElementById("inputCountry").value,
      city: document.getElementById("inputCity").value,
      skills: Skills
    }
    //console.log(JSON.stringify(formData));

    fetch('/Employee/update', {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: {
          'Content-Type': 'application/json'
      }
   })
    .then(response => {
      if (response.ok) {
        window.location.href = "/Employee/search";
        alert('Data saved successfully!');
        
        //response.headers.set('success', 'true');
      } else {
        alert('An error occurred while saving data.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while saving data.');
    });
  });
  