import {getFiles} from '../get-files';

it('returns a list of file paths within then given cotent-dir action argument', () => {
  expect(getFiles()).resolves.toEqual([
    '__tests__/fixtures/articles/published.md',
    '__tests__/fixtures/articles/not-published.md',
    '__tests__/fixtures/articles/existing-published.md',
  ]);
});
