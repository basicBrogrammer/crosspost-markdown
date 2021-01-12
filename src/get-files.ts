import * as core from '@actions/core';
import * as github from '@actions/github';

export const getFiles = async (): Promise<string[]> => {
  const octokit = github.getOctokit(core.getInput('github-token'));
  const commit = await octokit.repos.getCommit({
    ...github.context.repo,
    ref: github.context.sha,
  });

  return (commit?.data?.files || [])
    .map((file: any) => file.filename)
    .filter((filename: string) => filename.includes(core.getInput('content-dir')));
};
