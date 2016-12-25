const moment = require('moment');

//var date = new Date();
var date = moment();
console.log(date.format('YYYY-MM-DDThh:mmA'));
console.log(date.add(100, 'year').subtract(9,'months'));
console.log(moment(moment().valueOf()).format()); //current timestamp formated

console.log(moment().valueOf());