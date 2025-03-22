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
}