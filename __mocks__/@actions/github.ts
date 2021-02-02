class GitFile {
  filename: string;
  constructor(filename: string) {
    this.filename = filename;
  }
}

class Commit {
  get data() {
    return {
      files: [
        new GitFile('__tests__/fixtures/articles/published.md'),
        new GitFile('__tests__/fixtures/articles/not-published.md'),
        new GitFile('__tests__/fixtures/articles/existing-published.md'),
        new GitFile('__tests__/fixtures/not-articles/file-not-included.md'),
        new GitFile('some/other/path.md'),
      ],
    };
  }
}

export const context = {
  repo: {info: 'foo'},
  sha: '123',
};

export const getOctokit = (token: string): any => {
  return {
    repos: {
      getCommit: () => new Commit(),
    },
  };
};
