document.addEventListener('DOMContentLoaded', () => {
    // run code after page has loaded
    let signOutBtn = document.querySelector(".js-signOut")
    signOutBtn.addEventListener("click", () => {
        signOut()
    })
    isSignedIn()
    let myForm = document.querySelector('#js-signIn')
    myForm.addEventListener("submit", (event) => {
        event.preventDefault()
        if (checkSignIn(myForm)) {

            location.assign("/favourites.html")
        }
        else {
            let errorBox = document.querySelector('.input-group').previousElementSibling
            errorBox.classList.add("showError")
        }
    })
})

let checkSignIn = (formData) => {
    let username = formData[0].value
    let password = formData[1].value
    let userData = JSON.parse(localStorage.getItem(username))
    if (userData && password == userData["password"]) {
        let user = {
            username: username,
            fname: userData["firstname"]
        }
        user = JSON.stringify(user)
        sessionStorage.setItem("currentUser", user)
        return true
    }
    return false
}