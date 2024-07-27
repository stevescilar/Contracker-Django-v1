/**
 * Registration form validation script
 *
 * This script validates the username and email fields in real-time using API calls.
 */

// declaring the ID's from the registration form
const usernameField = document.querySelector("#usernameField");
const feedBackArea = document.querySelector(".invalid_feedback");
const emailField = document.querySelector("#emailField");
const passwordField = document.querySelector("#passwordField");
const emailFeedBackArea = document.querySelector(".emailFeedBackArea");
const showPasswordToggle = document.querySelector(".showPasswordToggle");
const usernameSuccessOutput = document.querySelector(".usernameSuccessOutput")
const submitBtn = document.querySelector(".submit-btn");
/**
 * Toggles the password input field between show and hide
 *
 * @param {Event} e - The click event
 */

const handleToggleInput = (e) => {
    if(showPasswordToggle.textContent === 'SHOW') {

        showPasswordToggle.textContent = 'HIDE';
        passwordField.setAttribute("type", "text")

    }else {
        showPasswordToggle.textContent = 'SHOW';
        passwordField.setAttribute("type", "password")

    }
};

showPasswordToggle.addEventListener("click", handleToggleInput);

/**
 * Validates the email field in real-time using API call
 *
 * @param {Event} e - The keyup event
 */
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
                submitBtn.disabled = true
                emailField.classList.add("is-invalid");
                emailFeedBackArea.style.display='block'
                emailFeedBackArea.innerHTML=`<p>${data.email_error}</p>`

            }else{
                submitBtn.removeAttribute("disabled")
            }
        });
    }
}),


/**
 * Validates the username field in real-time using API call
 *
 * @param {Event} e - The keyup event
 */
usernameField.addEventListener("keyup", (e) => {
    const usernameVal = e.target.value;
    console.log("usernameVal", usernameVal); 
    usernameField.classList.remove("is-invalid");
    feedBackArea.style.display='none'
    
    if (usernameVal.length > 0) {
            // fetch API to validate username
        fetch("/authentication/validate-username",{
            body: JSON.stringify({username:usernameVal}),
            method: "POST",
        })
        .then((res) => res.json())
        .then((data) => {
            // add an error alert if username has error
            if(data.username_error){
                usernameField.classList.add("is-invalid");
                feedBackArea.style.display='block'
                feedBackArea.innerHTML=`<p>${data.username_error}</p>`
                submitBtn.disabled = true

            }else{
                submitBtn.removeAttribute("disabled")
            }
        });
    }
}); 
 