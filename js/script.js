// Sélectionnez le formulaire et l'input
const form = document.querySelector("form");
const input = document.querySelector("input");

// Créez une instance de la carte
var map = L.map("mapid").setView([48.8566, 2.3522], 13);

// Définissez le layer de la carte
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
}).addTo(map);

// Créez un marqueur avec une position par défaut
var marker = L.marker([48.8566, 2.3522]).addTo(map);

// Ajoutez un gestionnaire d'événements pour l'événement 'submit' du formulaire
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const ipAddress = input.value;

  // Si ipAddress est vide, définissez les coordonnées de Paris
  if (!ipAddress) {
    map.setView([48.8566, 2.3522], 13);
    marker.setLatLng([48.8566, 2.3522]);
  } else {
    // Faites la requête à l'API comme d'habitude
    fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_ODEBJCZAYNfTxfrueFh5NbTQvmW8O&ipAddress=${ipAddress}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Affichez l'objet data dans la console

        // Vérifiez que data.location existe avant d'y accéder
        if (data.location) {
          document.querySelector("#ip-address").textContent = data.ip;
          document.querySelector(
            "#location"
          ).textContent = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
          document.querySelector(
            "#timezone"
          ).textContent = `UTC ${data.location.timezone}`;
          document.querySelector("#isp").textContent = data.isp;

          // Mettez à jour la vue de la carte et la position du marqueur
          map.setView([data.location.lat, data.location.lng], 13);
          marker.setLatLng([data.location.lat, data.location.lng]);
        } else {
          console.error("Erreur: data.location est undefined");
        }
      })
      .catch((error) => console.error("Erreur:", error));
  }
});
