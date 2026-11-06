//Constructor function - meant to be called with new to create objects.
//A normal function is just called directly to run some logic and optionally return a value.

function BankAccount(customerName, balance = 0) {
  this.customerName = customerName;
  this.accountNumber = Date.now();
  this.balance = balance;
  this.createdAt = new Date(Date.now());

  this.deposit = function (amount) {
    this.balance += amount;
  };

  this.withdraw = (amount) => {
    this.balance -= amount;
  };
}

const rakeshAccount = new BankAccount("Parship C", 1000);
const johnAccount = new BankAccount("John D");
rakeshAccount.deposit(5000);
johnAccount.deposit(1000);
rakeshAccount.withdraw(2000);

console.log(rakeshAccount, johnAccount);

//------------------------------------------------------------

//DOM
const accounts = []
const accountForm = document.querySelector('#accountForm')
const customerName = document.querySelector('#customerName')
const balance = document.querySelector('#balance')

accountForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const account = new BankAccount(customerName.value, +balance.value) // + is for converting string to number
  accounts.push(account)
  console.log(accounts)
})

depositForm.addEventListener('submit', (e) => {
  // e is the event object automatically passed by the browser. It contains information about the event (click, submit, keypress, etc.).
  e.preventDefault();
  // acc is just a parameter name. It represents the current item being checked inside find().
  const account = accounts.find((acc) => acc.accountNumber === +accountNumber.value);
  account.deposit(+amount.value);
  console.log(accounts);
})
