export class LocalStorageUtils {
    public saveUserLocalData(response: any) {
        this.saveUserToken(response.bearer);
        this.saveUser(response.userName);
    }

    public getUser() {
        if (typeof localStorage !== 'undefined') {
            let userJson = JSON.parse(localStorage.getItem('bie.user') as string);
            return userJson
        }
        return null;
    }

    public getUserToken() {
        if (typeof localStorage !== 'undefined') {
            let token = localStorage.getItem('bie.token');
            return token
        }
        return null;
    }

    public saveUserToken(token: string) {
        localStorage.setItem('bie.token', token);
    }

    public saveUser(user: string) {
        localStorage.setItem('bie.user', JSON.stringify(user));
    }

    public getLanguage(): string {
        if (typeof localStorage !== 'undefined') {
            return localStorage.getItem('bie.language') || 'pt';
        }
        return 'pt';
    }

    public saveLanguage(lang: string) {
        localStorage.setItem('bie.language', lang);
    }

    public clearUserLocalData() {
        localStorage.removeItem('bie.token');
        localStorage.removeItem('bie.user');
    }
}
