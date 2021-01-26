import * as fs from 'fs';
import * as core from '@actions/core';
import {Response} from 'node-fetch';
const frontmatter = require('@github-docs/frontmatter');

export default class Publisher {
  token: string;
  markdown: string = 'not-configured';
  data: any = null;
  content: string | null = null;

  constructor(path: string) {
    this.token = core.getInput(this.tokenInput) || 'needs-to-be-configured';
    if (this._isConfigured) {
      // setting the markdown to be used in _publish because
      // frontmatter.stringify can have issues posting.
      this.markdown = fs.readFileSync(`./${path}`, 'utf8');
      const {data, content} = frontmatter(this.markdown);
      this.data = data;
      this.content = content;
    } else {
      core.info('Not configured');
    }
  }

  publish() {
    if (!this._isConfigured) return;

    if (this.data?.published) {
      this._logResponse(this._publish());
    } else {
      console.log(`Article ${this.data?.title} NOT published. Skipping.`);
    }
  }

  _publish(): Promise<Response> {
    console.warn('Child class should implement.');
    return Promise.resolve(new Response(undefined));
  }

  async _logResponse(response: Promise<Response>) {
    const res = await response;
    const body = await res.json();

    console.table({
      title: this.data.title,
      destination: this.constructor.name,
      status: res.status,
      slug: body.slug,
      id: body.id,
    });
  }

  get _isConfigured() {
    return !!this.token;
  }
  get tokenInput() {
    return '';
  }
}
