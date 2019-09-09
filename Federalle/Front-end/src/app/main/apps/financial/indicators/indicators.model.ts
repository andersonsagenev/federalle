import { FuseUtils } from '@fuse/utils';

export class Indicator
{
    id: string;
    name: string;
    // handle: string;
    // canErase: true

    /**
     * Constructor
     *
     * @param indicator
     */
    constructor(indicator?)
    {
        {
            indicator = indicator || {};
            this.id = indicator.id || null;
            this.name = indicator.name || '';
            // this.handle = indicator.handle || FuseUtils.handleize(this.name);
            // this.canErase = indicator.canErase || false;
        }
    }
}
