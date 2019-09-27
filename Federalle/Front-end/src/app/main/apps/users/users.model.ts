import { FuseUtils } from '@fuse/utils';

export class User
{
    id: any;
    idResentante: any;
    idSector: any;
    name: string;
    email: string;
    login: string;
    photo: string;
    registerDate: any;
    type: any; 
    deadlinePassword: any; 
    password: any;
    passwordConfirm: any;
    recoverId: any;
    statusChat: any;
    moodChat: any;
    handle: any;
    canErase: any;
    chatlist: Chatlist[];
 

    /**
     * Constructor
     *
     * @param user
     */
    constructor(user)
    {
        {
            this.id = user.id || null;
            this.idResentante = user.idResentante || null;
            this.idSector = user.idSector || null;
            this.name = user.name || '';
            this.email = user.email || '';
            this.login = user.login || '';
            this.photo = user.photo || '';
            this.registerDate = user.registerDate || new Date();
            this.type = user.type || '';
            this.deadlinePassword = user.deadlinePassword || '';
            this.password = user.password || '';
            this.recoverId = user.recoverId || '';
            this.statusChat = user.statusChat || '';
            this.moodChat = user.moodChat || '';
            this.handle = user.handle || FuseUtils.handleize(this.name);;
            this.canErase = user.canErase || '';
            this.chatlist = user.chatlist || [];
            
        }
    }
}

export class Chatlist {
    chatId: string;
    contactId: string;
    lastMessageTime: Date;

    constructor(chatlist?) {
        chatlist = chatlist || {};
        this.chatId = chatlist.chatId || '';
        this.contactId = chatlist.contactId || '';
        this.lastMessageTime = chatlist.lastMessageTime || new Date();
    }
}
