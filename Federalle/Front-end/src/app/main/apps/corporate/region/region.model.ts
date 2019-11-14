import { FuseUtils } from '@fuse/utils';

export class Region
{
    id: string;
    name: string;
    idConsortium: any;
    handle: string;
    canErase: boolean;

    /**
     * Constructor
     *
     * @param code region
     */
    constructor(code)
    {
        this.id = code.id || null;
        this.name = code.name || '';
        this.idConsortium = code.idConsortium || '';
        this.handle = code.handle || FuseUtils.handleize(this.name);
        this.canErase = code.canErase || false;
    }
}
