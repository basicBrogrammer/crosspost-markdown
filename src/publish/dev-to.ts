import fetch from 'node-fetch';
import {Response} from 'node-fetch';
import Publisher from './publisher';

class DevTo extends Publisher {
  get tokenInput() {
    return 'dev-to-token';
  }
  _publish(): Promise<Response> {
    const body = {
      article: {
        body_markdown: this.markdown,
      },
    };

    // Post or a Put
    const url = this.data.devToId ? `https://dev.to/api/articles/${this.data.devToId}` : 'https://dev.to/api/articles';

    return fetch(url, {
      method: this.data.devToId ? 'put' : 'post',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'api-key': this.token,
      },
    });
  }
}

export default DevTo;

// fetch(url, {method: 'put', body: JSON.stringify(body), headers: {'Content-Type': 'application/json', 'api-key': token}}).then((res) => { console.table(res); return res.json(); }).then((x) => console.table(x)).catch((err) => console.log(err));
