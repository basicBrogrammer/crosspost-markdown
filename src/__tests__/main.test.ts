import DevTo from '../publish/dev-to';
import flushPromises from './flush-promises';

jest.mock('../publish/dev-to');
jest.mock('node-fetch');

it('runs files throw the respective publishers', async () => {
  require('../main');
  await flushPromises();
  [
    '__tests__/fixtures/articles/published.md',
    '__tests__/fixtures/articles/not-published.md',
    '__tests__/fixtures/articles/existing-published.md',
  ].forEach((path) => {
    expect(DevTo).toHaveBeenCalledWith(path, 'dev-to-token');
  });
});
