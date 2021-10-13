// ES6代码
const init = ()=>{
    console.log('es6代码')

    return {
        nav(){
            return 100;
        },
        goto(){
            return 200;
        }
    }
}

const username = 'laoxie'

// class Render{
//     constructor(){

//     }
//     render(){
//         return `
//             hello ${username}
//         `
//     }
// }

let html = `hello ${username}`;