export class ApiClient {
  private static readonly baseUrl = 'https://drive.google.com/u/0/uc?export=download&id=';
  
  static async fetch<T>(endpoint: string, method: 'GET' = 'GET'): Promise<T> {
    const response = await this.responseFrom(endpoint, method);
    if (response.status !== 200) throw new Error(`Fetch to ${endpoint} failed with ${response.statusText}`);
          
    return response.json();
  }
  
  private static responseFrom(endpoint: string, method: 'GET'):Promise<Response> {
    const url = this.baseUrl + endpoint;
    return fetch(url, { method });
  }
}