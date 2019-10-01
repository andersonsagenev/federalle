import { FuseUtils } from '@fuse/utils';

export class Unity
{
    id: any;
    idCity: any;
    idUf: any;
    name: string;
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
    address: string;
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
            this.address = unity.address || '';
            this.cep = unity.cep || '';
            this.number = unity.number || '';
            this.district = unity.district || '';
            this.idCity = unity.idCity || '';
            this.idUf = unity.idUf || '';
            this.percentage = unity.percentage || '';
            this.withholdTaxes = unity.withholdTaxes || false;
        
    }
}