class BankAccount {
    customerName;
    accountNumber;
    #balance;

    constructor(customerName, balance = 0) {
        this.customerName = customerName;
        this.accountNumber = Date.now();
        this.#balance = balance;
    }

    deposit(amount) {
        this.#balance += amount;
    }

    withdraw(amount) {
        this.#balance -= amount;
    }

    // getters and setters
    set balance(amount) {
        if(isNaN(amount)){
            throw new Error('Amount is not a valid input')
        }
        this.#balance = amount;
    }

    get balance() {
        return this.#balance;
    }
}



class SavingAccount extends BankAccount { // SavingAccount inherits from BankAccount - So a SavingAccount gets access to: deposit(), withdraw()
    transactionLimit = 10000;

    constructor(customerName, balance = 0) {
        super(customerName, balance) // super() calls the parent class constructor.
        console.log(this.#balance) //not possible to acess private fields in sub classes
    }

    takePersonalLoan(amount) {
        console.log('Taking Personal loan of', amount)
    }
}

const rakeshAcc = new SavingAccount('Rakesh K', 500);
// rakeshAcc.#balance = 2222; //not possible as its private now
rakeshAcc.balance = 400
console.log(rakeshAcc.balance)
