//constructor function
function BankAccount(customerName, balance = 0) {
    this.customerName = customerName;
    this.accountNumber = Date.now();
    this.balance = balance;

    // this.deposit = function (amount) {
    //   this.balance += amount;
    // };

    // this.withdraw = (amount) => {
    //   this.balance -= amount;
    // };
}

const rakeshAccount = new BankAccount("Rakesh");

// BankAccount.prototype.test = "this is test";
BankAccount.prototype.deposit = function (amount) { //can't use arrow function here
    this.balance += amount;
};

rakeshAccount.deposit(1000);
console.log(rakeshAccount);

/*
// only avialable for raksehAccount - prototype chaining

const rakeshAccount = new BankAccount("Rakesh");
rakeshAccount.deposit = function(amount) {
    this.balance += amount;
};
rakeshAccount.deposit(1000);
*/