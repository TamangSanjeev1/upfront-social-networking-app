export class Utils {
    static formatDate(dateStr: string): string {
        return new Date(dateStr).toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' });
    }

    static timeAgo(dateString: string): string {
        const now = new Date().getTime();
        const created = new Date(dateString).getTime();

        const seconds = Math.floor((now - created) / 1000);

        if (seconds < 60) {
            return 'just now';
        }

        const minutes = Math.floor(seconds / 60);

        if (minutes === 1) {
            return '1 minute ago';
        }

        if (minutes < 60) {
            return `${minutes} minutes ago`;
        }

        const hours = Math.floor(minutes / 60);

        if (hours === 1) {
            return '1 hour ago';
        }

        if (hours < 24) {
            return `${hours} hours ago`;
        }

        const days = Math.floor(hours / 24);

        if (days === 1) {
            return '1 day ago';
        }

        return `${days} days ago`;
    }

    static calculateStars(ratingInp: any) {
        if (!ratingInp) return '';
        const rating = ratingInp;
        const full = Math.floor(rating);
        const half = rating % 1 >= 0.5 ? 1 : 0;
        return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - half);
    }

    static formatNum(n: number) {
        if (n >= 1000) return (n/1000).toFixed(1) + 'K';
        return n.toString();
    }
}