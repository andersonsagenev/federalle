import { FuseUtils } from '@fuse/utils';

export class Ufs {
    id: string;
    name: string;
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
        this.handle = ufs.handle || FuseUtils.handleize(this.name);
        this.canErase = ufs.canErase || false;
        this.initials = ufs.statusChat || '';
    }

}
