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

    describe('Describe: Testing add a transaction', () => {

        describe('Describe: Validate Entry', () => {
            test('Test: Amount validation', () => {
                expect(() =>
                    (transaction)
                        .addTransaction({
                            amount: -1,
                            type: 'credit',
                            description: 'test credit'
                        })
                ).toThrow('Amount should be a valid positive numeric value');
            });
    
            test('Test: Entry Type Validation', () => {
                expect(() =>
                    (transaction)
                        .addTransaction({
                            amount: 100,
                            type: 'random' as any,
                            description: 'test credit'
                        })
                ).toThrow(`Entry type shoule be either 'debit' or 'credit'`);
            });
    
            test('Test: Description Validation', () => {
                expect(() =>
                    (transaction)
                        .addTransaction({
                            amount: 100,
                            type: 'credit',
                            description: ''
                        })
                ).toThrow(`Description is mandatory`)
            });
        });

        describe('Describe: Credit Transaction', () => {         

            test('Test: Transaction Success', () => {
                const creditResponse = transaction.addTransaction({ amount: 50, type: 'credit', description: 'test 1 | credit'});
                const matchedIds = creditResponse.match(/Transaction added successfully with ID: (.+)/);

                expect(matchedIds).not.toBeNull();

                const { finalBalance, transactions } = transaction.getAccountDetails();
                expect(transactions[0].id).toBe(matchedIds?.[1]);

                expect(transactions.length).toBe(1);
                expect(finalBalance).toBe(50);

                const debitResponse = transaction.addTransaction({ amount: 50, type: 'debit', description: 'test 2 | debit'});
                const { 
                    finalBalance: updateFinalBalance,
                    transactions: updatedTransactions
                } = transaction.getAccountDetails();

                expect(updateFinalBalance).toBe(0);
                expect(updatedTransactions.length).toBe(2);
            });

            test('Test: Amount Debited Falied Insufficient Balance', () => {
                expect(() => transaction.addTransaction({ amount: 50, type: 'debit', description: 'test 1 | credit'})).toThrow('Insufficient balance for debit transaction');
            });
        });
    });
});