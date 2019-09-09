import { FuseUtils } from '@fuse/utils';

export class Payment
{
    id: string;
    name: string;
    handle: string;
    canErase: true

    /**
     * Constructor
     *
     * @param payment
     */
    constructor(payment?)
    {
        {
            payment = payment || {};
            this.id = payment.id || null;
            this.name = payment.name || '';
            this.handle = payment.handle || FuseUtils.handleize(this.name);
            this.canErase = payment.canErase || false;
        }
    }
}
