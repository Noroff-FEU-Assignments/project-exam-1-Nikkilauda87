const contactForm = document.querySelector("#contactForm");
const fullName = document.querySelector("#fullName");
const email = document.querySelector("#email");
const subject = document.querySelector("#subject");
const formMessage = document.querySelector("#message");
const formButton = document.querySelector("formButton");
let variableID = "";

const arrayIDs = [
    document.querySelector("#fullNameError"),
    document.querySelector("#emailError"),
    document.querySelector("#subjectError"),
    document.querySelector("#messageError"),
    ]



fullName.addEventListener("keyup", checkAcceptenceName);
email.addEventListener("keyup", checkAcceptenceEmail);
subject.addEventListener("keyup", checkAcceptenceSubject);
formMessage.addEventListener("keyup", checkAcceptenceMessage);


// Check "on the goe" if users typing meets demand
function checkAcceptenceName () {
    if (checkLength(fullName.value, 5)) {
        document.querySelector("#nameAccept").style.display = "inline-block";
        arrayIDs[0].style.display = "none";
        console.log(arrayIDs[0]);
    }
    else {
        document.querySelector("#nameAccept").style.display = "none";
    }     
}

// Check "on the goe" if users typing meets demand
function checkAcceptenceEmail () {
    if (validateEmail(email.value)) {
        document.querySelector("#emailAccept").style.display = "inline-block";
        arrayIDs[1].style.display = "none";
    }
    else {
        document.querySelector("#emailAccept").style.display = "none";
    }     
}

// Check "on the goe" if users typing meets demand
function checkAcceptenceSubject () {
    if (checkLength(subject.value, 15)) {
        document.querySelector("#subjectAccept").style.display = "inline-block";
        arrayIDs[2].style.display = "none";
    }
    else {
        document.querySelector("#subjectAccept").style.display = "none";
    }     
}

// Check "on the goe" if users typing meets demand
function checkAcceptenceMessage () {
    if (checkLength(formMessage.value, 25)) {
        document.querySelector("#messageAccept").style.display = "inline-block";
        arrayIDs[3].style.display = "none";
    }
    else {
        document.querySelector("#messageAccept").style.display = "none";
    }     
}



// function to either submit (if everything is valid), or give feedback of whats wrong
function submitForm(event) {
    event.preventDefault();

    arrayValidateFunctions = [
        checkLength(fullName.value, 5),
        validateEmail(email.value),
        checkLength(subject.value, 15),
        checkLength(formMessage.value, 25),     
        ]
        
    
    const formParts = document.querySelectorAll("#contactForm > div");
    console.log(formParts);


    // check if all the fields are valid
    if (checkLength(fullName.value, 5) && validateEmail(email.value) && checkLength(subject.value, 15) && checkLength(formMessage.value, 25) ) {
        window.location = "success.html"; 
        form.reset();
        // reset the red "Not accepted" comment
        for (let i = 0; i < arrayValidateFunctions.length; i++) {
          
              let variableID = arrayIDs[i];
              variableID.style.display = "none"; 
        }
        
    }
    // all the fields are not okey, and feedback are given to those who are not
    else {
        for (let i = 0; i < arrayValidateFunctions.length; i++) {
          let variableID = arrayIDs[i];
          if (!arrayValidateFunctions[i])  {
              variableID.style.display = "inline-block";
              formParts[i].style.order = "5";
          }
          else {
              variableID.style.display = "none";
              formParts[i].style.backgroundColor = "rgb(144, 238, 144)";
          }  
        }   
      }
}




contactForm.addEventListener("submit", submitForm);







function checkLength(value, len) {
    if (value.trim().length >= len) {
        return true;
    } else {
        return false;
    }
  }

  function validateEmail(email) {
    const regEx = /\S+@\S+\.\S+/;
    const patternMatches = regEx.test(email);
    return patternMatches;
}