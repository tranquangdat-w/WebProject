const infoLoginEles = document.querySelectorAll(".login-input")
const signInButtonEle = document.querySelector(".sign-in-button")

signInButtonEle.addEventListener('click', () => {
    if (infoLoginEles[0].value === infoLoginEles[1].value) {
        window.location.href = "./amazon.html";        
    } else {
        document.querySelector('.wrong-password')
            .innerHTML = "Wrong password!"
        document.querySelector('.forgot-password')
            .innerHTML = "forgot?"
    }
});

infoLoginEles.forEach((ele) => {
    ele.addEventListener("keydown", () => {
        document.querySelector('.wrong-password')
            .innerHTML = "";
        document.querySelector('.forgot-password')
            .innerHTML = ""
    });
});