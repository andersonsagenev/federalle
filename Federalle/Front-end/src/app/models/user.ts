import { FuseUtils } from '@fuse/utils';

export class User {
    id: string;
    registerDate: Date;
    name: string;
    email: string;
    login: string;
    password: string;
    main: Boolean;
    active: Boolean;
    confirmEmail: Boolean;
    photo: string;
    avatar: string;
    handle: string;
    canErase: Boolean;
    statusChat: string;
    moodChat: string;
    /**
     * Constructor
     *
     * @param user
     */
    constructor(user?) {
        user = user || {};
        this.id = user.id || '';
        this.registerDate = user.registerDate || new Date();
        this.name = user.name || ''
        this.handle = user.handle || FuseUtils.handleize(this.name);
        this.email = user.email || '';
        this.login = user.login || '';
        this.password = user.password || '';
        this.photo = user.photo || '';
        this.avatar = user.avatar || '';
        this.main = user.main || true;
        this.active = user.active || true;
        this.confirmEmail = user.confirmEmail || true;
        this.canErase = user.canErase || false;
        this.statusChat = user.statusChat || '';
        this.moodChat = user.moodChat || '';
     
    }

}
