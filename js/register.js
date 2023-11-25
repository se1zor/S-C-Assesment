document.addEventListener("DOMContentLoaded", () => {
    let signOutBtn = document.querySelector(".js-signOut")
    signOutBtn.addEventListener("click", () => {
        signOut()
    })
    isSignedIn()
    let myForm = document.querySelector("#js-register")
    let inputBoxes = document.querySelectorAll(".input-group")
    myForm.addEventListener("submit", (event) => {
        event.preventDefault();
        // remove all error boxes
        inputBoxes.forEach(inputBox => {
            inputBox.classList.remove("errorBox")
            inputBox.previousElementSibling.classList.remove("showError")
        })
        let username = myForm.elements[0].value
        let fullname = myForm.elements[1].value
        let tele = myForm.elements[2].value
        

        if (!testUsername(username)) {
            inputBoxes[0].classList.add("errorBox")
            inputBoxes[0].previousElementSibling.classList.add("showError")
            return false
        }
        if (!testName(fullname)) {
            inputBoxes[1].classList.add("errorBox")
            return false
        }
        if (!testTele(tele)) {
            inputBoxes[2].classList.add("errorBox")
            return false
        }
        addNewUser({
            username: username.trim(),
            fullname: fullname.trim(),
            tele: tele.trim(),
        
        })
    })
})


let testUsername = (username) => {
    if (username.value = (/^[a-n][O-Z][a-n]\d{4}$/)){
        return true
    } else {

        return false
    }
    }   

let testName = (fullname) => {
    fullname = fullname.trim()
    if (fullname.split(" ").length < 2)
        return false
    let charList = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ "
    for (letter of fullname) {
        if (!charList.includes(letter))
            return false
    }
    return true
}


let testTele= (tele) => {
   if(tele.value = (/^\d{3}-\d{3}-\d{4}$/gm)){
    return true 
   }else {
    return false
   }
   }



let addNewUser = (formData) => {
    formData.fullname = formData.fullname.split(" ")
    let firstname = formData.fullname[0]
    let lastname = formData.fullname[formData.fullname.length - 1]
    
    let charList = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdfghijklmnopqrstuvwxyz"
    let passwd = ""
    while (passwd.length <=10) {
        passwd += charList[Math.floor(Math.random() * charList.length)]
    }
    console.warn(passwd)
    myData = {
        "username": formData.username,
        "firstname": firstname,
        "lastname": lastname,
        "tele": formData.Tele,
        "password": passwd
        // complete the remaining values for the JSON object
    }
    localStorage.setItem(formData.username, JSON.stringify(myData))
    sessionStorage.setItem("newUser",formData.username)
    location.assign("password.html")
    console.log(formData)
}