const express = require('express');
const admin = require('firebase-admin');
const path = require('path');
const cookieParser = require('cookie-parser');

// Initialize Express.js
const app = express();

// Configure Firebase Admin SDK
const serviceAccount = require('./firebase-credentials.json'); admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Set the views directory
app.set('views', `${__dirname}/views`);

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Use the public folder to store assets
app.use(express.static('public'));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body parsing middleware
app.use(express.urlencoded({ extended: true }));

// Cooking parsing middleware
app.use(cookieParser());

// Firestore setup
const db = admin.firestore();
const viewportDataCollection = db.collection('viewportData');

app.get('/', (req, res) => {
  const pageTitle = 'Home';
  res.render('home', { pageTitle });
});

// Capture viewport data
app.post('/capture', (req, res) => {
  const { width, height } = req.body;
  const userAgent = req.headers['user-agent'];
  const deviceType = getDeviceType(userAgent);

	if (!req.cookies.viewportDataSaved) {

    const data = {
      width: parseInt(width),
      height: parseInt(height),
      deviceType,
      timestamp: new Date()
    };

    viewportDataCollection
      .add(data)
      .then(() => {
        console.log('Viewport data captured and stored successfully');

        const time = new Date();
        const cookieExpiration = time.getTime() + (10 * 365 * 24 * 60 * 60 * 1000);

        res.cookie('viewportDataSaved', 'true', {
          expires: new Date(cookieExpiration),
          httpOnly: false
        });

        res.send('Viewport data captured.');
      })
      .catch(error => {
        console.error('Error storing viewport data:', error);
        res.status(500).send('Internal Server Error');
      });

  } else {
    res.send('Viewport data already stored in database.');
  }

});

// Calculate average viewport data
app.get('/statistics', (req, res) => {
  const pageTitle = 'Statistics';

  viewportDataCollection
    .get()
    .then(querySnapshot => {
      const viewportData = querySnapshot.docs.map(doc => doc.data());
      const averageViewport = calculateAverageViewport(viewportData);
      res.render('statistics', { averageViewport, pageTitle });
    })
    .catch(error => {
      console.error('Error retrieving viewport data:', error);
      res.status(500).send('Internal Server Error');
    });
});

// Get device type from user agent
function getDeviceType(userAgent) {
  const mobileKeywords = ['mobile', 'android', 'iphone', 'ipad'];
  const lowercaseUserAgent = userAgent.toLowerCase();

  if (mobileKeywords.some(keyword => lowercaseUserAgent.includes(keyword))) {
    return 'Mobile';
  } else {
    return 'Desktop';
  }
}

// Calculate average viewport for desktop and mobile separately
function calculateAverageViewport(data) {
  const desktopData = data.filter(item => item.deviceType === 'Desktop');
  const mobileData = data.filter(item => item.deviceType === 'Mobile');

  const desktopCount = desktopData.length;
  const mobileCount = mobileData.length;

  const totalDesktopWidth = desktopData.reduce((sum, item) => sum + item.width, 0);
  const totalDesktopHeight = desktopData.reduce((sum, item) => sum + item.height, 0);
  const totalMobileWidth = mobileData.reduce((sum, item) => sum + item.width, 0);
  const totalMobileHeight = mobileData.reduce((sum, item) => sum + item.height, 0);

  const averageDesktopWidth = desktopCount > 0 ? totalDesktopWidth / desktopCount : 0;
  const averageDesktopHeight = desktopCount > 0 ? totalDesktopHeight / desktopCount : 0;
  const averageMobileWidth = mobileCount > 0 ? totalMobileWidth / mobileCount : 0;
  const averageMobileHeight = mobileCount > 0 ? totalMobileHeight / mobileCount : 0;

  return {
    desktop: {
      size: `${Math.round(averageDesktopWidth)}x${Math.round(averageDesktopHeight)}`,
      count: desktopCount,
    },
    mobile: {
      size: `${Math.round(averageMobileWidth)}x${Math.round(averageMobileHeight)}`,
      count: mobileCount
    }

  };
}

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
