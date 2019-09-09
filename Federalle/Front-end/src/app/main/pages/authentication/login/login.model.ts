export class Login {
    login: string;
    password: string;
    email: string;
    id: any;
    name: string;
    /**
     * Constructor
     *
     * @param authentication
     */
    constructor(authentication?) {
        authentication = authentication || {};
        this.id = authentication.id || '';
        this.login = authentication.login || '';
        this.password = authentication.password || ''
        this.email = authentication.email || ''
    }

}