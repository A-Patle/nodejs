const fs = require('fs');
console.log('First js file');

fs.writeFile('output.txt', 'writing file', (err) => {
  if (err) console.log('errorouccured');
  else console.log('file written succesfully');
});
