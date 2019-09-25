import { FuseUtils } from '@fuse/utils';

export class Contract
{
    id: any;
    idClient: any;
    idRepresentative: any;
    idSalesMan: any;
    idBenefit: any;
    idFormPayment: any;
    registerDate: any;
    paydat: any;
    serie: any; 
    grupo: any; 
    cota: any; 
    codeCv: any;
    canErase: any;
    dueDate: any;
    assemblyDate: any;
    promptInitial: any;
    promptCurrent: any;
    checking: boolean;
    assembli: boolean;
    ticket: boolean;
    active: boolean;
    telefone1: any; 
    telefone2: any;
    telefone3: any;
    email1: any;
    email2: any;
    email3: any;
  
 

    /**
     * Constructor
     *
     * @param contract
     */
    constructor(contract)
    {
        {
            this.id = contract.id || null;
            this.idClient = contract.idClient || '';
            this.idRepresentative = contract.idRepresentative || '';
            this.idSalesMan = contract.idSalesMan || '';
            this.idBenefit = contract.idBenefit || '';
            this.idFormPayment = contract.idFormPayment || '';
            this.serie = contract.serie || '';
            this.registerDate = contract.registerDate || new Date();
            this.cota = contract.cota || '';
            this.paydat = contract.paydat || '';
            this.codeCv = contract.codeCv || '';
            this.dueDate = contract.dueDate || '';
            this.assemblyDate = contract.assemblyDate || '';
            this.promptInitial = contract.promptInitial || '';
            this.promptCurrent = contract.promptCurrent || '';
            this.checking = contract.checking || true;
            this.assembli = contract.assembli || true;
            this.ticket = contract.ticket || true;
            this.active = contract.active || true;
            this.canErase = contract.canErase || '';

            this.email1 = contract.email1 || '';
            this.email2 = contract.email2 || '';
            this.email3 = contract.email3 || '';
            this.telefone1 = contract.telefone1 || '';
            this.telefone2 = contract.telefone2 || '';
            this.telefone3 = contract.telefone3 || '';
           
            
        }
    }
}