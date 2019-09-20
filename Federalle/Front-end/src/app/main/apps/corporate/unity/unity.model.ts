import { FuseUtils } from '@fuse/utils';

export class Unity
{
    id: any;
    idCity: string;
    idUf: string;
    name: string;
    cnpj: string;
    im: string;
    registerDate: any;
    telefone1: any; 
    telefone2: any;
    natureOperation: any;
    email1: any;
    email2: any;
    regime: any;
    handle: any;
    canErase: any;
    cep: string;
    andress: string;
    number: string;
    complement: string;
    district: string;
 

    /**
     * Constructor
     *
     * @param user
     */
    constructor(user)
    {
        {
            this.id = user.id || null;
            this.name = user.name || '';
            this.email1 = user.email1 || '';
            this.email2 = user.email2 || '';
            this.regime = user.regime || '';
            this.telefone1 = user.telefone1 || '';
            this.telefone2 = user.telefone2 || '';
            this.natureOperation = user.natureOperation || '';
            this.cnpj = user.cnpj || '';
            this.im = user.im || '';
            this.registerDate = user.registerDate || new Date();
            this.andress = user.andress || '';
            this.cep = user.cep || '';
            this.number = user.number || '';
            this.district = user.district || '';
            this.idCity = user.idCity || '';
            this.idUf = user.idUf || '';
            this.handle = user.handle || FuseUtils.handleize(this.name);;
            this.canErase = user.canErase || '';
           
            
        }
    }
}