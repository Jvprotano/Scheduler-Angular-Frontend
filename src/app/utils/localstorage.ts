export class LocalStorageUtils {
    public getUser() {
        return JSON.parse(localStorage.getItem('bie.user') || "");
    }

    public saveUserLocalData(response: any) {
        this.saveUserToken(response.accessToken);
        this.saveUser(response.userToken);
    }

    public getUserToken(): string | null {
        return localStorage.getItem('bie.token');
    }

    public saveUserToken(token: string) {
        localStorage.setItem('bie.token', token);
    }
    
    public saveUser(user: string) {
        localStorage.setItem('bie.token', JSON.stringify(user));
    }

    public clearUserLocalData(){
        localStorage.removeItem('bie.token');
        localStorage.removeItem('bie.user');
    }
}
