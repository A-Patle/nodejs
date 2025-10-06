const { getDb } = require('../utils/databaseUtil');

module.exports = class Favourite {
  constructor(homeId) {
    this.homeId = homeId;
  }

  save() {
    const db = getDb();
    return db.collection('favourites').findOne({ homeId: this.homeId }).then(existingFav => {
      if (!existingFav) {
        return db.collection('favourites').insertOne(this);
      }
      return Promise.resolve('Home is already marked as Favourite');
    });
  }

  static getFavourites() {
    const db = getDb();
    return db.collection('favourites').find().toArray();
  }

  static deleteById(delHomeId) {
    const db = getDb();
    return db.collection('favourites').deleteOne({ homeId: delHomeId });
  }
};
