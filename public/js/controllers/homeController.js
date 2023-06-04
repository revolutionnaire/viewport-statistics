// Capture viewport data
document.addEventListener('DOMContentLoaded', function() {
  const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

  // Make a POST request to capture the viewport data
  fetch('/capture', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `width=${width}&height=${height}`
  })
    .then(response => response.text())
    .then(data => {
      document.getElementById('viewportWidth').innerText = window.innerWidth;
      document.getElementById('viewportHeight').innerText = window.innerHeight;
      document.getElementById('screenWidth').innerText = screen.width;
      document.getElementById('screenHeight').innerText = screen.height;
      document.getElementById('notification').classList.add('hidden');
      document.getElementById('dataViewport').classList.remove('hidden');
      document.getElementById('networkResponse').innerText = data;
    })
    .catch(error => {
      console.error('Error capturing viewport data:', error);
      document.getElementById('networkResponse').innerText = "Failed to capture viewport data. Please, try again.";
    });
});
