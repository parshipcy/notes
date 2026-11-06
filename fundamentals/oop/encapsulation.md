## `BankAccount` + Private Fields + Getters/Setters

### 1. `#balance` is a **private field**

```js
#balance;
```

* Only `BankAccount` itself can directly access `#balance`.
* Even a child class like `SavingAccount` **cannot access it directly**.
* Outside code also cannot access it directly.

```js
rakeshAcc.#balance // ❌ Error
```

```js
console.log(this.#balance) // ❌ Error inside SavingAccount
```

Think of it as:

> `#balance` belongs to `BankAccount` and is completely hidden from outside and child classes.

---

### 2. But `SavingAccount` still inherits the methods

```js
class SavingAccount extends BankAccount
```

So `SavingAccount` gets:

```js
deposit()
withdraw()
get balance()
set balance()
```

However, it **doesn't get direct access to the private `#balance` field**.

---

### 3. `super()` calls the parent constructor

```js
constructor(customerName, balance = 0) {
    super(customerName, balance);
}
```

`super()` runs:

```js
BankAccount`'s constructor
```

So this happens:

```js
this.customerName = customerName;
this.accountNumber = Date.now();
this.#balance = balance;
```

The important point is that **BankAccount itself initializes its private field**.

---

### 4. Getter gives controlled access to `#balance`

```js
get balance() {
    return this.#balance;
}
```

Now you can do:

```js
console.log(rakeshAcc.balance);
```

You are **not directly accessing `#balance`**.

Instead:

```text
rakeshAcc.balance
       ↓
getter runs
       ↓
return this.#balance
```

---

### 5. Setter gives controlled modification

```js
set balance(amount) {
    if (isNaN(amount)) {
        throw new Error('Amount is not a valid input');
    }

    this.#balance = amount;
}
```

So:

```js
rakeshAcc.balance = 400;
```

actually means:

```text
rakeshAcc.balance = 400
        ↓
setter runs
        ↓
this.#balance = 400
```

The setter lets you **validate the value before changing the private field**.

---

### 6. `deposit()` and `withdraw()` also modify the private field

```js
deposit(amount) {
    this.#balance += amount;
}

withdraw(amount) {
    this.#balance -= amount;
}
```

These methods can access `#balance` because they are defined inside `BankAccount`.

---

## The main idea to remember

```text
#balance
   │
   │ private
   ↓
BankAccount
   │
   ├── deposit()
   ├── withdraw()
   ├── get balance()  → read #balance
   └── set balance()  → modify #balance
             ↑
             │
       SavingAccount
       can use getter/setter
       but cannot directly use #balance
```

### One-line rule

**Private field (`#balance`) = hidden data. Getter/setter = controlled way to read or modify that hidden data.**
