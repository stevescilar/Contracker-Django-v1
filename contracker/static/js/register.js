const usernameField = document.querySelector("#usernameField");
const feedBackArea = document.querySelector(".invalid_feedback");
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
 