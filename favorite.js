const BASE_URL = "https://lighthouse-user-api.herokuapp.com"
const INDEX_URL = BASE_URL + "/api/v1/users"


let userList = JSON.parse(localStorage.getItem("favorite"))

const userContainer = document.querySelector("#data-container")
const searchForm = document.querySelector("#search-form")
const searchInput = document.querySelector("#search-input")
const searchBtn = document.querySelector("#search-btn")

function showUser(data) {
  let rawHTML =''
  data.forEach((item) => {
    rawHTML += `
      <div class="col-sm-2">
      <div class="mb-2">
        <div class="card">
          <img src="${item.avatar}" class="card-img-top" data-toggle="modal" data-target="#userModal" data-id="${item.id}" alt="user poster">
          <p class="card-title text-center ">${item.name}</p>
          <button type="button" class="btn btn-danger" id="remove-favorite" data-id="${item.id}">x</button>
        </div>
      </div>
    </div>
  `
  })
  userContainer.innerHTML = rawHTML
}

function showUserModal(id) {
  const userTitle = document.querySelector("#user-title")
  const userImage = document.querySelector("#user-modal-image")
  const userBd = document.querySelector("#user-modal-bd")
  const userAge = document.querySelector("#user-modal-age")
  const userMail = document.querySelector("#user-mail")

  axios.get(INDEX_URL + '/' + id).then(response => {
    const data = response.data
    userTitle.innerText = `${data.name} ${data.surname}`
    userBd.innerText = 'Birthday: ' + data.birthday
    userAge.innerText = 'Age: ' + data.age
    userMail.innerHTML =`<a id="user-mail" href="mailto:${data.email}"><i class="fas fa-envelope"></i></a>`
    userImage.innerHTML = `<img src="${data.avatar}"  alt="movieposter">`

  })
}

function removeFavorite(id) {
  if (!userList || !userList.length) return
  const userIndex = userList.findIndex((user) => user.id === id)
  if (userIndex === -1) return
  
  userList.splice(userIndex, 1)

  localStorage.setItem("favorite", JSON.stringify(userList))
  showUser(userList)

}

userContainer.addEventListener("click", function onPanelClick(event) {
  if (event.target.matches(".card-img-top")) {
    showUserModal(Number(event.target.dataset.id))
  } else if (event.target.matches("#remove-favorite")) {
    removeFavorite(Number(event.target.dataset.id))
  }
    
})


showUser(userList)







