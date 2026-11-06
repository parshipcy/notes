# JavaScript Inheritance

## 1. Inheritance

Inheritance means a child class/object can use properties and methods of a parent.

```text
BankAccount
    ↑
    ├── SavingAccount
    └── CurrentAccount
```

A `SavingAccount` is a `BankAccount` with some extra functionality.

---

## 2. Constructor Functions

Parent:

```js
function BankAccount(customerName, balance = 0) {
    this.customerName = customerName;
    this.accountNumber = Date.now();
    this.balance = balance;
}

BankAccount.prototype.deposit = function(amount) {
    this.balance += amount;
};
```

Child:

```js
function SavingAccount(customerName, balance = 0) {
    BankAccount.call(this, customerName, balance);
    this.transactionLimit = 10000;
}

SavingAccount.prototype = Object.create(BankAccount.prototype);

SavingAccount.prototype.takePersonalLoan = function(amount) {
    console.log(amount);
};
```

### Two important parts

**Get parent's properties:**

```js
BankAccount.call(this, customerName, balance);
```

This runs the parent constructor with the child's `this`.

**Get parent's methods:**

```js
SavingAccount.prototype = Object.create(BankAccount.prototype);
```

This creates the prototype chain:

```text
rakeshAcc
   ↓
SavingAccount.prototype
   ↓
BankAccount.prototype
   ↓
Object.prototype
   ↓
null
```

---

# 3. Classes

Modern syntax makes inheritance simpler:

```js
class BankAccount {
    constructor(customerName, balance = 0) {
        this.customerName = customerName;
        this.accountNumber = Date.now();
        this.balance = balance;
    }

    deposit(amount) {
        this.balance += amount;
    }

    withdraw(amount) {
        this.balance -= amount;
    }
}
```

Child:

```js
class SavingAccount extends BankAccount {
    transactionLimit = 10000;

    constructor(customerName, balance = 0) {
        super(customerName, balance);
    }

    takePersonalLoan(amount) {
        console.log(amount);
    }
}
```

### Important mapping

| Constructor Functions                  | Classes               |
| -------------------------------------- | --------------------- |
| `BankAccount.call(this, ...)`          | `super(...)`          |
| `Object.create(BankAccount.prototype)` | `extends BankAccount` |
| `prototype.method = function(){}`      | `method(){}`          |

So:

```js
BankAccount.call(this, customerName, balance);
```

is roughly equivalent to:

```js
super(customerName, balance);
```

And:

```js
SavingAccount.prototype = Object.create(BankAccount.prototype);
```

is roughly handled by:

```js
class SavingAccount extends BankAccount
```

---

# 4. `super()`

```js
constructor(customerName, balance = 0) {
    super(customerName, balance);
}
```

`super()` calls the **parent constructor**.

It initializes:

```js
this.customerName
this.accountNumber
this.balance
```

Without `super()` in a derived class constructor, you cannot use `this`.

---

# 5. Instance Field vs Prototype Method

### Instance field

```js
takePersonalLoan = function(amount) {
    console.log(amount);
}
```

The function is created separately for every instance.

```text
rakeshAcc
└── takePersonalLoan()

anotherAcc
└── takePersonalLoan()
```

### Prototype method

```js
takePersonalLoan(amount) {
    console.log(amount);
}
```

The function lives on `SavingAccount.prototype` and is shared.

```text
rakeshAcc ──┐
            ├──> SavingAccount.prototype
anotherAcc ─┘          │
                       └── takePersonalLoan()
```

For normal class methods, prefer:

```js
takePersonalLoan(amount) {
    // ...
}
```

---

# 6. Final Mental Model

When:

```js
const rakeshAcc = new SavingAccount("Rakesh K", 500);
```

you can think:

```text
rakeshAcc
│
├── customerName
├── accountNumber
├── balance
└── transactionLimit
       │
       ↓
SavingAccount.prototype
       │
       └── takePersonalLoan()
       │
       ↓
BankAccount.prototype
       │
       ├── deposit()
       └── withdraw()
```

**Core idea:**

* `super()` → initialize parent properties
* `extends` → establish inheritance
* `prototype` → where shared methods live
* instance field → property/function belonging directly to each object
* prototype method → shared method inherited by instances
