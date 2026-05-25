import {BaseComponent} from "../../core/components/base.component";
import {computed, Directive, Input, OnDestroy} from "@angular/core";
import {AuthService} from "../../core/services/auth.service";
import {UserService} from "../../shared/services/services/user.service";
import {UserProfile} from "../../core/models/common-model";

@Directive()
export class UserProfileBaseComponent extends BaseComponent implements OnDestroy {
    @Input() viewUserInfo: UserProfile | null = null;
    viewUser = computed(() => this.userService.viewUser());

    constructor(authService: AuthService, protected userService: UserService) {
        super(authService);
    }

    ngOnDestroy(): void {
        this.userService.viewUser.set(null);
    }
}
