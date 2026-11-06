### 1. Constructor function vs Class

Before `class` existed, JavaScript commonly used **constructor functions**:

```js
function BankAccount(customerName, balance = 0) {
    this.customerName = customerName;
    this.balance = balance;
}

BankAccount.prototype.deposit = function(amount) {
    this.balance += amount;
};

const account = new BankAccount("Rakesh", 1000);
```

Then JavaScript introduced `class`:

```js
class BankAccount {
    constructor(customerName, balance = 0) {
        this.customerName = customerName;
        this.balance = balance;
    }

    deposit(amount) {
        this.balance += amount;
    }
}
```

They both let you do:

```js
const account = new BankAccount("Rakesh", 1000);
```

### 2. So what does "syntactic sugar" mean?

**Syntactic sugar = easier/cleaner syntax for something that could already be done another way.**

Classes provide a much cleaner way to write the same kind of object-oriented code that JavaScript previously handled with constructor functions + prototypes.

Instead of:

```js
function BankAccount(...) {
    ...
}

BankAccount.prototype.deposit = function(...) {
    ...
};
```

you can write:

```js
class BankAccount {
    constructor(...) {
        ...
    }

    deposit(...) {
        ...
    }
}
```

Much easier to read.

### 3. Why use classes if constructor functions already existed?

Because classes make **object-oriented JavaScript much easier to write and understand**.

They give you a clear structure:

```js
class BankAccount {

    constructor() {
        // initialize object
    }

    deposit() {
        // behavior
    }

    withdraw() {
        // behavior
    }
}
```

And they make things like **inheritance** much cleaner:

```js
class SavingsAccount extends BankAccount {
    // ...
}
```

### 4. One important correction

Classes are often called "syntactic sugar," but they are **not literally identical** to constructor functions internally. JavaScript classes have some different semantics and restrictions.

For a beginner, though, remember:

> **Constructor functions + prototypes were the older way. Classes provide a cleaner, more convenient syntax for creating objects and working with prototypes/inheritance.**

### 5. Hoisting

Your understanding is correct:

```js
hello(); // works

function hello() {
    console.log("Hello");
}
```

But:

```js
const account = new BankAccount("Rakesh"); // ❌

class BankAccount {
    // ...
}
```

doesn't work because **class declarations are not usable before their declaration**.

So the beginner rule is:

> **Function declarations can be called before their definition. Classes cannot be used before their declaration.**


---

Exactly. That's the idea.

With a **constructor function**, you typically write the prototype methods separately:

```js
function BankAccount(name) {
    this.name = name;
}

BankAccount.prototype.deposit = function () {
    // ...
};
```

With a **class**, you just write the method inside the class:

```js
class BankAccount {
    constructor(name) {
        this.name = name;
    }

    deposit() {
        // ...
    }
}
```

But **JavaScript still puts `deposit()` on `BankAccount.prototype` behind the scenes**.

Underneath:

```text
account
   ↓
BankAccount.prototype
   ↓
Object.prototype
   ↓
null
```

So your understanding is correct:

> **With constructor functions, we manually work with `.prototype`. With classes, JavaScript handles that syntax for us.**
