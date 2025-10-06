//core moudles
const fs = require('fs');
const path = require('path');
const rootPath = require('../utils/pathUtil');

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
      registeredHouse.push(this);
      const homeDataPath = path.join(rootPath, 'data', 'homes.json');
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
    const homeDataPath = path.join(rootPath, 'data', 'homes.json');
    fs.readFile(homeDataPath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }
};
