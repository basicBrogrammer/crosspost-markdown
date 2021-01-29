// Mocking @actions/core
export const getInput = (key: string) => {
  switch (key) {
    case 'dev-to-token':
      return 'dev-to-token-testing';
    default:
      throw new Error(`Key not found: ${key}`);
  }
};
