import { FuseUtils } from '@fuse/utils';

export class Unity
{
    id: any;
    idCity: string;
    idUf: string;
    name: string;
    cpfCnpj: string;
    contact: string;
    registerDate: any;
    birthDate: any;
    dad: any; 
    mom: any; 
    type: any; 
    telefone1: any; 
    telefone2: any;
    telefone3: any;
    email1: any;
    email2: any;
    email3: any;
    handle: any;
    canErase: any;
    zip: string;
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
            this.email3 = user.email3 || '';
            this.telefone1 = user.telefone1 || '';
            this.telefone2 = user.telefone2 || '';
            this.telefone3 = user.telefone3 || '';
            this.cpfCnpj = user.cpfCnpj || '';
            this.registerDate = user.registerDate || new Date();
            this.type = user.type || '';
            this.contact = user.contact || '';
            this.birthDate = user.birthDate || '';
            this.dad = user.dad || '';
            this.mom = user.mom || '';
            this.andress = user.andress || '';
            this.zip = user.zip || '';
            this.number = user.number || '';
            this.district = user.district || '';
            this.idCity = user.idCity || '';
            this.idUf = user.idUf || '';
            this.handle = user.handle || FuseUtils.handleize(this.name);;
            this.canErase = user.canErase || '';
           
            
        }
    }
}