const API = "https://pokeapi.co/api/v2/pokemon?limit=50&offset=00/";

const getApi = (api) => {
  return fetch(api)
    .then((response) => response.json())
    .then((json) => {
      fillData(json.results),pagination(json);
    })
    .catch((error) => {
      console.log("Error in the API: ", error);
    });
};

const fillData = (data) => {
  let html = "";
  let i = 0;
  data.forEach((ch) => {
    let url = ch.url;
      fetch(url)
      .then((response) => response.json())
      .then((json) => {
        i++;
        html += '<div class="col">';
        html += '<div class="card h-100 bg-warning card cardHover">';
        html += ' <div class="card-body">';
        html += `<h5 class="card-title">Nombre: ${ch.name}</h5>`;
        html += `<img src="${json.sprites.other.dream_world.front_default}" class="card-img-top" alt="...">`;
        html += `<h5 class="card-title">Peso: ${json.weight}</h5>`;
        html += `<h5 class="card-title">Altura: ${json.height}</h5>`;
        html += "</div>";
        html += "</div>";
        html += "</div>";
        document.getElementById("characters").innerHTML = html;
      })
      .catch((error) => {
        console.log("Error in the API: ", error);
      });
  });
};
const pagination =(nextInfo) =>{
  let html = "";

  html += `<li class = "page-item ${nextInfo.previous == null ? "disabled" : ""}"> <a class="page-link " onclick="getApi('${nextInfo.previous}')"> Prev</a></li>`;
  html += `<li class = "page-item ${nextInfo.next == null ? "disabled" : ""} "> <a class="page-link" onclick="getApi('${nextInfo.next}')"> Next</a></li>`;
  document.getElementById("pagination").innerHTML = html;
};

getApi(API);
