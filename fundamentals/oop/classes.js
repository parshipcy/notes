// Two ways to write a class:
//
// 1) const BankAccount = class { ... }   ← class expression (no name on the class itself)
// 2) class BankAccount { ... }           ← class declaration (class has a name)
//
// Both work the same when you use them. But in the console they look different:
// - Case 1: expand an instance → constructor shows as just "class" (anonymous)
// - Case 2: expand an instance → constructor shows as "class BankAccount"
//
// Why? In case 1 the class has no name inside the code - only the variable BankAccount
// holds it. In case 2 the name BankAccount is part of the class itself.
//
// To get a name in case 1, write: const BankAccount = class BankAccount { ... }

class BankAccount {
    customerName;
    accountNumber;
    balance;

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

const rakeshAccount = new BankAccount("Rakesh", 1000);
rakeshAccount.deposit(1000);
console.log(rakeshAccount);


//Hoisting - can you use something before you write it?
hello();
function hello() {
    console.log("Hello");
}

// Normal functions: YES. JS moves the function to the top behind the scenes,
// so calling it before the line where you define it still works.


// Classes: NO. You must write the class first, then use it.
//
// This would crash:
// const acc = new BankAccount("Rakesh"); // error - BankAccount doesn't exist yet
// class BankAccount { ... }
