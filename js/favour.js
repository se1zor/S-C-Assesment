document.addEventListener('DOMContentLoaded', () => {
    if (!sessionStorage.getItem("currentUser"))
        location.assign('/')
    let dispName = document.querySelector(".js-name")
    let currentUser = JSON.parse(sessionStorage.getItem("currentUser"))
    dispName.innerHTML = "Welcome " + currentUser["fname"]
    let signOutBtn = document.querySelector(".js-signOut")
    signOutBtn.addEventListener("click", () => {
        signOut()
    })
    isSignedIn()

    showFavs(currentUser.username)
})

let showFavs = (user) => {
    let teamDat = document.querySelector(".teamData")
    let userData = JSON.parse(localStorage.getItem(user))
    userData.favourites.forEach(fav => {
        let bkCol = `#e2b7${Math.random().toString(16).substring(2, 4)}`
        teamDat.innerHTML += `
                 <div class="col-xl-3 text-center mt-3">
                    <div class="card" style="width: 18rem; background: ${bkCol};">
                        <div class="card-body">
                            <h5 class="card-title">${fav.name}</h5>
                            <h6 class="card-subtitle mb-2 text-body-secondary">${fav.code}</h6>
                            <p class="card-text">This team plays for .</p>
                            <a class="btn btn-info" data-code="${fav.code}" onclick="delFav(event)" >Delete from Favourites</a>
                        </div>
                    </div>
                </div>
                `
        // a = a + sum
        // a += sum
    })
}

let delFav = (event) => {
    let code = event.target.getAttribute("data-code")
    let currentUser = JSON.parse(sessionStorage.getItem("currentUser"))
    let userData = JSON.parse(localStorage.getItem(currentUser.username))
    let result = userData.favourites.filter(fav => code != fav.code)
    let theParent = event.target.parentNode.parentNode.parentNode
    theParent.classList.toggle("fade")
    setTimeout(() => {
        theParent.classList.toggle("hidden")
    }, 600);
    userData.favourites = result
    localStorage.setItem(currentUser.username, JSON.stringify(userData))
}