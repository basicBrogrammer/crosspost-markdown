import * as core from '@actions/core'
import * as github from '@actions/github'
import * as Webhooks from '@octokit/webhooks'

async function run(): Promise<void> {
  try {
    const octokit = github.getOctokit(core.getInput('github-token'))
    const commit = await octokit.repos.getCommit({
      ...github.context.repo,
      ref: github.context.sha
    })
    const files = (commit?.data?.files || [])
      .map((file: any) => file.filename)
      .filter((filename: string) =>
        filename.includes(core.getInput('content-dir'))
      )

    files.forEach(file => console.log(`File: ${file}`))
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
