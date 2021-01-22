const core = require('@actions/core');
const exec = require('@actions/exec');

const messages = {};
messages.exceptList = 'Source branch is in except list. Check was skipped';
messages.squash = 'Only 1 commit is possible in pull request. Please squash your commits';

try {
    const sourceBranch = core.getInput('source-branch');
    const targetBranch = core.getInput('target-branch');
    const exceptBranches = core.getInput('except-branches').split(';');
    const commitsCount = Number.parseInt(core.getInput('commits-count'));

    if (exceptBranches.includes(sourceBranch)) {
        core.info(messages.exceptList);
    } else {
        getCommitsCount(sourceBranch, targetBranch)
            .then(currentCommitsCount => {
                if (currentCommitsCount > commitsCount) {
                    core.setFailed(messages.squash);
                }
            });
    }

} catch (error) {
    core.setFailed(error.message);
}

async function getCommitsCount(sourceBranch, targetBranch) {

    try {
        let out = '';
        let err = '';
        const options = {
            listeners: {
                stdout: (data) => {
                    out += data.toString();
                },
                stderr: (data) => {
                    err += data.toString();
                }
            },
        };

        await exec.exec(`${__dirname}/commits-count.sh`, [sourceBranch, targetBranch], options);

        if (err) {
            core.setFailed(err);
            process.exit(0);
        } else {
            return Number.parseInt(out.trim());
        }
    } catch (error) {
        core.setFailed(`Error: ${error.message}`);
        process.exit(0);
    }
}
