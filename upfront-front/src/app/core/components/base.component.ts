import {AuthService} from "../services/auth.service";
import {computed, Directive, inject, NgZone} from "@angular/core";
import {Subject} from "rxjs";

@Directive()
export class BaseComponent {
    user = computed(() => this.authService.currentUser());
    page = 0;
    size = 10;
    isLoading = false;
    isInitialLoad = true;
    hasMore = true;
    error: string | null = null;
    observer!: IntersectionObserver;
    destroy$ = new Subject<void>();
    ngZone: NgZone = inject(NgZone);
    constructor(protected authService: AuthService) {
    }

    firstName(name: string): string {
        const first = name?.split(' ')[0] || '';
        return first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();
    }

    fullName(name: string): string {
        const first = name?.split(' ')[0] || '';
        const second = name?.split(' ')[1] || '';
        return first.charAt(0).toUpperCase() + first.slice(1).toLowerCase() +　' '  + second.charAt(0).toUpperCase() + second.slice(1).toLowerCase();
    }

    initials(inputName: string): string {
        const name = inputName || '';
        return name
            .split(' ')
            .map(part => part.charAt(0))
            .join('')
            .toUpperCase();
    }

    destroy() {
        this.destroy$.next();
        this.destroy$.complete();
        this.observer?.disconnect();
    }

    trackByPostId(_index: number, post: any): string {
        return post.id;
    }
}