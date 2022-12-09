import HttpClient from '@lib/http-client';

class MainApi extends HttpClient {
  private static classInstance?: MainApi;

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new MainApi();
    }
    return this.classInstance;
  }

  // --- Write Request Here --- //
  public getUser = (route: string) => this.instance.get<[]>(`/user/${route}`);
}
export default MainApi;
