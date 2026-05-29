import {BaseComponent} from "../../core/components/base.component";
import {computed, Directive, inject, Input, OnDestroy} from "@angular/core";
import {AuthService} from "../../core/services/auth.service";
import {UserService} from "../../shared/services/services/user.service";
import {UserProfile} from "../../core/models/common-model";
import {RefreshService} from "../../shared/services/services/refresh-service";
import {
    DeleteConfirmationDialogComponent
} from "../../dashboard/delete-confirmation-dialog/delete-confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PaginationService} from "../../shared/services/services/pagination.service";
import {Apiconstants} from "../../shared/apiconstants";

@Directive()
export class UserProfileBaseComponent extends BaseComponent implements OnDestroy {
    @Input() viewUserInfo: UserProfile | null = null;
    viewUser = computed(() => this.userService.viewUser());
    protected dialog: MatDialog = inject(MatDialog);
    protected snackBar: MatSnackBar = inject(MatSnackBar);
    protected paginationService: PaginationService = inject(PaginationService);
    protected userService: UserService = inject(UserService);
    protected refreshService = inject(RefreshService);

    constructor(authService: AuthService) {
        super(authService);
    }

    ngOnDestroy(): void {
        this.userService.viewUser.set(null);
    }

    editPost(postId: number): void {
        console.log('Edit clicked');
    }

    openDeleteDialog(postId: number): void {
        const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
            width: '350px',
            data: {
                title: 'Delete Post',
                message: 'Are you sure you want to delete this post?'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.deletePost(postId);
            }
        });
    }

    deletePost(id: number): void {
        this.paginationService.deleteRequest(Apiconstants.POST + "/", id).subscribe({
            next: user => {
                this.refreshService.triggerRefresh();
                this.snackBar.open('Post Deleted successfully!', '✕', {
                    duration: 3500,
                    panelClass: ['snack-success'],
                })
            },
            error: () => this.snackBar.open('Post could not be deleted!', '✕', {
                duration: 3500,
                panelClass: ['snack-fail'],
            })
        });
    }
}
