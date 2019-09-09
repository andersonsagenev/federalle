import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FuseConfigService } from "@fuse/services/config.service";
import { RequestService } from "@fuse/services/request.service";
import { fuseAnimations } from "@fuse/animations";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { LoginService } from "./login.service";

@Component({
    selector: "login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    providers: [LoginService]
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading: boolean;
    formView: boolean = true;
    color = "accent";
    mode = "indeterminate";
    value = 50;
    userLog: any;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _service: LoginService,
        private _request: RequestService,
        public snackBar: MatSnackBar
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            email: ["", [Validators.required, Validators.email]],
            password: ["", Validators.required]
        });
    }

    login() {
        this.loading = true;
        this.formView = false;
        console.log(this.loginForm.value);
        const data = this.loginForm.getRawValue();
        if (this.loginForm.valid) {
            this._service.logar(data.email, data.password, "").subscribe(
                user => {
                    this.loading = false;
                    console.log("logado ~~~~~~~~~~~>", user);
                    if (user) {
                       // localStorage.setItem("user", JSON.stringify(data.data));
                        this._router.navigate(["/apps/users"]);
                        this.loading = false;
                    } 
                },
                error => {
                    this.loading = false;
                    this.formView = true;
                    this.openSnackBar('Email não cadastrado ou senha inocrreta!', 'Erro');
                }
            );
        }
    }
    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 1000
        });
    }
}
