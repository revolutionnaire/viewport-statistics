// Capture viewport data
function homeController() {
  const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

  // Make a POST request to save the viewport data
  fetch('/capture', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `width=${width}&height=${height}`
  })
    .then(response => response.text())
    .then(data => {
      document.getElementById('viewportWidth').innerText = width;
      document.getElementById('viewportHeight').innerText = height;
      document.getElementById('screenWidth').innerText = screen.width;
      document.getElementById('screenHeight').innerText = screen.height;
      document.getElementById('dataViewport').classList.remove('hidden');
      document.getElementById('dataResolution').classList.remove('hidden');
      document.getElementById('networkResponse').innerText = data;
    })
    .catch(error => {
      console.error('Error saving viewport data:', error);
      document.getElementById('networkResponse').innerText = "Failed to save viewport data. Please, try again.";
    });
}

document.addEventListener('DOMContentLoaded', homeController());
