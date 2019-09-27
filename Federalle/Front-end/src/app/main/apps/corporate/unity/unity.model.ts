import { FuseUtils } from '@fuse/utils';

export class Unity
{
    id: any;
    idCity: any;
    idUf: any;
    name: string;
<<<<<<< HEAD
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
=======
    cnpj: any;
    im: any;
    registerDate: any;
    type: any; 
    telefone1: any; 
    telefone2: any;
    email1: any;
    email2: any;
    withholdTaxes: any;
    percentage: any;
    cep: any;
>>>>>>> 669a35a40164498ff56dcde7ae3bdf7db2b9c76f
    andress: string;
    number: string;
    complement: string;
    district: string;
 

    /**
     * Constructor
     *
     * @param unity
     */
    constructor(unity)
    {
<<<<<<< HEAD
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
=======
            this.id = unity.id || null;
            this.name = unity.name || '';
            this.email1 = unity.email1 || '';
            this.email2 = unity.email2 || '';
            this.telefone1 = unity.telefone1 || '';
            this.telefone2 = unity.telefone2 || '';
            this.cnpj = unity.cnpj || '';
            this.im = unity.im || '';
            this.registerDate = unity.registerDate || new Date();
            this.type = unity.type || '';
            this.andress = unity.andress || '';
            this.cep = unity.cep || '';
            this.number = unity.number || '';
            this.district = unity.district || '';
            this.idCity = unity.idCity || '';
            this.idUf = unity.idUf || '';
            this.percentage = unity.percentage || '';
            this.withholdTaxes = unity.withholdTaxes || false;
        
>>>>>>> 669a35a40164498ff56dcde7ae3bdf7db2b9c76f
    }
}