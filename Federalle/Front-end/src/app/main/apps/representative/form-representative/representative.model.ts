import { MatChipInputEvent } from '@angular/material';

import { FuseUtils } from '@fuse/utils';

export class Representative
{
    id: string;
    idMaster: string;
    idCity: string;
    idCity1: string;
    idUf: string;
    idStatusPartnershipContract: string;
    idBank: string;
    idUser: string;
    registerDate: any;
    name: string;
    handle: string;
    cpfCnpj: string;
    telefone1: string;
    telefone2: string;
    telefone3: string;
    email1: string;
    email2: string;
    email3: string;
    zip: string;
    zip1: string;
    andress: string;
    andress1: string;
    number: string;
    number1: string;
    complement: string;
    complement1: string;
    district: string;
    district1: string;
    bankesName: string;
    bankesCpfCnpj: string;
    banckAgency: string;
    bankAccount: string;
    bankesContact: string;
    bankOperation: string;
    emailFinance: string;
    nameContact: string;
    withholdTax: boolean;
    regionCode: boolean;
    canErase: boolean

  

    /**
     * Constructor
     *
     * @param representante
     */
    constructor(representante?)
    {
        representante = representante || {};
        this.id = representante.id || null;
        this.name = representante.name || '';
        this.handle = representante.handle || FuseUtils.handleize(this.name);
        this.idMaster = representante.idMaster || '';
        this.idCity = representante.idCity || [];
        this.idCity1 = representante.idCity1 || [];
        this.idStatusPartnershipContract = representante.idStatusPartnershipContract || [];
        this.idBank = representante.idBank || null;
        this.idUser = representante.idUser || null;
        this.registerDate = representante.registerDate || new Date();
        this.cpfCnpj = representante.cpfCnpj || ''
        this.telefone1 = representante.telefone1 || '';
        this.telefone2 = representante.telefone2 || '';
        this.telefone3 = representante.telefone3 || '';
        this.email1 = representante.email1 || '';
        this.email2 = representante.email2 || '';
        this.email3 = representante.email3 || '';
        this.zip = representante.zip || '';
        this.zip1 = representante.zip1 || '';
        this.andress = representante.andress || '';
        this.andress1 = representante.andress1 || '';
        this.number = representante.number || 0;
        this.number1 = representante.number1 || 0;
        this.complement = representante.complement || '';
        this.complement1 = representante.complement1 || '';
        this.district = representante.district || '';
        this.district1 = representante.district1 || '';
        this.bankesName = representante.bankesName || '';
        this.bankesCpfCnpj = representante.bankesCpfCnpj || '';
        this.banckAgency = representante.banckAgency || '';
        this.bankAccount = representante.bankAccount || '';
        this.bankOperation = representante.bankOperation || '';
        this.emailFinance = representante.emailFinance || '';
        this.bankesContact = representante.bankesContact || '';
        this.nameContact = representante.nameContact || '';
        this.withholdTax = representante.withholdTax || false;
        this.regionCode = representante.codRegion || false;
        this.canErase = representante.canErase || true;
    }

   

   
}
