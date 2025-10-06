//syntax error
const testingSyntax = () => {
  // console.log('inside testing syntax');
};

//runtime error
const runtime = () => {
  // console.log(a);
  // let a = 10;
  // a();
};

//logical error
const logical = () => {
  let num = 5;
  if (num = 10) {
    console.log(num);
  } else {
    ('num is not 10');
  }
};

module.exports = { testingSyntax, runtime, logical };
