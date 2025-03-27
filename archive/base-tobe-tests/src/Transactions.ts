import crypto, { UUID } from 'crypto';

interface Transaction {
    id?: UUID,
    amount: number;
    date: Date,
    type: 'debit' | 'credit';
    description: string
}

export class TransactionManager {
    private finalBalance: number;
    private lastUpdated: Date;
    private transactions: Transaction[];

    constructor() {
        this.finalBalance = 0;
        this.lastUpdated = new Date();
        this.transactions = [];
    }

    getAccountDetails(
        from: Date = new Date(new Date().valueOf() - 7*24*60*60),
        toDate: Date = new Date(),
        limit: number = 10,
        offset: number = 0
    ) {
        return {
            finalBalance: this.finalBalance,
            lastUpdated: this.lastUpdated,
            transactions: this.transactions
                .filter((tns) => {
                    let conditions = [];
                    if(!isNaN(new Date(from).valueOf()))  conditions.push(new Date(tns.date) >= new Date(tns.date));
                    if(!isNaN(new Date(toDate).valueOf()))  conditions.push(new Date(tns.date) <= new Date(toDate));

                    return conditions.every((val) => val);
                })
                .slice(offset, limit)
        }
    }

    addTransaction(transactionData: Omit<Transaction, "id" | "date">) {
        this.validateEntry(transactionData);
    
        const newTransaction = {
            id: crypto.randomUUID(),
            date: new Date(),
            ...transactionData
        };
    
        if (transactionData.type === "credit") {
            this.finalBalance += transactionData.amount;
        } else if (transactionData.type === "debit") {
            if (this.finalBalance < transactionData.amount) {
                throw new Error("Insufficient balance for debit transaction");
            }
            this.finalBalance -= transactionData.amount;
        }
    
        this.transactions.unshift(newTransaction);
        this.lastUpdated = new Date();
    
        return `Transaction added successfully with ID: ${newTransaction.id}`;
    }

    private validateEntry(transaction: Omit<Transaction, 'id' | 'date'>) {
        const isNotANumber = isNaN(transaction.amount);
        if(isNaN(transaction.amount) || transaction.amount < 0) {
            throw new Error('Amount should be a valid positive numeric value');
        }

        if(!['debit', 'credit'].includes(transaction.type)) {
           throw new Error(`Entry type shoule be either 'debit' or 'credit'`);
        }

        if(!transaction.description) {
            throw new Error(`Description is mandatory`);
        }
    }
}