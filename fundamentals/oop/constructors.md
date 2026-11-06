Think of this as your **first OOP class in JavaScript**. Forget the code for a moment. Let's start with the problem.

---

# Step 1: Imagine you're building a banking app

Customers can create bank accounts.

Each account has:

* customer name
* account number
* balance
* created date

Each account can also:

* deposit money
* withdraw money

If you create 1 account:

```
Parship
Balance: 1000
```

that's easy.

But what if you create **10,000 accounts?**

You cannot manually write

```js
const account1 = {
  customerName: "Parship",
  balance: 1000,
  ...
}

const account2 = {
  customerName: "John",
  balance: 500,
  ...
}

const account3 = {
  customerName: "Alex",
  balance: 700,
  ...
}
```

You'd be repeating the same structure over and over.

So we need a **blueprint**.

That blueprint is the constructor function.

---

# Step 2: Constructor Function = Blueprint

Think of it exactly like this.

```
House blueprint
        ↓
Build many houses

Car blueprint
        ↓
Build many cars

BankAccount blueprint
        ↓
Build many account objects
```

Your constructor is simply the blueprint.

```js
function BankAccount(customerName, balance = 0) {

}
```

Notice:

It is **not** an account.

It only describes

> "If someone wants an account, this is how to build one."

---

# Step 3: What does `new` do?

This is the magic.

When you write

```js
const account = new BankAccount("Parship", 1000);
```

JavaScript secretly does this:

### Step A

Creates an empty object.

```js
{}
```

---

### Step B

Makes `this` point to that object.

So inside the constructor,

```js
this
```

becomes

```js
{}
```

---

### Step C

Runs your code.

So

```js
this.customerName = customerName;
```

becomes

```js
{}.customerName = "Parship"
```

Now the object is

```js
{
   customerName: "Parship"
}
```

Next line

```js
this.accountNumber = Date.now();
```

Now

```js
{
   customerName: "Parship",
   accountNumber: 175...
}
```

Next

```js
this.balance = balance;
```

Now

```js
{
   customerName: "Parship",
   accountNumber: 175...,
   balance: 1000
}
```

Next

```js
this.createdAt = new Date();
```

Now

```js
{
   customerName: "Parship",
   accountNumber: ...,
   balance: 1000,
   createdAt: ...
}
```

---

# Step 4: Methods are added

Then

```js
this.deposit = function(amount){
    this.balance += amount;
}
```

gets added to the object.

Now it becomes

```js
{
   customerName: "Parship",
   balance:1000,

   deposit: function(){

   }
}
```

Then

```js
this.withdraw = (amount)=>{
   this.balance -= amount;
}
```

gets added.

Final object:

```js
{
   customerName:"Parship",
   accountNumber:12345,
   balance:1000,
   createdAt:Date,

   deposit:function(){},
   withdraw:function(){}
}
```

Finally,

JavaScript returns that object automatically.

So

```js
const account = new BankAccount(...)
```

becomes

```js
const account = {
   customerName:"Parship",
   accountNumber:12345,
   balance:1000,
   createdAt:Date,

   deposit:function(){},
   withdraw:function(){}
}
```

You never write the object yourself.

The constructor builds it.

---

# Step 5: What is `this`?

This is one of the biggest beginner confusions.

Inside a constructor,

```js
this
```

means

> "the object currently being created."

Example

```js
const parship = new BankAccount("Parship",1000);
```

During creation

```
this
```

points to

```
parship
```

Later

```js
const john = new BankAccount("John",500);
```

Now

```
this
```

points to

```
john
```

The constructor doesn't know the variable name.

It only knows

> "I'm building whichever object called me."

---

# Step 6: Why deposit works

Suppose

```js
const rakesh = new BankAccount("Rakesh",1000);
```

Current object

```
Balance = 1000
```

Now

```js
rakesh.deposit(500);
```

Inside deposit

```js
this.balance += amount;
```

Here

```
this
```

means

```
rakesh
```

So JavaScript executes

```js
rakesh.balance += 500;
```

Result

```
1500
```

---

# Step 7: Another account

```js
const john = new BankAccount("John",300);
```

Object

```
John

Balance = 300
```

Now

```js
john.deposit(700);
```

becomes

```
john.balance +=700
```

Result

```
1000
```

Notice

Rakesh's balance didn't change.

Every object has its own data.

```
Rakesh
Balance = 1500

John
Balance = 1000
```

---

# Step 8: What is an instance?

People often use this word.

```
Blueprint

      ↓

Actual object
```

The actual object is called an **instance**.

Example

Blueprint

```
BankAccount
```

Instances

```
Parship Account

John Account

Alex Account

Rahul Account
```

Every one of these is an instance of `BankAccount`.

---

# Step 9: Your DOM code

Now look here:

```js
accountForm.addEventListener("submit", (e)=>{
```

User submits the form.

Suppose they typed

```
Name

Alice

Balance

5000
```

This runs

```js
const account = new BankAccount(
    customerName.value,
    +balance.value
);
```

Which becomes

```js
new BankAccount("Alice",5000)
```

A new object is created

```js
{
    customerName:"Alice",
    balance:5000,
    ...
}
```

Then

```js
accounts.push(account);
```

stores it.

Now

```
accounts
```

looks like

```js
[
   {
      customerName:"Alice",
      balance:5000
   }
]
```

Next form submission

```
Bob
1000
```

creates another object

```js
[
   {
      customerName:"Alice",
      balance:5000
   },

   {
      customerName:"Bob",
      balance:1000
   }
]
```

The array simply stores many account objects.

---

# Step 10: What OOP concepts have you learned?

From this single example, you've already been introduced to several core ideas:

| Concept              | Meaning                                     | In your code              |
| -------------------- | ------------------------------------------- | ------------------------- |
| Object               | A real bank account                         | `rakeshAccount`           |
| Constructor Function | Blueprint for creating objects              | `BankAccount()`           |
| Instance             | An object created from the blueprint        | `new BankAccount(...)`    |
| Properties           | Data stored in the object                   | `customerName`, `balance` |
| Methods              | Functions that belong to the object         | `deposit()`, `withdraw()` |
| `this`               | Refers to the current object                | `this.balance`            |
| `new`                | Creates an object and calls the constructor | `new BankAccount()`       |

---

## One important improvement

Your constructor currently creates **new copies** of `deposit` and `withdraw` for every account:

```js
this.deposit = function () { ... };
this.withdraw = function () { ... };
```

If you create 10,000 accounts, you'll also create 10,000 copies of each method. Later, you'll learn about **prototypes**, which allow all instances to share the same methods, making the code more memory-efficient.
