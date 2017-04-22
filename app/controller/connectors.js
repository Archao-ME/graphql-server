const _ = require('lodash');

const tags = [
  {id:1, label:'guangzhou', type:'city'},
  {id:2, label:'chaozhou', type:'city'},
  {id:3, label:'hanzhou', type:'city'},
  {id:4, label:'pazhou', type:'city'},
  {id:5, label:'feihong', type:'people'},
  {id:6, label:'jige', type:'people'},
  {id:7, label:'xiaobai', type:'people'},
  {id:8, label:'blue', type:'other'},
  {id:9, label:'eat', type:'other'}
];

const attributes = [
  {name:'eat', person:'feihong', strength:'1'},
  {name:'sleep', person:'feihong', strength:'1'},
  {name:'game', person:'feihong', strength:'1'},
  {name:'code', person:'xiaobai', strength:'7'},
  {name:'game', person:'xiaobai', strength:'7'},
  {name:'read', person:'jige', strength:'6'},
  {name:'watch', person:'jige', strength:'6'},
]

const foods = [
  {name:'广式糯米鸡', city:'guangzhou', price:'10'},
  {name:'薄皮鲜虾饺', city:'guangzhou', price:'19'},
  {name:'云吞面', city:'guangzhou', price:'22'},
  {name:'肠粉', city:'guangzhou', price:'12'},
  {name:'生滚粥', city:'guangzhou', price:'0.5'},
  {name:'叉烧包', city:'guangzhou', price:'99'},
  {name:'金瓜芋泥', city:'chaozhou', price:'12'},
  {name:'鸭母捻', city:'chaozhou', price:'65'},
  {name:'知味小笼', city:'hanzhou', price:'11'},
  {name:'西施舌', city:'hanzhou', price:'25'},
  {name:'干炸响铃', city:'hanzhou', price:'0.9'},
  {name:'pazhou is not a city', city:'pazhou', price:'0'},
  {name:'pazhou is not a city', city:'pazhou', price:'0'},
]

module.exports = {
  getManyQuery(){
    return new Promise(resolve => {
      const tpage = [];
      tpage.push({tags:_.filter(tags, tag => tag.type === 'city'), hasMore:false});
      tpage.push({tags:_.filter(tags, tag => tag.type === 'peopel'), hasMore:false});
      resolve({tpage:tpage});
    })
  },
  getAllTags(){
    return new Promise(resolve => {
       resolve(tags);
    })
  },
  getTags(type) {
    return new Promise(resolve => {
        resolve(_.filter(tags, tag => tag.type === type))
    })
  },
  getTagsById(id) {
    return new Promise(resolve => {
        resolve(_.filter(tags, tag => tag.id === id))
    })
  },
  searchFood(city){
    return new Promise(resolve => {
        resolve(_.filter(foods, food => food.city === city))
    })
  },
  getattribute(person){
    return new Promise(resolve => {
        resolve(_.filter(attributes, attribute => attribute.person === person))
    })
  },
  getTagsPage(page, pageSize) {
    const start = page * pageSize;
    const end = start + pageSize;
    return {
      tags: tags.slice(start, end),
      hasMore: end < tags.length,
    };
  },
  getRandomTag() {
    return tags[Math.round(Math.random()*(tags.length - 1))];
  },
  getLastTag() {
    return tags[tags.length - 1];
  },
  addTag(type, label) {
    return new Promise(resolve => {
      let t = {
        id: tags.length + 1,
        label,
        type,
      };
      tags.push(t);
      resolve(t);
    });
  },
  changetagname(name){
    tags[0].label = name+'FromSer';
    console.log(tags[0]);
    return tags[0];
  }
};
