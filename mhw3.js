const Client_id ="f9e9b46e672942829efcb14eb4c45927"
const Client_secret ="bb62f9bcadb74a1aa4472b7c1a34604b"



function OnJson(json){
    const view = document.querySelector('.movies');
    view.innerHTML='';
    const result =json.items;
    let num_results=result.length;
    if(num_results>5)
     num_results=5;
for(let i=0;i<num_results;i++){
    const data = result[i];
    const title = data.title;
    const image = data.image;
    const rank = "rank ="+ data.rank;
    const updown = UpDownResult(data.rankUpDown) + data.rankUpDown;
    const album= document.createElement('div');
    const img = document.createElement('img');
    img.src=image;
    const head = document.createElement('h1');
    head.textContent=title;
     const position = document.createElement('span');
     position.textContent=rank+" "+updown;
    album.appendChild(img);
    album.appendChild(head);
    album.appendChild(position);
    view.appendChild(album);
}
    console.log(result);




}

function UpDownResult(movement){
    if(movement.charAt(0)==="+"){
        return "↑";
    }else if(movement.charAt(0)==="0"){
    return "=";
    }else
    return "↓"
}

function Hide(){
    const box =document.querySelector('.movies');
    box.classList.add('hidden'); 
    button.addEventListener('click',Visualize);
}

function Visualize()
{
 const box =document.querySelector('.movies');
 box.classList.remove('hidden');  
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
   
  fetch('https://imdb-api.com/en/API/MostPopularMovies/k_2njo15g7', requestOptions)
    .then(response => response.json())
    .then(OnJson)
    .catch(error => console.log('error', error));    

button.removeEventListener('click',Visualize);
button.addEventListener('click',Hide);
}
button=document.querySelector('button');
button.addEventListener('click',Visualize);
////////
function onTokenJson(json)
{
  // Imposta il token global
  token = json.access_token;
  console.log(json);
}

function onTokenResponse(response)
{
  return response.json();
}


























function onJson(json) {
  console.log(json);
  // Svuotiamo la libreria
  const library = document.querySelector('#artists-view');
  library.innerHTML = '';
  // Leggi il numero di risultati
  const results = json.artists.items;
  let num_results = results.length;
  // Mostriamone al massimo 10
  if(num_results > 10)
    num_results = 10;
  // Processa ciascun risultato
  for(let i=0; i<num_results; i++)
  {
    // Leggi il documento
    const artists_data = results[i]
    // Leggiamo info
    const title = artists_data.name;
    const selected_image = artists_data.images[0].url;
    // Creiamo il div che conterrà immagine e didascalia
    const artist = document.createElement('div');
    // Creiamo l'immagine
    const img = document.createElement('img');
    img.src = selected_image;
    const caption = document.createElement('span');
    caption.textContent = title;
    artist.appendChild(img);
    artist.appendChild(caption);
    library.appendChild(artist);
  }
}

function onResponse(response) {
  console.log('Risposta ricevuta');
  return response.json();
}

function search(event)
{
  // Impedisci il submit del form
  event.preventDefault();
  // Leggi valore del campo di testo
  const artist_input = document.querySelector('#artist');
  const artist_value = encodeURIComponent(artist_input.value);
  console.log('Eseguo ricerca: ' + artist_value);
  // Esegui la richiesta
  fetch("https://api.spotify.com/v1/search?type=artist&q=" + artist_value,
    {
      headers:
      {
        'Authorization': 'Bearer ' + token
      }
    }
  ).then(onResponse).then(onJson);
}

function onTokenJson(json)
{
  // Imposta il token global
  token = json.access_token;
  console.log(json);
}

function onTokenResponse(response)
{
  return response.json();
}


let token;
// All'apertura della pagina, richiediamo il token
fetch("https://accounts.spotify.com/api/token",
	{
   method: "post",
   body: 'grant_type=client_credentials',
   headers:
   {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(Client_id + ':' + Client_secret)
   }
  }
).then(onTokenResponse).then(onTokenJson);
// Aggiungi event listener al form
const form = document.querySelector('form');
form.addEventListener('submit', search);