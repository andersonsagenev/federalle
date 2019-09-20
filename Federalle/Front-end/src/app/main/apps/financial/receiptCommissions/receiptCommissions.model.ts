import { FuseUtils } from '@fuse/utils';

export class ReceiptCommission
{
    id: string;
    idConsortium: any;
    registerDate: any;
    dueDate: any;
    parcel: any;
    quantity: any;
    credit: any;
    fatorCommission: any;
    valueCommission: any;
    canErase: boolean;

    /**
     * Constructor
     *
     * @param bem
     */
    constructor(bem)
    {
        {
            this.id = bem.id || null;
            this.idConsortium = bem.idConsortium || '';
            this.registerDate = bem.registerDate || new Date();
            this.parcel = bem.parcel || '';
            this.quantity = bem.quantity || '';
            this.credit = bem.credit || '';
            this.fatorCommission = bem.fatorCommission || '';
            this.valueCommission = bem.valueCommission || '';
            this.dueDate = bem.dueDate || '';
            this.canErase = bem.canErase || true;
        }
    }
}
