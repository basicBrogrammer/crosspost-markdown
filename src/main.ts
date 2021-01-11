import * as core from '@actions/core'
import * as github from '@actions/github'
import * as Webhooks from '@octokit/webhooks'

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

async function run(): Promise<void> {
  try {
    const files = await getFiles()
    files.forEach(file => console.log(`File: ${file}`))
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
