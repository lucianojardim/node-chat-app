// [{
//     id: 'ssldfkgsdfl',
//     name: 'Luciano',
//     room: 'The Office fans'
// }]

class Users {
  constructor () {
    this.users = [];
  }
  addUser (id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }
  removeUser (id) {
    var user = this.getUser(id);

    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    }

    return user;
  }
  getUser (id) {
    return this.users.filter((user) => user.id === id)[0]
  }
  getUserList (room) {
    var users = this.users.filter((user) => user.room === room);
    var namesArray = users.map((user) => user.name);

    return namesArray;
  }
}

module.exports = {Users};
// var users = [];

// var addUser = (id, name, room) => {
//     users.push({})
// }

// modules.export = {addUsers}

// class Person {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }

//     getUserDescription(){
//         return `${this.name} is ${this.age}`
//     }
// }

// var me = new Person('Luciano', 49);
// console.log(me.name, me.age);
// var description = me.getUserDescription();
// console.log(description);
