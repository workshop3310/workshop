import {Octokit} from '@octokit/core';

const octokit = new Octokit({
  auth: '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',
});

export default octokit;
