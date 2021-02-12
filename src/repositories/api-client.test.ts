import fetchMock from 'fetch-mock';
import { ApiClient } from './api-client';

describe('ApiClient', () => {
  it('fetchs data from a url', async () => {
    const expectedData = { id: 'an-id' };
    const url = '/a-url';
    mockUrl(url, expectedData);

    const data = await ApiClient.fetch(url);

    expect(data).toEqual(expectedData);
  });

  it('throws an exception if fetch fail', async () => {
    const url = '/a-url';
    mockUrl(url, { status: 500 });

    try {
      await ApiClient.fetch(url);
    } catch (err) {
      expect(err).toEqual(new Error(`Fetch to ${url} failed with Internal Server Error`));
    }
  });

  const mockUrl = (url: string, response:Object):void => {
    fetchMock.mock(`https://raw.githubusercontent.com/Rumpelstinsk/streamloots/main/cards.json?${url}`, response, { overwriteRoutes: true });
  };
});