//core moudles
const fs = require('fs');
const path = require('path');
const rootPath = require('../utils/pathUtil');

const FavouriteDataPath = path.join(rootPath, 'data', 'favourites.json');

module.exports = class Favourite {
  static addToFavourite(homeId, callback) {
    Favourite.getFavourites((favourites) => {
      if (favourites.includes(homeId)) {
        callback('Home is already market Favourite');
      } else {
        favourites.push(homeId);
        fs.writeFile(FavouriteDataPath, JSON.stringify(favourites), callback);
      }
    });
  }

  static getFavourites(callback) {
    fs.readFile(FavouriteDataPath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }

  static deleteById(delHomeId, callback) {
    Favourite.getFavourites((HomeIds) => {
      const homeIds = HomeIds.filter((homeId) => homeId !== delHomeId);
      fs.writeFile(FavouriteDataPath, JSON.stringify(homeIds), callback);
    });
  }
};
