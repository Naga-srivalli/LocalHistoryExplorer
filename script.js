const map = L.map('map', {
  minZoom: 4,
  maxZoom: 25,
  maxBounds: [[6, 67], [37, 97]],
  maxBoundsViscosity: 1.0
}).setView([22.5, 78], 5);

// Modern map tiles
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; OpenStreetMap & CartoDB',
  subdomains: 'abcd'
}).addTo(map);

// Optional: scale control
L.control.scale().addTo(map);

// Custom marker icon
const customIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/854/854878.png',
  iconSize: [30, 30],
  iconAnchor: [15, 30]
});

// Fetch cities from cities.json (since you're using GitHub Pages)
fetch('cities.json')
  .then(response => response.json())
  .then(cities => {
    cities.forEach(city => {
      const marker = L.marker([city.lat, city.lng], { icon: customIcon }).addTo(map);

      marker.on('click', () => {
        document.getElementById('city-name').textContent = city.name;
        document.getElementById('city-description').textContent = city.description;

        const img = document.getElementById('city-image');
        if (city.image) {
          img.src = city.image;
          img.alt = city.name + ' image';
          img.style.display = 'block';
        } else {
          img.style.display = 'none';
        }

        document.getElementById('city-info').classList.add('show');
      });
    });
  })
  .catch(error => console.error('Error loading cities.json:', error));
