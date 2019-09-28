
import './css/style.scss'

let username: string = 'Alex'

class Dog{
    name: string;
    age: number;
    eat(){
        console.log('im eating')
    }
}
let d = new Dog()
d.eat()
console.log(username)
