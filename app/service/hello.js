const hello = {
  id: 1,
  content: 'world'
}

const getHello = () => {
  console.log(hello)
  return new Promise(resolve => {
    resolve(hello);
  });
};

module.exports = {
  getHello
};
