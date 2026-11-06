Think of **OOP (Object-Oriented Programming)** as a way to organize code around **objects that contain data + functions that work on that data**.

### Simple example

Suppose you're building a banking app.

Without OOP, you might have:

```js
const userName = "Rahul";
let balance = 5000;

function deposit(amount) {
  balance += amount;
}
```

Now imagine you have **100 users**. Managing all their names, balances, and functions becomes messy.

With OOP:

```js
class BankAccount {
  constructor(name, balance) {
    this.name = name;
    this.balance = balance;
  }

  deposit(amount) {
    this.balance += amount;
  }
}

const user1 = new BankAccount("Rahul", 5000);
const user2 = new BankAccount("Amit", 3000);

user1.deposit(1000);

console.log(user1.balance); // 6000
console.log(user2.balance); // 3000
```

Here:

- `BankAccount` = **blueprint**
- `user1`, `user2` = **objects**
- `name`, `balance` = **data/properties**
- `deposit()` = **method**
- `this` = the current object

### When should you use OOP?

Use it when your program has **many similar entities with their own data and behavior**.

For example:

```text
Banking app
  → Users
  → Accounts
  → Transactions

Game
  → Players
  → Enemies
  → Weapons

E-commerce
  → Users
  → Products
  → Orders
```

OOP lets you model these things as objects.

---

In JavaScript, constructor functions and classes are two ways to create objects with similar structures and behaviours.
Classes were introduced in ES6 (2015). They provide cleaner syntax for JavaScript's existing prototype-based inheritance system.

### 1. Constructor Function
Before ES6, developers commonly used constructor functions to create multiple objects.
```js
function Person(name, age) {
    this.name = name;
    this.age = age;

    this.greet = function() {
        console.log("Hello " + this.name);
    };
}

const p1 = new Person("Rahul", 23);
const p2 = new Person("Amit", 25);

p1.greet(); // Hello Rahul
```

How does it work?
1. Person is a constructor function.
2. new Person() creates a new object.
3. this refers to that newly created object.
4. Properties are assigned to the new object.

### 2. Class
ES6 introduced the class keyword to provide a cleaner way to create objects.

```js
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        console.log("Hello " + this.name);
    }
}

const p1 = new Person("Rahul", 23);
const p2 = new Person("Amit", 25);

p1.greet(); // Hello Rahul
```

Here:
- class Person defines a class.
- constructor() initializes the object.
- new Person() creates an instance.
- this refers to the newly created object.
