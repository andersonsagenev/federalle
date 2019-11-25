import { FuseUtils } from "@fuse/utils";

export class Services {
    id: string;
    name: string;
    handle: string;
    canErase: true;
    used: any;
    listaServiceValue: [
        {
            id: string;
            idService: string;
            idUnity: string;
            inss: 0;
            iss: 0;
            pis: 0;
            cofins: 0;
            ir: 0;
            csll: 0;
            typeService: string;
            itemList: string;
            canErase: true;
        }
    ];

    /**
     * Constructor
     *
     * @param service
     */
    constructor(item?) {
        item = item || {};
        this.id = item.id || null;
        this.name = item.name || "";
        this.handle = item.handle || FuseUtils.handleize(this.name);
        this.canErase = item.canErase || false;
        this.used = item.used || 0;
        this.listaServiceValue = this.listaServiceValue;
    }
}
