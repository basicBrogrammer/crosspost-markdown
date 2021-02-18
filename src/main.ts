import * as core from '@actions/core';
import {getFiles} from './get-files';
import DevTo from './publish/dev-to';
import Medium from './publish/medium';

async function run(): Promise<void> {
  try {
    // test files
    // const files = ['__tests__/fixtures/articles/published.md', '__tests__/fixtures/articles/not-published.md'];
    const files = await getFiles();
    files.forEach((path: string) => {
      new DevTo(path, 'dev-to-token').publish();
      new Medium(path, 'medium-token').publish();
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
