import * as core from '@actions/core'
import * as github from '@actions/github'
import * as Webhooks from '@octokit/webhooks'
import * as fs from 'fs'
const frontmatter = require('@github-docs/frontmatter')

const getFiles = async (): Promise<string[]> => {
  const octokit = github.getOctokit(core.getInput('github-token'))
  const commit = await octokit.repos.getCommit({
    ...github.context.repo,
    ref: github.context.sha
  })

  return (commit?.data?.files || [])
    .map((file: any) => file.filename)
    .filter((filename: string) =>
      filename.includes(core.getInput('content-dir'))
    )
}

const publish = async (path: string) => {
  try {
    const markdown = fs.readFileSync(`./${path}`, 'utf8')
    const {data} = frontmatter(markdown)

    if (data.published) {
      // logResponse(data.title, 'Dev.to', devTo.publish(markdown))
      console.log(`Article ${data.title} published.`)
    } else {
      console.log(`Article ${data.title} NOT published. Skipping.`)
    }
  } catch (err) {
    console.error(err)
  }
}

async function run(): Promise<void> {
  try {
    const files = await getFiles()
    files.forEach(publish)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
