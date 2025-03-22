import { TransactionManager } from "../src/Transactions"

describe('Testing the Transcation Flow', () => {

    let transaction: TransactionManager;
    beforeEach(() => {
        transaction = new TransactionManager();
    });

    describe('Testing the Intialization of Transaction Manager', () => {

        test('Check if transaction is correct Instance of TransactionManager', () => {
            expect(transaction).toBeInstanceOf(TransactionManager);
        });

        test('Final balance is 0', () => {
            const currentAccountDetails = transaction.getAccountDetails();
            expect(currentAccountDetails.finalBalance).toBe(0);
        });

        test('Last updated should be closer to current time', () => {
            const currentAccountDetails = transaction.getAccountDetails();
            expect(currentAccountDetails.lastUpdated.valueOf()).toBeCloseTo(new Date().valueOf());
        });

        test('Transaction hisotry should be empty', () => {
            const currentAccountDetails = transaction.getAccountDetails();
            expect(currentAccountDetails.transactions).toBeInstanceOf(Array);
            expect(currentAccountDetails.transactions.length).toBe(0);
        })
    });

    describe('Testing add a transaction', () => {

        test('A entry validation happens for parameters passed', () => {
            expect(() =>
                (transaction as any)
                    .addTransaction({
                        amount: -1,
                        type: 'credit',
                        description: 'test credit'
                    })
            ).toThrow('Amount should be a valid positive numeric value');

            expect(() =>
                (transaction as any)
                    .addTransaction({
                        amount: 100,
                        type: 'random',
                        description: 'test credit'
                    })
            ).toThrow(`Entry type shoule be either 'debit' or 'credit'`);

            expect(() =>
                (transaction as any)
                    .addTransaction({
                        amount: 100,
                        type: 'credit',
                        description: ''
                    })
            ).toThrow(`Description is mandatory`)
        });
    });
});