import fetch from 'node-fetch';
import {Response} from 'node-fetch';
import Publisher from './publisher';
import * as core from '@actions/core';

class Medium extends Publisher {
  _publish(): Promise<Response> {
    const body = {
      title: this.data.title,
      contentFormat: 'markdown',
      content: this.content,
      tags: this.data.tags.split(',').map((tag: string) => tag.trim()),
      publishStatus: 'public',
    };

    return fetch(`https://api.medium.com/v1/users/${this.authorId}/posts`, {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  get authorId(): string {
    return core.getInput('medium-author-id');
  }
}

export default Medium;
