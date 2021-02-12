export class ApiClient {
  private static readonly baseUrl = 'https://raw.githubusercontent.com/Rumpelstinsk/streamloots/main/cards.json?';
  
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