"use strict";

// ES6代码
var init = function init() {
  console.log('es6代码');
  return {
    nav: function nav() {
      return 100;
    },
    "goto": function goto() {
      return 200;
    }
  };
};

var username = 'laoxie'; // class Render{
//     constructor(){
//     }
//     render(){
//         return `
//             hello ${username}
//         `
//     }
// }

var html = "hello ".concat(username);