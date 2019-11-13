import { FuseUtils } from '@fuse/utils';

export class CostCenter
{
    id: string;
    name: string;
    handle: string;
    canErase: true;
    used: any;

    /**
     * Constructor
     *
     * @param cost-center
     */
    constructor(item?)
    {
        {
            item = item || {};
            this.id = item.id || null;
            this.name = item.name || '';
            this.handle = item.handle || FuseUtils.handleize(this.name);
            this.canErase = item.canErase || false;
            this.used = item.used || 0;
        }
    }
}
