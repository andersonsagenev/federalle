import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

import { FuseConfigService } from "@fuse/services/config.service";
import { fuseAnimations } from "@fuse/animations";
import { RequestService } from "@fuse/services/request.service";
import { ConfirmService } from "@fuse/services/confirm.service";
import { MatSnackBar } from "@angular/material";
import { ForgotPasswordService } from "./forgot-password.service";

@Component({
    selector: "forgot-password",
    templateUrl: "./forgot-password.component.html",
    styleUrls: ["./forgot-password.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    providers: [ForgotPasswordService]
})
export class ForgotPasswordComponent implements OnInit {
    forgotPasswordForm: FormGroup;
    email: any;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _request: RequestService,
        private _alert: ConfirmService,
        private _route: ActivatedRoute,
        private _router: Router,
        public _snackBar: MatSnackBar,
        private _service: ForgotPasswordService
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
        this.forgotPasswordForm = this._formBuilder.group({
            email: ["", [Validators.required, Validators.email]]
        });

        const routeParams = this._route.snapshot.params;

        if (routeParams.email) {
            this.email = routeParams.email;
            console.log("email ===>", this.email);
            if (this.email) {
                this.forgotPasswordForm.controls["email"].setValue(this.email);
            }
        }
    }

    resetPassword() {
        const data = this.forgotPasswordForm.getRawValue();
        this._service.recover(data.email).subscribe(
            user => {
                if (user) {
                    this._router.navigate(["/pages/auth/mail-confirm"]);
                }
            },
            error => {
                this.openSnackBar(data.message, "Fechar");
            }
        );
    }

    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
            duration: 1500
        });
    }
}
