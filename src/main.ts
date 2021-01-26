import * as core from '@actions/core';
import {getFiles} from './get-files';
import publish from './publish';

async function run(): Promise<void> {
  try {
    // test files
    // const files = ['__tests__/fixtures/articles/published.md', '__tests__/fixtures/articles/not-published.md'];
    const files = await getFiles();
    files.forEach(publish);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
