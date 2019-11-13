import { FuseUtils } from '@fuse/utils';

export class Number
{
    id: string;
    numberStart: string;
    numberEnd: string;
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
            this.numberStart = number.numberStart || '';
            this.numberEnd = number.numberEnd || '';
            this.registerDate = number.registerDate || new Date();
            this.idRepresentative = number.idRepresentative || '';
            this.idConsortium = number.idConsortium || '';
            this.canErase = number.canErase || false;
        }
    }
}
