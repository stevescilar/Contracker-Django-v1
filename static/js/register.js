// declaring the ID's from the registration form
const usernameField = document.querySelector("#usernameField");
const feedBackArea = document.querySelector(".invalid_feedback");
const emailField = document.querySelector("#emailField");
const passwordField = document.querySelector(".passwordField");
const emailFeedBackArea = document.querySelector(".emailFeedBackArea");
const showPassword = document.querySelector(".showPassword");

const handleToggleInput = (e) => {
    if(showPassword.textContent === "SHOW") {
        showPassword.textContent = "HIDE";
    }else {
        showPassword.textContent = "SHOW";
    }
};

showPassword.addEventListener("click",handleToggleInput);


// event listener for email field
emailField.addEventListener("keyup", (e) => {
    const emailVal = e.target.value;
    console.log("emailVal", emailVal); 
    emailField.classList.remove("is-invalid");
    emailFeedBackArea.style.display='none'
    
    if (emailVal.length > 0) {
            // fetch_api
        fetch("/authentication/validate-email",{
            body: JSON.stringify({email:emailVal}),
            method: "POST",
        })
        .then((res) => res.json())
        .then((data) => {
            console.log("data",data);
            // dd an error alert if email has error
            if(data.email_error){
                emailField.classList.add("is-invalid");
                emailFeedBackArea.style.display='block'
                emailFeedBackArea.innerHTML=`<p>${data.email_error}</p>`

            }
        });
    }
}),





// event listener for username
usernameField.addEventListener("keyup", (e) => {
    const usernameVal = e.target.value;
    console.log("usernameVal", usernameVal); 
    usernameField.classList.remove("is-invalid");
    feedBackArea.style.display='none'
    
    if (usernameVal.length > 0) {
            // fetch_api
        fetch("/authentication/validate-username",{
            body: JSON.stringify({username:usernameVal}),
            method: "POST",
        })
        .then((res) => res.json())
        .then((data) => {
            console.log("data",data);
            // dd an error alert if username has error
            if(data.username_error){
                usernameField.classList.add("is-invalid");
                feedBackArea.style.display='block'
                feedBackArea.innerHTML=`<p>${data.username_error}</p>`

            }
        });
    }
}); 
 