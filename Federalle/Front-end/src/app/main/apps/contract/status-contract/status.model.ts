import { FuseUtils } from '@fuse/utils';

export class Status
{
    id: string;
    name: string;
    handle: string;
    canErase: true

    /**
     * Constructor
     *
     * @param status
     */
    constructor(status?)
    {
        {
            status = status || {};
            this.id = status.id || null;
            this.name = status.name || '';
            this.handle = status.handle || FuseUtils.handleize(this.name);
            this.canErase = status.canErase || false;
        }
    }
}
