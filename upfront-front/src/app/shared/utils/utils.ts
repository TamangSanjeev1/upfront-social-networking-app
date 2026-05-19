export class Utils {
    static formatDate(dateStr: string): string {
        return new Date(dateStr).toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' });
    }
}