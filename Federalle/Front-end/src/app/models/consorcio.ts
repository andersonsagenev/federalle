import { FuseUtils } from '@fuse/utils';

export class Consorcio
{
    id: string;
    name: string;
    handle: string;
    canErase: true

   

    /**
     * Constructor
     *
     * @param contact
     */
    constructor(consorcio?)
    {
        {
            consorcio = consorcio || {};
            this.id = consorcio.id || null;
            this.name = consorcio.name || '';
            this.handle = consorcio.handle || FuseUtils.handleize(this.name);
            this.canErase = consorcio.canErase || false;
        }
    }
}
