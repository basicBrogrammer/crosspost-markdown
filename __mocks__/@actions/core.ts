// Mocking @actions/core
export const getInput = (key: string) => {
  switch (key) {
    case 'dev-to-token':
      return 'dev-to-token-testing';
    case 'medium-token':
      return '';
    case 'github-token':
      return 'gh-token-mock';
    case 'content-dir':
      return '__tests__/fixtures/articles';
    case 'configured-publisher':
      return 'publisher-default-token';
    case 'invalid-publisher-key':
      return '';
    default:
      throw new Error(`Key not found: ${key}`);
  }
};

export const info = jest.fn();
export const setFailed = jest.fn();
