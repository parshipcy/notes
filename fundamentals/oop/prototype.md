In the previous lesson, every account got its **own copy** of `deposit` and `withdraw`. That works, but it wastes memory when you create thousands of accounts.

This lesson introduces **prototypes** - the way JavaScript shares methods across all instances.

---

# 1: The memory problem

Your constructor from before looked like this:

```js
function BankAccount(customerName, balance = 0) {
  this.customerName = customerName;
  this.accountNumber = Date.now();
  this.balance = balance;

  this.deposit = function (amount) {
    this.balance += amount;
  };

  this.withdraw = (amount) => {
    this.balance -= amount;
  };
}
```

Imagine you create 3 accounts:

```js
const a1 = new BankAccount("Rakesh");
const a2 = new BankAccount("John");
const a3 = new BankAccount("Sara");
```

**Inside the constructor:** each account gets its own copy of `deposit`.

→ 3 accounts = 3 separate `deposit` functions in memory.

**On the prototype:** there is one `deposit` on `BankAccount.prototype`.

→ All 3 accounts share that same function.

Both approaches work. Prototype methods are just more memory-efficient.

---

# 2: Move methods to the prototype

Comment out `deposit` and `withdraw` inside the constructor so we can define them on the prototype instead:

```js
function BankAccount(customerName, balance = 0) {
  this.customerName = customerName;
  this.accountNumber = Date.now();
  this.balance = balance;

  // this.deposit = function (amount) { ... };
  // this.withdraw = (amount) => { ... };
}
```

Then attach the shared method to the prototype:

```js
BankAccount.prototype.deposit = function (amount) {
  this.balance += amount;
};

const rakeshAccount = new BankAccount("Rakesh");
rakeshAccount.deposit(1000);
```

Here:

- `deposit` is a **method** - a function attached to an object (via prototype)
- You call it on the object: `rakeshAccount.deposit(1000)`

---

# 3: Blueprint vs instance

```
BankAccount        = the blueprint / constructor (the "class" idea)
rakeshAccount      = one instance - an actual account object
```

An **instance** is a specific object made with `new`.

---

# 4: What is `prototype` on a function?

Every function in JavaScript automatically gets a special property called `prototype`.

It is usually an empty object `{}` at first.

We can attach shared methods and properties to it, and every instance created with `new` will be able to use them.

```js
BankAccount.prototype.deposit = function (amount) { ... };
//            ↑
//    shared by ALL BankAccount instances
```

---

# 5: Why not arrow functions in the constructor?

```js
this.withdraw = (amount) => {
  this.balance -= amount;
};
```

Arrow functions do **not** have their own `this`.

Inside a constructor, `this` must point to the new object being created.

An arrow function would look up `this` from the outer scope (often the `window` object in browsers), so it would **not** update the account's balance correctly.

Use a regular `function` for instance methods inside a constructor.

---

# 6: Prototype chaining

When you access a property on an object (like `rakeshAccount.deposit`), JavaScript first looks on the object itself.

If it is not found, JavaScript follows the hidden link `[[Prototype]]` (exposed as `__proto__`) to the constructor's `prototype` object.

If still not found, it keeps going up the chain until it reaches `null`.

### Example chain for `rakeshAccount.deposit`

```
rakeshAccount  →  BankAccount.prototype  →  Object.prototype  →  null
```

That is why `rakeshAccount.deposit(1000)` works even though `deposit` is not defined inside the constructor - JS finds it on the prototype.

When you call `rakeshAccount.deposit(1000)`, JS searches like this:

1. Is `deposit` on `rakeshAccount`? → No (it was commented out in constructor)
2. Is `deposit` on `BankAccount.prototype`? → Yes ✅

---

# 7: Built-in constructors use the same idea

Just like `BankAccount` is our custom constructor, JavaScript has built-in ones:

| Constructor | Creates   | Shared methods live on          |
| ----------- | --------- | ------------------------------- |
| `Array`     | arrays    | `Array.prototype` (`.push()`, `.map()`, …) |
| `Object`    | objects   | `Object.prototype` (`.toString()`, …)      |

So when you write `[1, 2, 3].push(4)`, JS uses the same prototype idea: the array instance looks up `.push` on `Array.prototype`.

---

# 8: Can you call `BankAccount.deposit(1000)` directly?

No. `BankAccount.deposit` does not exist unless you assign it yourself.

`BankAccount` is just a function. The `deposit` method lives on `BankAccount.prototype`, not on `BankAccount` itself.

| Expression                      | Valid? | Why                                      |
| ------------------------------- | ------ | ---------------------------------------- |
| `BankAccount.prototype.deposit` | ✅     | define the shared method here            |
| `rakeshAccount.deposit(1000)`   | ✅     | call on an instance (uses prototype chain) |
| `BankAccount.deposit(1000)`     | ❌     | `BankAccount` is not an account          |

You always call instance methods on an instance: `rakeshAccount.deposit(1000)`.

Inside the method, `this` becomes that instance.

---

# 9: What OOP concepts have you learned?

| Concept          | Meaning                                              | In your code                        |
| ---------------- | ---------------------------------------------------- | ----------------------------------- |
| Constructor      | Sets up each instance's own properties               | `this.customerName`, `this.balance` |
| Prototype        | Stores shared methods (one copy, all instances use it) | `BankAccount.prototype.deposit`     |
| Prototype chain  | How JS finds a method when it is not on the object   | `rakeshAccount` → `BankAccount.prototype` |
| Instance         | A specific object created from the blueprint         | `rakeshAccount`                     |

---

## Key takeaway

```
Constructor     →  own data per instance  (customerName, balance, …)
Prototype       →  shared methods         (deposit, withdraw, …)
Prototype chain →  how JS looks up methods when they are not on the object itself
```

---

The **last prototype you're seeing there is `Object.prototype`**, not String, Array, etc.

In your example:

```text
SavingAccount object
        ↓
SavingAccount.prototype
        ↓
Object.prototype
        ↓
null
```

### So whose properties are these?

Things like:

```text
toString()
valueOf()
hasOwnProperty()
isPrototypeOf()
propertyIsEnumerable()
```

belong to **`Object.prototype`**.

They are available to almost every normal JavaScript object because most objects eventually inherit from `Object.prototype`.

For example:

```js
const user = {};
```

The chain is:

```text
user
 ↓
Object.prototype
 ↓
null
```
