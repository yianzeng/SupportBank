const fs = require("fs");
const csv = require("csv-parser");
var readlineSync = require('readline-sync');
const readline = require("readline");

class Account {
    constructor(name) {
        this.name = name;
        this.balance = 0;
        this.transactions = [];
    }



}
class Transaction {
    constructor(date, fromAccount, toAccount, narrative, amount) {
        this.date = date;
        this.fromAccount = fromAccount;
        this.toAccount = toAccount;
        this.narrative = narrative;
        this.amount = amount;
    }

    updateBalance(amount) {
        this.fromAccount.balance += amount;
        this.toAccount.balance -= amount;
    }
}

function processAccounts(name, accounts) {
    // Creates account for a person if not previously existing
    if (!(name in accounts)) {
        let acc = new Account(name);
        accounts[name] = acc;
    }
    return accounts[name]
}

function processTransactions(date, fromAccount, toAccount, narrative, amount, transactions) {
    // Processes transaction and updates balance
    let t = new Transaction(date, fromAccount, toAccount, narrative, amount);
    transactions.push(t);
    t.updateBalance(amount);

    fromAccount.transactions.push(t)
    toAccount.transactions.push(t)
}
function process(results, accounts, transactions) {
    for (let i = 0; i < results.length; i++) {
        let line = results[i];
        let date = line['Date'];
        let fromName = line['From'];
        let toName = line['To'];
        let narrative = line['Narrative'];
        let amount = parseInt(parseFloat(line['Amount']) * 100);
        let fromAccount = processAccounts(fromName, accounts);
        let toAccount = processAccounts(toName, accounts);

        processTransactions(date, fromAccount, toAccount, narrative, amount, transactions);

        }
    }


function displayBalances(accounts) {
    for (let name in accounts) {
        let balance = accounts[name].balance;
        let owe;
        if (balance > 0) {
            owe = 'owes';
        } else {
            owe = 'is owed';
            balance = -1*balance;
        }
        console.log(`${name} ${owe} ${balance} pence`);
    }
}

function displayTransactions(name, accounts) {
    let acc = accounts[name];
    console.log(name)
}

let results = [];
let transactions = [];
let accounts = {};
fs.createReadStream("Transactions2014.csv")
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        process(results, accounts, transactions);
        let order = readlineSync.question('Input List All or List [Account]: ');
        if (order = 'List All') {
            displayBalances(accounts);
        } else {
            let name = order.slice(5)
            displayTransactions(name, accounts)
        }

    });



