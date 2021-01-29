jest.mock('@actions/core');
jest.mock('node-fetch');
import {mocked} from 'ts-jest/utils';
import fetch, {Response, RequestInit} from 'node-fetch';
import DevTo from '../dev-to';

// paths
const published = '__tests__/fixtures/articles/published.md';
const unpublished = '__tests__/fixtures/articles/not-published.md';
const existing = '__tests__/fixtures/articles/existing-published.md';
import devToOk from '../../../__tests__/fixtures/dev-to/post/200.json';

// jest mocks
console.log = jest.fn();
console.table = jest.fn();
mocked(fetch).mockImplementation(async function (url: any, init?: RequestInit): Promise<any> {
  return {
    status: 200,
    ok: true,
    json: async () => devToOk,
  };
});

// TODO: prolly move to the Publisher test
test('initializes using the Publisher constructor', () => {
  const instance = new DevTo(published);

  // using the __mocks__/@actions/core to validate core.getInput was called
  // with 'dev-to-token'
  expect(instance.token).toEqual('dev-to-token-testing');
  expect(instance.data.title).toEqual('Published Article');
  expect(instance.data.published).toEqual(true);
  expect(instance.data.description).toEqual('This article is publishable');
  expect(instance.data.tags).toEqual('javascript, vue, github');
});

describe('publish', () => {
  // TODO: prolly move to the Publisher test
  test('unpublished article', () => {
    const instance = new DevTo(unpublished);
    instance.publish();
    expect(console.log).toHaveBeenCalledWith(`Article Unpublished Article NOT published. Skipping.`);
    expect(fetch).not.toHaveBeenCalled();
  });

  function flushPromises() {
    return new Promise((resolve) => setImmediate(resolve));
  }
  test('a successful create', async () => {
    const instance = new DevTo(published);
    instance.publish();

    expect(fetch).toHaveBeenCalledWith('https://dev.to/api/articles', {
      method: 'post',
      body: expect.any(String),
      headers: {'Content-Type': 'application/json', 'api-key': 'dev-to-token-testing'},
    });

    await flushPromises();

    expect(console.table).toHaveBeenCalledWith({
      title: 'Published Article',
      destination: 'DevTo',
      status: 200,
      slug: 'byte-sized-episode-2-the-creation-of-graph-theory-34g1',
      id: 150589,
    });
  });

  test('a successful update', async () => {
    const instance = new DevTo(existing);
    instance.publish();

    expect(fetch).toHaveBeenCalledWith('https://dev.to/api/articles/123', {
      method: 'put',
      body: expect.any(String),
      headers: {'Content-Type': 'application/json', 'api-key': 'dev-to-token-testing'},
    });

    await flushPromises();

    expect(console.table).toHaveBeenCalledWith({
      title: 'Existing Published Article',
      destination: 'DevTo',
      status: 200,
      slug: 'byte-sized-episode-2-the-creation-of-graph-theory-34g1',
      id: 150589,
    });
  });

  test.todo('on error');
});
