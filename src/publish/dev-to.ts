import fetch from 'node-fetch';
import * as core from '@actions/core';

class DevTo {
  token: string;
  constructor() {
    this.token = core.getInput('dev-to-token');
  }

  async publish(body_markdown: string): Promise<any> {
    const body = {
      article: {
        body_markdown,
      },
    };

    return fetch('https://dev.to/api/articles', {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'api-key': this.token,
      },
    }).then((response: any) => response.json());
  }
}

export default new DevTo();
