const hello = {
  id: 1,
  content: 'world'
}

const getHello = () => {
  return new Promise(resolve => {
    resolve(hello);
  });
};

module.exports = {
  getHello
};
