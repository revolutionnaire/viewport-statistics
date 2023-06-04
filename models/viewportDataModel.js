const db = require('../firebase-config');

class ViewportDataModel {
  constructor(width, height, deviceType) {
    this.width = width;
    this.height = height;
    this.deviceType = deviceType;
  }

  // Custom method to convert instance to plain object
  toObject() {
    return {
      width: this.width,
      height: this.height,
      deviceType: this.deviceType,
    };
  }

  // Save the data to Firestore
  save(data) {
    return db.collection('viewportData').add(data);
  }
}

module.exports = ViewportDataModel;

