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
    let teamData = getData()
})

let getData = () => {
    let URL = "js/teamData.json"
    fetch(URL)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            let teamDat = document.querySelector(".teamData")
            // teamDat.innerHTML = "<h4>" + data["name"] + "</h4>"
            data["clubs"].forEach(club => {
                let bkCol = `#e2b7${Math.random().toString(16).substring(2, 4)}`
                teamDat.innerHTML += `
                 <div class="col-xl-3 text-center mt-3">
                    <div class="card" style="width: 18rem; background: ${bkCol};">
                        <div class="card-body">
                            <h5 class="card-title">${club.name}</h5>
                            <h6 class="card-subtitle mb-2 text-body-secondary">${club.code}</h6>
                            <p class="card-text">This team plays for ${club.country}.</p>
                            <a class="btn btn-info" data-name="${club.name}" data-code="${club.code}" onclick="addToFav(event)" >Add to Favourites</a>
                        </div>
                    </div>
                </div>
                `
                // a = a + sum
                // a += sum
            })
        })
        .catch(() => {
            console.error("cry for help")
        })
}

let addToFav = (event) => {
    let currentUser = JSON.parse(sessionStorage.getItem("currentUser"))
    let userData = JSON.parse(localStorage.getItem(currentUser.username))
    if (!userData.favourites)
        userData.favourites = []
    let team = {
        code: event.target.getAttribute("data-code"),
        name: event.target.getAttribute("data-name")
    }
    let found = false
    if (userData.favourites.length > 0)
        userData.favourites.forEach(fav => {
            if (fav.code == team.code)
                found = true
        })
    if (!found) {
        userData.favourites.push(team)
        localStorage.setItem(currentUser.username, JSON.stringify(userData))
    }
}