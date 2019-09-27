import { FuseUtils } from '@fuse/utils';

export class Number
{
    id: string;
    number: string;
    endNumber: string;
    idRepresentative: any;
    idConsortium: any;
    canErase: boolean;
    registerDate: any;
 
    /**
     * Constructor
     *
     * @param number
     */
    constructor(number)
    {
        {
            this.id = number.id || null;
            this.number = number.number || '';
            this.endNumber = number.endNumber || '';
            this.registerDate = number.registerDate || new Date();
            this.idRepresentative = number.idRepresentative || '';
            this.idConsortium = number.idConsortium || '';
            this.canErase = number.canErase || false;
        }
    }
}
