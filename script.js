const apikey = "921158c6";
const searchInput = document.getElementById("search");
const movieSee = document.getElementById("form");
const display = document.getElementById("display");
const modalDisplay = document.getElementById("modal");

// ************ Search movie ***************

movieSee.addEventListener("submit", (e) => {
  e.preventDefault();
  display.innerHTML = "";

  fetch(`http://www.omdbapi.com/?apikey=${apikey}&s=${searchInput.value}`)
    .then((response) => response.json())
    .then((response) => {
      for (let movie of response.Search) {
        displayMovie(movie);
      }
    })
    .then(() => {
      let items = document.querySelectorAll(".card");
      items.forEach(function (item) {
        item.classList.add("not-visible");
        observer.observe(item);
      });
    })
    .catch((error) => console.log(error));
});

// ************** Display movie ************

const displayMovie = (response) => {
  display.innerHTML += `
  <div class="card">
  <div class="card-body">
    <div class="float-start px-5"> <img src="${response.Poster}" /> </div>
    <div>
      <h2>Titre: ${response.Title}</h1>
      <h4>Date de sortie: ${response.Year}</h4>
    </div> 
    <button 
    type="button"
    class="btn btn-primary"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    class="read-more"
    onClick="test('${response.imdbID}')"  >
    Info
  </button>   
  </div>
</div>
`;
};

function test(imdbID) {
  console.log(imdbID);
  fetch(`http://www.omdbapi.com/?apikey=${apikey}&i=${imdbID}`)
    .then((response) => response.json())
    .then((response) => {
      displayModal(response);
    });
}

// *********** Display Read More ***********

const displayModal = (response) => {
  let modal = document.getElementById("modal");
  let modalbg = document.getElementById("modal-bg");

  console.log(modal);
  modal.innerHTML = `
        <h5 class="modal-title" id="exampleModalLabel">Titre: ${response.Title}</h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick="CloseModal()"
        ></button>
        <div class="float-start px-5"> <img src="${response.Poster}" /> </div>
        <div>
          <p class="px-5">Date de sortie: ${response.Year}</p>
          <p class="px-5">Synopsis: ${response.Plot}</p>
        </div>
       
`;
  modal.classList.remove("hidden");
  modalbg.classList.remove("hidden");
};

function CloseModal() {
  let modal = document.getElementById("modal");
  let modalbg = document.getElementById("modal-bg");

  modal.classList.add("hidden");
  modalbg.classList.add("hidden");

  console.log(modal);
}

// ********** Scroll *********
let observer = new IntersectionObserver(
  function (observables) {
    observables.forEach(function (observable) {
      if (observable.intersectionRatio > 0) {
        observable.target.classList.remove("not-visible");
        console.log("Item visible");
      } else {
        observable.target.classList.add("not-visible");
      }
    });
  },
  {
    threshold: [0, 0],
  }
);
