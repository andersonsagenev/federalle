import { FuseUtils } from '@fuse/utils';

export class Banks
{
    id: string;
    name: string;
    codeFebraban: string;
    handle: string;
    canErase: true

    /**
     * Constructor
     *
     * @param banks
     */
    constructor(banks?)
    {
        {
            banks = banks || {};
            this.id = banks.id || null;
            this.name = banks.name || '';
            this.codeFebraban = banks.codeFebraban || '';
            this.handle = banks.handle || FuseUtils.handleize(this.name);
            this.canErase = banks.canErase || false;
        }
    }
}
