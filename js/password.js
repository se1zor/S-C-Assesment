document.addEventListener("DOMContentLoaded", () => {
    let dataFields = document.querySelectorAll(".userData")
    userData = localStorage.getItem(sessionStorage.getItem("newUser"))
    userData = JSON.parse(userData)
    if (userData !== null) {
        dataFields[0].innerHTML = userData.username
        dataFields[1].innerHTML = userData.password
        console.log(userData.password)
    }
    sessionStorage.clear()
})