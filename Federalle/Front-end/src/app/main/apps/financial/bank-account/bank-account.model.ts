import { FuseUtils } from "@fuse/utils";

export class BankAccount {
    id: any;
    idBank: any;
    idUnity: any;
    name: any;
    typeAccount: any;
    statusAccount: any;
    openDate: any;
    closingDate: any;
    agency: any;
    dvAgency: string;
    registerDate: any;
    active: boolean;
    account: any;
    dvAccount: any;
    wallet: any;
    nextOurNumber: any;
    codeAssignor: string;
    operation: any;
    dvAssignor: any;
    interest: any;
    fine: any;
    instructionPayment1: any;
    instructionPayment2: any;
    instructionPayment3: any;
    instructionPayment4: any;
    instructionPayment5: any;
    unity: any;
    bank: any;
    used: any;
    canErase: boolean;

    /**
     * Constructor
     *
     * @param grid
     */
    constructor(grid) {
        this.id = grid.id || null;
        this.name = grid.name || "";
        this.idBank = grid.idBank || null;
        this.idUnity = grid.idUnity || null;
        this.typeAccount = grid.typeAccount || null;
        this.statusAccount = grid.statusAccount || null;
        this.openDate = grid.openDate || null;
        this.closingDate = grid.closingDate || null;
        this.registerDate = grid.registerDate || new Date();
        this.agency = grid.agency || "";
        this.dvAgency = grid.dvAgency || "";
        this.active = grid.active || true;
        this.account = grid.account || "";
        this.dvAccount = grid.dvAccount || "";
        this.wallet = grid.wallet || "";
        this.nextOurNumber = grid.nextOurNumber || "";
        this.codeAssignor = grid.codeAssignor || "";
        this.operation = grid.operation || "";
        this.dvAssignor = grid.dvAssignor || "";
        this.interest = grid.interest || "";
        this.fine = grid.fine || "";
        this.instructionPayment1 = grid.instructionPayment1 || "";
        this.instructionPayment2 = grid.instructionPayment2 || "";
        this.instructionPayment3 = grid.instructionPayment3 || "";
        this.instructionPayment4 = grid.instructionPayment4 || "";
        this.instructionPayment5 = grid.instructionPayment5 || "";
        this.unity = grid.unity || "";
        this.bank = grid.bank || "";
        this.used = grid.used || "";
        this.canErase = grid.canErase || true;
    }
}
