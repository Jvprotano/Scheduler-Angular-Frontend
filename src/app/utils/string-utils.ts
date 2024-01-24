export class StringUtils {
    public static isNullOrEmpty(value: string): boolean {
        return value === null || value === undefined || value === '';
    }

    public static onlyNumbers(value: string): string {
        return value.replace(/\D/g, '');
    }
}