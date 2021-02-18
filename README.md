# Crosspost Markdown

If a tree falls in the woods, does it make a sound?

Publish your repo's markdown to multiple distributors with a simple `git push`, so that when your tree falls, it makes a sound.

## Current Integration

- [DEV](https://dev.to)

Create an Issue if you have another distributor that you'd like to add to this git action.

## Arguments

|       Input        |                                                 Description                                                 |   Usage    |
| :----------------: | :---------------------------------------------------------------------------------------------------------: | :--------: |
|   `github-token`   |                                              GitHub Auth Token                                              | _Required_ |
|   `content-dir`    |                Path from the root to your markdown files. Defaults to `./content/articles/`                 |  Optional  |
|   `dev-to-token`   |                           API token for dev.to. (https://dev.to/settings/account)                           | _Required_ |
|   `medium-token`   |                          API token for medium.to. (https://medium.com/me/settings)                          | _Optional_ |
| `medium-author-id` | You can access your author id from the (User Endpoint)[https://github.com/Medium/medium-api-docs#31-users]. | _Optional_ |

## Example usage

```yaml
name: CrossPost

on:
  push:
    paths:
      - 'content/articles/*.md'

jobs:
  crosspost:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v2

      - uses: basicBrogrammer/crosspost-markdown@v0.1.1
        with:
          content-dir: 'content/articles/'
          dev-to-token: ${{ secrets.DEV_TO }}
          github-token: ${{ secrets.GITHUB_TOKEN }}
```

## Contribute

This action is still under construction.
Report any issues you have.
Pull requests welcome. 🤙
