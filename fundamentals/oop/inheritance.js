//INHERITENCE IN CONSTRUCTOR FUNCTIONS

function BankAccount(customerName, balance = 0) {
    this.customerName = customerName;
    this.accountNumber = Date.now();
    this.balance = balance;
}
// can't use arrow function
BankAccount.prototype.deposit = function (amount) {
    this.balance += amount;
};
BankAccount.prototype.withdraw = function (amount) {
    this.balance -= amount;
};



function SavingAccount(customerName, balance = 0) {
    BankAccount.call(this, customerName, balance) // Run the BankAccount constructor, but make this refer to my SavingAccount object
    this.transactionLimit = 10000;
}
SavingAccount.prototype = Object.create(BankAccount.prototype) // Make SavingAccount.prototype inherit from BankAccount.prototype
SavingAccount.prototype.takePersonalLoan = function (amount) {
    console.log('Taking Personal loan of', amount)
};



const rakeshAcc = new SavingAccount('Rakesh K', 500);
console.log(rakeshAcc)



// --------------------------------------------------------------------



//INHERITENCE IN CLASSES

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



class SavingAccount extends BankAccount { // SavingAccount inherits from BankAccount - So a SavingAccount gets access to: deposit(), withdraw()
    transactionLimit = 10000;

    constructor(customerName, balance = 0) {
        super(customerName, balance) // super() calls the parent class constructor.
    }

    takePersonalLoan(amount) {
        console.log('Taking Personal loan of', amount)
    }
}

const rakeshAcc = new SavingAccount('Rakesh K', 500);
rakeshAcc.deposit(500)
console.log(rakeshAcc)
