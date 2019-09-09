import { FuseUtils } from '@fuse/utils';

export class Plano
{
    id: string;
    name: string;
    numberOfInstallments: any;
    idConsortium: any;
    handle: string;
    canErase: boolean;
    registerDate: any;

    /**
     * Constructor
     *
     * @param plano
     */
    constructor(plano)
    {
        {
            this.id = plano.id || null;
            this.name = plano.name || '';
            this.registerDate = plano.registerDate || new Date();
            this.numberOfInstallments = plano.numberOfInstallments || '';
            this.idConsortium = plano.idConsortium || '';
            this.handle = plano.handle || FuseUtils.handleize(this.name);
            this.canErase = plano.canErase || false;
        }
    }
}
