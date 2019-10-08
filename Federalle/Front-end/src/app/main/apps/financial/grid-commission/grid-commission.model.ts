import { FuseUtils } from '@fuse/utils';

export class GridCommission
{
    id: any;
    name: any;
    startDate: any;
    type: any;
    prompt: any;
    handle: string;
    registerDate: any;
    active: any;

    typeRepresentative: any;
    idConsortium: any;
    idCommissionPayment: any;
    startAmount: any;
    endAmount: string;
    startNoCompliance: any;
    endNoCompliance: any;
    quota1: any;
    quota2: any; 
    quota3: any; 
    quota4: any;
    quota5: any;
    quota6: any;
    quota7: any;
    quota8: any;
    quota9: any;
    quota10: any;
    quota11: any;
    quota12: any;
    quota13: any;
    quota14: any;
    quota15: any;
    canErase: boolean;

    /**
     * Constructor
     *
     * @param grid
     */
    constructor(grid)
    {
        
        this.id = grid.id || null;
        this.name = grid.name || '';
        this.type = grid.type || '';
        this.startDate = grid.startDate || new Date();
        this.prompt = grid.prompt || '';
        this.handle = grid.handle || FuseUtils.handleize(this.name);
        this.registerDate = grid.registerDate || null;
        this.active = grid.active || true;
        this.idConsortium = grid.idConsortium || null;

        
        this.typeRepresentative = grid.typeRepresentative || '';
        this.idCommissionPayment = grid.idCommissionPayment || null;
        this.startAmount = grid.startAmount || '';
        this.endAmount = grid.endAmount || '';
        this.startNoCompliance = grid.startNoCompliance || '';
        this.endNoCompliance = grid.endNoCompliance || '';
        this.quota1 = grid.quota1 || '';
        this.quota2 = grid.quota2 || '';
        this.quota3 = grid.quota3 || '';
        this.quota4 = grid.quota4 || '';
        this.quota5 = grid.quota5 || '';
        this.quota6 = grid.quota6 || '';
        this.quota7 = grid.quota7 || '';
        this.quota8 = grid.quota8 || '';
        this.quota9 = grid.quota9 || '';
        this.quota10 = grid.quota10 || '';
        this.quota11 = grid.quota11 || '';
        this.quota12 = grid.quota12 || '';
        this.quota13 = grid.quota13 || '';
        this.quota14 = grid.quota14 || '';
        this.quota15 = grid.quota15 || '';
        this.canErase = grid.canErase || '';
            
        
    }
}


