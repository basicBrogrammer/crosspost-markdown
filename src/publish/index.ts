import * as core from '@actions/core';
import DevTo from './dev-to';

const frontmatter = require('@github-docs/frontmatter');

const publish = async (path: string): Promise<void> => {
  try {
    new DevTo(path).publish();
  } catch (err) {
    core.setFailed(err.message);
  }
};

export default publish;
