import { faker } from '@faker-js/faker';
import { TransactionType } from "@test-data/enums";

export default class NewTransactionData {
    private amount!: string;
    private note!: string;
    private transactionType!: TransactionType;

    public constructor(transactionType: TransactionType) {
        this.setAmount(`${faker.datatype.number({ min: 0, max: 99999 })}`);
        this.setNote(faker.random.word());
        this.setTransactionType(transactionType); 
    }

    public setAmount(amount: string): this {
        this.amount = amount;
        return this;
    }

    public getAmount(): string {
        const num = Number(this.amount);
        return num.toLocaleString('en-US');
    }

    public setNote(note: string): this {
        this.note = note;
        return this;
    }

    public getNote(): string {
        return this.note;
    }

    public setTransactionType(transactionType: TransactionType): this {
        this.transactionType = transactionType;
        return this;
    }

    public getTransactionType(): TransactionType {
        return this.transactionType;
    }
}
