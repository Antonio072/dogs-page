
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err))
    })
}


const container = document.querySelector(".container")

async function getDogAsync() {
    let response = await fetch('https://dog.ceo/api/breeds/image/random?');
    let data = await response.json()
    return data;
}
function getDogs(quantity) {
    let output = ""
    for (let index = 0; index < quantity; index++) {
        getDogAsync()
            .then(data => {
                let breedIndex = data.message.indexOf("breeds/", 0)
                let breedURL = data.message.slice(breedIndex + 7, 100)
                let nextSlash = breedURL.indexOf("/", 0);
                let breed = breedURL.slice(0, nextSlash)

                dog = {
                    url: data.message,
                    breed: breed
                }
                output += `
                              <div class="card">
                                <img class="card--avatar" loading="lazy" src=${dog.url} />
                                <h1 class="card--title">${dog.breed}</h1>
                                <a class="card--link" href="#">See</a>
                              </div>
                              `
                container.innerHTML = output
            }
            );
    }
}

this.getDogs(9)
