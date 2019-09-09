import { FuseUtils } from '@fuse/utils';

export class Sector
{
    id: string;
    name: string;
    handle: string;
    canErase: true

   

    /**
     * Constructor
     *
     * @param sector
     */
    constructor(sector?)
    {
        {
            sector = sector || {};
            this.id = sector.id || null;
            this.name = sector.name || '';
            this.handle = sector.handle || FuseUtils.handleize(this.name);
            this.canErase = sector.canErase || false;
        }
    }
}
