const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  const token = core.getInput('repo-token', { required: true });
  const { owner, repo } = github.context.repo;
  const sha = github.context.sha;

  const octokit = github.getOctokit(token);

  const checkRuns = await octokit.checks.listForRef({
    owner,
    repo,
    ref: sha
  });

  const lastCheckRun = checkRuns.data.check_runs[0];

  if (lastCheckRun.conclusion !== 'success') {
    core.setFailed('Build failed. Check the "Checks" tab for more information.');
  }
}

run();
