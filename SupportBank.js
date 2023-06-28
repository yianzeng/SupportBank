const fs = require("fs");
const csv = require("csv-parser");
const readline = require('readline');



class Account {
    constructor(name) {
        this.name = name;
        this.balance = 0;
        this.transactions = [];
    }
}

class Transaction {
    constructor(date, narrative) {
        this.date = date;
        this.narrative = narrative;
    }
}
function update_account(account, amount, narrative, date) {
    account.balance += amount;
    let t = new Transaction(date, narrative);
    account.transactions.push(t);
}

readStream = fs.createReadStream("Transactions2014.csv");
const rl = readline.createInterface(readStream);

const accounts = {};
const FilePath = "Transactions2014.csv"
/*fs.readFile("Transactions2014.csv", 'utf8', function(err, data)){
    console.log(data);
}*/

rl.on('line', (line) => {
    const [date, from_whom, to_whom, narrative, amount] = line.split(',')

    if (from_whom in accounts) {
        let acc = accounts[from_whom];
        update_account(acc, -1*parseFloat(amount), narrative, date);
    } else {
        let new_acc = new Account(from_whom);
        accounts[from_whom] = new_acc;
        update_account(new_acc, parseFloat(amount), narrative, date);
    }
})


console.log(accounts)