// Mocking @actions/core
export const getInput = (key: string) => {
  switch (key) {
    case 'dev-to-token':
      return 'dev-to-token-testing';
    case 'github-token':
      return 'gh-token-mock';
    case 'content-dir':
      return '__tests__/fixtures/articles';
    default:
      throw new Error(`Key not found: ${key}`);
  }
};
