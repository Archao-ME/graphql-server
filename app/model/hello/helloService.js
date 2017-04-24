const hello = {
  id: 1,
  content: 'world'
}

const getHello = () => {
  return new Promise(resolve => {
    resolve(hello)
  })
}

const changeWorld = (content) => {
  return new Promise(resolve => {
    resolve({
      id: 123,
      content
    })
  })
}

module.exports = {
  getHello,
  changeWorld
}
