export class LocalStorageUtils {
    public getUser() {
            if (typeof localStorage !== 'undefined') {
                return JSON.parse(localStorage.getItem('bie.user') as string);
            }
            return null;
        }

    public saveUserLocalData(response: any) {
            this.saveUserToken(response.accessToken);
            this.saveUser(response.userToken);
    }

    public getUserToken() {
        if (typeof localStorage !== 'undefined') {
          return localStorage.getItem('bie.token');
        }
        return null;
      }

    public saveUserToken(token: string) {
        localStorage.setItem('bie.token', token);
    }
    
    public saveUser(user: string) {
        localStorage.setItem('bie.user', JSON.stringify(user));
    }

    public clearUserLocalData(){
        localStorage.removeItem('bie.token');
        localStorage.removeItem('bie.user');
    }
}
