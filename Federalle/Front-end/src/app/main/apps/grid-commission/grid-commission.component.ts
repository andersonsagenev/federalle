import { Component, OnDestroy, OnInit, TemplateRef,ElementRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MatSort, MatTableDataSource } from '@angular/material';
import { Subject } from 'rxjs';
import { RequestService } from '@fuse/services/request.service';
import { ConfirmService } from '@fuse/services/confirm.service';
import { debounceTime, distinctUntilChanged, takeUntil } from "rxjs/operators";
import Swal from 'sweetalert2'
import { Router, ActivatedRoute } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { UserService } from 'app/main/apps/users/users.service';
import { UserFormDialogComponent } from 'app/main/apps/users/user-form/user-form.component';


@Component({
    selector: 'users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class UsersComponent implements OnInit, OnDestroy {
    @ViewChild('dialogContent')
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild("myElem") MyProp :ElementRef;

    displayedColumns: string[] = ['avatar', 'name', 'email', 'buttons'];
    dataSource: any;
    dialogContent: TemplateRef<any>;
    dialogRef: any;
    hasSelectedStudents: boolean;
    searchInput: FormControl;
    users: any;
    user: any;
    selectedContacts: any[];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    selectedStudent: any = [];
    //pagination
    limit = 30;
    index = 1;
    page: any;
    pages = [];
    numPages: any;
    page_number: any;
    total: number;
    companyId: any;
    userLog: any;
    _disabled: boolean = false;
    exist_user: boolean = false;
    hide: boolean = true;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {UserService} _userService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _userService: UserService,
        private _fuseSidebarService: FuseSidebarService,
        public _matDialog: MatDialog,
        private _request: RequestService,
        private _confirm: ConfirmService,
        private _router: Router,
        private _alert: ConfirmService
    ) {
        // Set the defaults
        this.searchInput = new FormControl('');
        this._unsubscribeAll = new Subject();
       // this.currentCompany = "";
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.userLog = localStorage.getItem('user')
        if (this.userLog) {
           
        } else {
            this.logout();
        }

        this._userService.onUsersChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(data => {
                console.log('retorno de usuarios ~~>', data)
                if(data){
                    this.exist_user = true;
                this.users = data
                }else{
                    this.exist_user = false;
                }
            });
            this.searchInput.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                distinctUntilChanged()
            )
            .subscribe(searchText => {
                this._userService.onSearchTextChanged.next(searchText);
            });

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
    * Edit user 
    *
    * @param user
    */
    editUser(user: any): void {
        console.log('usuario para update', user)
        this.dialogRef = this._matDialog.open(UserFormDialogComponent, {
            panelClass: 'user-form-dialog',
            data: {
                person: user,
                action: 'editar'
            }
        });
        this.dialogRef.afterClosed()
            .subscribe(response => {
                if (!response) {
                    return;
                }
                const actionType: string = response[0];
                const formData: FormGroup = response[1];
                switch (actionType) {
                    /**
                     * Update
                     */
                    case 'update':
                        console.log('usuario updatado...', formData.getRawValue())
                        this._userService.UserUpdate(response.getRawValue());
                        break;
                    /**
                     * Delete
                     */
                    case 'delete':
                        this.ConfirmDelete(user);
                        break;
                }
            });
    }

    /**
    * New user
    */
   newUser(): void {
        this.dialogRef = this._matDialog.open(UserFormDialogComponent, {
            panelClass: 'user-form-dialog',
            data: {
                action: 'new',
            }
        });

        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if (!response) {
                    return;
                }

                // this.getAlunos(1)
            });
    }

  
    /**
     * Delete Confirm
     */
    ConfirmDelete(student: any): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Tem certeza de que deseja excluir?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.deleteStudent(student);
            }
            this.confirmDialogRef = null;
        });
    }
    /**
     * Delete student
     */
    deleteStudent(student: any): void {
        this._request.server('/api/user/' + student.id, 'delete').subscribe(data => {
            console.log('Retorno', data)
            // this.getAlunos(1)
            this._confirm.SwalDelete()
        }, error => {
            Swal.fire({
                title: 'Erro!',
                text: 'Erro ao excluir cadastro',
                type: 'error',
                confirmButtonText: 'Fechar'
            })
            console.log('Error', error)
        })
    }

    logout(): void {
        this._request.server('/api/logout', 'post').subscribe(data => {
            localStorage.removeItem('user');
            this._router.navigate(['/pages/login']);
        }, error => {
            console.log('Error', error)
        })
    }

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
}
