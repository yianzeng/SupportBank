
function displayTransactions(name, accounts) {
    let transactions = accounts[name].transactions;
    for (let i = 0; i < transactions.length; i++) {
        let t = transactions[i];
        console.log('Date:', t.date, 'Narrative:', t.narrative)
    }
}