let signOut = () => {
    sessionStorage.clear()
    location.assign('/')
}

let isSignedIn = () =>{
    let currentUser = sessionStorage.getItem("currentUser")
    if (currentUser) {
        document.querySelector(".signedOut").classList.remove("signedOut")
    }
}