import { FuseUtils } from '@fuse/utils';

export class ReceiptCommission
{
    id: string;
    idConsortium: any;
    registerDate: any;
    startDate: any;
    value: any;

    parcel: any;
    idCommissionReceipt: any;
    percentage: any;
    canErase: boolean;
    active: boolean;
  

    /**
     * Constructor
     *
     * @param comissao
     */
    constructor(comissao)
    {
        {
            this.id = comissao.id || null;
            this.idConsortium = comissao.idConsortium || '';
            this.registerDate = comissao.registerDate || new Date();
            this.startDate = comissao.credit || new Date();
            this.value = comissao.value || '';

            this.parcel = comissao.parcel || '';
            this.percentage = comissao.quantity || '';
            
            this.idCommissionReceipt = comissao.idCommissionReceipt || '';
            this.canErase = comissao.canErase || true;
            this.active = comissao.active || true;
        }
    }
}
