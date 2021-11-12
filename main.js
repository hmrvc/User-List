const BASE_URL = "https://lighthouse-user-api.herokuapp.com"
const INDEX_URL = BASE_URL + "/api/v1/users"


let userList = []

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
          <button type="button" class="btn btn-success " id="add-favorite" data-id="${item.id}"><i class="fas fa-heart"></i></button>
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

function addToFavorite(id) {
  const list = JSON.parse(localStorage.getItem("favorite")) || []
  const user = userList.find((user) => user.id === id)
  if (list.some((user) => user.id === id)) {
    return alert('此用戶已被收藏')
  }
  list.push(user)
  console.log(list)

  
  localStorage.setItem("favorite", JSON.stringify(list))
}

userContainer.addEventListener("click", function onPanelClick(event) {
  if (event.target.matches(".card-img-top")) {
    showUserModal(Number(event.target.dataset.id))
  } else if (event.target.matches("#add-favorite")) {
    
    addToFavorite(Number(event.target.dataset.id))
  } else if (event.target.matches(".fa-heart")) {
    let parent = event.target.parentElement
    addToFavorite(Number(parent.dataset.id))
  }
  

  
})

searchForm.addEventListener("submit", function clickOnSearch(event) {
  event.preventDefault()
  let keyword = searchInput.value.trim().toLowerCase()
  if (!keyword.length) {
    return alert("請輸入搜尋字")
  }
  let filteredList = []
  filteredList = userList.filter((user) => user.name.toLowerCase().includes(keyword))
  if (filteredList.length === 0) {
    return alert("無符合條件的朋友")
  }
  showUser(filteredList)
})


axios.get(INDEX_URL).then((response) => {
  
  userList.push(...response.data.results)
  // console.log(userList)
  showUser(userList)

})


