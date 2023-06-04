const db = require('../firebase-config');

class DataCollectionModel {
  constructor(name) {
    this.collectionName = name; // Name of the Firestore collection
    this.collectionRef = db.collection(this.collectionName);
  }

  // Get all viewport data from the collection
  getAllViewportData() {
    return this.collectionRef
      .get()
      .then(snapshot => snapshot.docs.map(doc => doc.data()));
  }

  // Add new viewport data to the collection
  addViewportData(data) {
    return this.collectionRef.add(data);
  }
}

module.exports = DataCollectionModel;
