form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const Skills = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    
    checkboxes.forEach(function(checkbox) {
      Skills.push(checkbox.value);
    });
  
    const employee = {
     
      firstName: document.getElementById("inputFirstName").value,
      firstName: document.getElementById("inputFirstName").value,
      lastName: document.getElementById("inputLastName").value,
      email: document.getElementById("inputEmail").value,
      phoneNumber: document.getElementById("inputPhoneNumber").value,
      address: document.getElementById("inputAddress").value,
      country: document.getElementById("inputCountry").value,
      city: document.getElementById("inputCity").value,
      skills: Skills
    }
    //console.log(employee);
    
    fetch('/api/employee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(employee)
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // employee added successfully
        alert('Employee added successfully.');
        window.location.href = '/Employee/search';
      } else {
        // error adding employee
        alert(data.error);
      }
    })
    .catch(error => console.error(error));
    
  });
  