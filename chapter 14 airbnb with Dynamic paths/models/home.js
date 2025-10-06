//core moudles
const fs = require('fs');
const path = require('path');
const rootPath = require('../utils/pathUtil');
const Favourite = require('./favourite');

const homeDataPath = path.join(rootPath, 'data', 'homes.json');

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }
  save() {
    Home.fetchAll((registeredHouse) => {
      if (this.id) {
        // edit home mode
        registeredHouse = registeredHouse.map((home) =>
          home.id === this.id ? this : home
        );
      } else {
        // add home mode
        this.id = (registeredHouse.length + 1).toString();
        registeredHouse.push(this);
      }
      fs.writeFile(homeDataPath, JSON.stringify(registeredHouse), (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Home data saved successfully!');
        }
      });
    });
  }

  static fetchAll(callback) {
    fs.readFile(homeDataPath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }

  static findById(id, callback) {
    Home.fetchAll((homes) => {
      const home = homes.find((home) => home.id === id);
      callback(home);
    });
  }

  static deleteById(id, callback) {
    Home.fetchAll((homes) => {
      const home = homes.filter((home) => home.id !== id);
      fs.writeFile(homeDataPath, JSON.stringify(home), (error) => {
        Favourite.deleteById(id, callback);
      });
    });
  }
};
