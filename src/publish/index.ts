import * as core from '@actions/core';
import * as fs from 'fs';
import devTo from './dev-to';

const frontmatter = require('@github-docs/frontmatter');

const logResponse = async (title: string, destination: string, publishCallback: Promise<any>): Promise<void> => {
  const {status} = await publishCallback;
  console.table({title, destination, status});
};

const publish = async (path: string): Promise<void> => {
  try {
    const markdown = fs.readFileSync(`./${path}`, 'utf8');
    const {data} = frontmatter(markdown);

    if (data.published) {
      if (core.getInput('dev-to-token').length > 0) {
        logResponse(data.title, 'Dev.to', devTo.publish(markdown));
      }
    } else {
      console.log(`Article ${data.title} NOT published. Skipping.`);
    }
  } catch (err) {
    core.setFailed(err.message);
  }
};

export default publish;
