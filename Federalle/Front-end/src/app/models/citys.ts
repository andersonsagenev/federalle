import { FuseUtils } from '@fuse/utils';

export class City {
    id: string;
    name: string;
    idUf: string;
    ibge: string;
    siaf: string;
    go: string;
    uf: string;
    handle: string;
    canErase: Boolean;
    initials: string;
 
    /**
     * Constructor
     *
     * @param ufs
     */
    constructor(ufs?) {
        ufs = ufs || {};
        this.id = ufs.id || '';
        this.name = ufs.name || ''
        this.idUf = ufs.idUf || ''
        this.ibge = ufs.ibge || ''
        this.siaf = ufs.siaf || ''
        this.go = ufs.go || ''
        this.uf = ufs.uf || ''
        this.handle = ufs.handle || FuseUtils.handleize(this.name);
        this.canErase = ufs.canErase || false;
        this.initials = ufs.statusChat || '';
    }

}
