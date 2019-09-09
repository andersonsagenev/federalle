import { FuseUtils } from '@fuse/utils';

export class Benefits
{
    id: string;
    idPlan: any;
    registerDate: any;
    codeBenefit: any;
    name: string;
    handle: string;
    canErase: boolean;
    valueCredit: any;
    prompt: any;
    dueDate: any;
    assemblyDate: any;
   

    /**
     * Constructor
     *
     * @param bem
     */
    constructor(bem)
    {
        {
            this.id = bem.id || null;
            this.idPlan = bem.idPlan || '';
            this.registerDate = bem.registerDate || new Date();
            this.codeBenefit = bem.codeBenefit || '';
            this.name = bem.name || '';
            this.valueCredit = bem.valueCredit || '';
            this.prompt = bem.prompt || '';
            this.assemblyDate = bem.assemblyDate || '';
            this.dueDate = bem.dueDate || '';
            this.handle = bem.handle || FuseUtils.handleize(this.name);
            this.canErase = bem.canErase || true;
        }
    }
}
