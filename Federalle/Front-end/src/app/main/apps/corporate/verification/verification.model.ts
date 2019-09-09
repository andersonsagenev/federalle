import { FuseUtils } from '@fuse/utils';

export class Verification
{
    id: string;
    name: string;
    idSector: any;
    handle: string;
    canErase: boolean;

    /**
     * Constructor
     *
     * @param verification
     */
    constructor(verification)
    {
        {
            this.id = verification.id || null;
            this.name = verification.name || '';
            this.idSector = verification.idSector || '';
            this.handle = verification.handle || FuseUtils.handleize(this.name);
            this.canErase = verification.canErase || false;
        }
    }
}
