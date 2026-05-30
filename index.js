const signupCard = document.getElementById("signup-card");
const subscriptionSuccessCard = document.getElementById("subscription-success-card");
const signupForm = document.getElementById("signup-form");
const emailAddress = document.getElementById("email");
const subscriptionButton = document.getElementById("subscribe-button");
const emailErrorMessageElement = document.getElementById("email-error");
const dismissMessageButton = document.getElementById("dismiss-message-button");
const emailAddressInSubscriptionSuccessCard = document.getElementById("email-address");

subscriptionSuccessCard.classList.add("hidden");

function validateEmail(email){
    if(!email)
        return 'Email is required';

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = validEmail.test(email);

    if(!isValid)
        return "Valid email required";

    return '';
}

emailAddress.addEventListener("input", (e) => {
    const enteredEmailId = e.target.value;

    const invalidEmail = validateEmail(enteredEmailId);

    if(!invalidEmail){
        subscriptionButton.classList.add("active-button");
        emailErrorMessageElement.innerText = '';
        emailAddress.classList.remove("invalid-input");
    }else{
        subscriptionButton.classList.remove("active-button");
    }

})

signupForm.addEventListener("submit", handleSubmit);

function handleSubmit(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);
    const emailId = formObj.email;

    const invalidEmail = validateEmail(emailId);

    if(!invalidEmail){
        emailErrorMessageElement.innerText = '';
        emailAddress.classList.remove("invalid-input");
        signupCard.classList.add("hidden");
        emailAddressInSubscriptionSuccessCard.textContent = emailId;
        subscriptionSuccessCard.classList.remove("hidden");
        signupForm.reset();
        subscriptionButton.classList.remove("active-button");
    }else{
        emailErrorMessageElement.innerText = invalidEmail;
        emailAddress.classList.add("invalid-input");
    }
}

dismissMessageButton.addEventListener("click", () => {
    signupCard.classList.remove("hidden");
    subscriptionSuccessCard.classList.add("hidden");
})