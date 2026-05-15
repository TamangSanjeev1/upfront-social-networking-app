import {AuthService} from "../services/auth.service";
import {computed} from "@angular/core";

export class BaseComponent {
    user = computed(() => this.authService.currentUser());

    constructor(protected authService: AuthService) {
    }

    get firstName(): string {
        const first = this.user()?.name?.split(' ')[0] || '';
        return first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();
    }

    get initials(): string {
        const name = this.user()?.name || '';
        return name
            .split(' ')
            .map(part => part.charAt(0))
            .join('')
            .toUpperCase();
    }
}