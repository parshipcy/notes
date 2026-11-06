class User {
    static id = 1;
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.id = User.id++;
    }

    static compareByAge(user1, user2) {
        return user1.age - user2.age;
    }
}

console.log(User.id)

const user1 = new User('Rakseh K', 30);
const user2 = new User('John Doe', 40);
const user3 = new User('Jane Doe', 20);

const users = [user1, user2, user3];
users.sort(User.compareByAge);

console.log(users)

// two static methods can call each other

// Math.random() is also a static method
// Object.hasOwn() -> static method
// user.hasOwnProperty() -> instance/prototype method