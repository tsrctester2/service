const assert = require('assert');
const fsPromises = require('fs').promises;
const { postSetVote,
        postGetPRvoteStatus,
        postGetPRvoteTotals,
        postCreateRepo,
        postNewPullRequest
      } = require('../../../graphQLrequests')
const { Parser } = require('graphql/language/parser');

var snooze_ms = 1500;;

// We call this at the top of each test case, otherwise nodeosd could
// throw duplication errors (ie, data races).
const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));

describe('Vote.', function () {
    this.timeout(snooze_ms*50);
    // Increase mocha(testing framework) time, otherwise tests fails
    describe('Many voters vote.', function () {
      it("Should increment vote and then close and merge on quorum.", async () => {
        async function getGithubUser() {
            const data = await fsPromises.readFile('.config.json')
                               .catch((err) => console.error('Failed to read file', err));

            let json = JSON.parse(data);
            let user = json.github.user
            if (user === undefined) {
              throw new Error("Failed to load Github user " + user);

            } else {
              console.log("Successfully read Github " + user);
            }

            return user

        }
        const user  = await getGithubUser();

        await postSetVote(
            /*owner:*/ user,
            /*repo:*/ "demo",
            /*pr_id:*/ "issue_5",
            /*contributor:*/ user,
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        const sevenDbVoteCumm = await postGetPRvoteTotals(
            /*owner:*/ user,
            /*repo:*/ "demo",
            /*pr_id:*/ "issue_5",
            /*contributor:*/ user,
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        await postSetVote(
            /*owner:*/ user,
            /*repo:*/ "demo",
            /*pr_id:*/ "issue_5",
            /*contributor_id:*/ "am",
            /*side:*/ "no",
        );
        await snooze(snooze_ms);
        const amDbVoteCumm = await postGetPRvoteTotals(
            /*owner:*/ user,
            /*repo:*/ "demo",
            /*pr_id:*/ "issue_5",
            /*contributor_id:*/ "am",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        await postSetVote(
            /*owner:*/ user,
            /*repo:*/ "demo",
            /*pr_id:*/ "issue_5",
            /*contributor_id:*/ "jc",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        const jcVoteCumm = await postGetPRvoteTotals(
            /*owner:*/ user,
            /*repo:*/ "demo",
            /*pr_id:*/ "issue_5",
            /*contributor_id:*/ "jc",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        await postSetVote(
            /*owner:*/ user,
            /*repo:*/ "demo",
            /*pr_id:*/ "issue_5",
            /*contributor_id:*/ "pc",
            /*side:*/ "no",
        );
        await snooze(snooze_ms);
        const pcVoteCumm = await postGetPRvoteTotals(
            /*owner:*/ user,
            /*repo:*/ "demo",
            /*pr_id:*/ "issue_5",
            /*contributor_id:*/ "pc",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        await postSetVote(
            /*owner:*/ user,
            /*repo:*/ "demo",
            /*pr_id:*/ "issue_5",
            /*contributor_id:*/ "mb",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        const mbVoteCumm = await postGetPRvoteTotals(
            /*owner:*/ user,
            /*repo:*/ "demo",
            /*pr_id:*/ "issue_5",
            /*contributor_id:*/ "mb",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        await postSetVote(
            /*owner:*/ user,
            /*repo:*/ "demo",
            /*pr_id:*/ "issue_5",
            /*contributor_id:*/ "np",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        const npVoteCumm = await postGetPRvoteTotals(
            /*owner:*/ user,
            /*repo:*/ "demo",
            /*pr_id:*/ "issue_5",
            /*contributor_id:*/ "np",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        await postSetVote(
            /*owner:*/ user,
            /*repo:*/ "demo",
            /*pr_id:*/ "issue_5",
            /*contributor_id:*/ "nn",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        const nnVoteCumm = await postGetPRvoteTotals(
            /*owner:*/ user,
            /*repo:*/ "demo",
            /*pr_id:*/ "issue_5",
            /*contributor_id:*/ "nn",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        await postSetVote(
            /*owner:*/ user,
            /*repo:*/ "demo",
            /*pr_id:*/ "issue_5",
            /*contributor_id:*/ "jp",
            /*side:*/ "no",
        );
        await snooze(snooze_ms);
        const jpVoteCumm = await postGetPRvoteTotals(
            /*owner:*/ user,
            /*repo:*/ "demo",
            /*pr_id:*/ "issue_5",
            /*contributor_id:*/ "jp",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        await postSetVote(
            /*owner:*/ user,
            /*repo:*/ "demo",
            /*pr_id:*/ "issue_5",
            /*contributor_id:*/ "ts",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        const tsVoteCumm = await postGetPRvoteTotals(
            /*owner:*/ user,
            /*repo:*/ "demo",
            /*pr_id:*/ "issue_5",
            /*contributor_id:*/ "ts",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        await postSetVote(
            /*owner:*/ user,
            /*repo:*/ "demo",
            /*pr_id:*/ "issue_5",
            /*contributor_id:*/ "af",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        const afVoteCumm = await postGetPRvoteTotals(
            /*owner:*/ user,
            /*repo:*/ "demo",
            /*pr_id:*/ "issue_5",
            /*contributor_id:*/ "af",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        await postSetVote(
            /*owner:*/ user,
            /*repo:*/ "demo",
            /*pr_id:*/ "issue_5",
            /*contributor_id:*/ "ds",
            /*side:*/ "no",
        );
        await snooze(snooze_ms);
        const dsVoteCumm = await postGetPRvoteTotals(
            /*owner:*/ user,
            /*repo:*/ "demo",
            /*pr_id:*/ "issue_5",
            /*contributor_id:*/ "ds",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        await postSetVote(
            /*owner:*/ user,
            /*repo:*/ "demo",
            /*pr_id:*/ "issue_5",
            /*contributor_id:*/ "ri",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        const riVoteCumm = await postGetPRvoteTotals(
            /*owner:*/ user,
            /*repo:*/ "demo",
            /*pr_id:*/ "issue_5",
            /*contributor_id:*/ "ri",
            /*side:*/ "yes",
        );
        assert.equal(
            sevenDbVoteCumm,
            "0.033999",
            "Fail to add votes."
        );
        //assert.equal(
        //    amVoteCumm =
        //    "0.snooze_ms0",
        //    "Fail to add votes."
        //);
        //assert.equal(
        //    jcVoteCumm =
        //    "0.10000",
        //    "Fail to add votes."
        //);
        //assert.equal(
        //    pcVoteCumm =
        //    "0.75000",
        //    "Fail to add votes."
        //);
        //assert.equal(
        //    mbVoteCumm =
        //    "0.5000",
        //    "Fail to add votes."
        //);
        //assert.equal(
        //    npVoteCumm =
        //    "0.499999",
        //    "Fail to add votes."
        //);
        //assert.equal(
        //    nnVoteCumm =
        //    "0.499999",
        //    "Fail to add votes."
        //);
        //assert.equal(
        //    jpVoteCumm =
        //    "0.499999",
        //    "Fail to add votes."
        //);
        //assert.equal(
        //    tsVoteCumm =
        //    "0.499999",
        //    "Fail to add votes."
        //);
        //assert.equal(
        //    afVoteCumm =
        //    "0.499999",
        //    "Fail to add votes."
        //);
        //assert.equal(
        //    dsVoteCumm =
        //    "0.499999",
        //    "Fail to add votes."
        //);
        const openStatus = await postGetPRvoteStatus(
            /*owner:*/ user,
            /*repo:*/ "demo",
            /*pr_id:*/ "issue_5",
            /*contributor_id:*/ "ri",
            /*side:*/ "yes",
        );
        assert.equal(
            riVoteCumm,
            "0.499999",
            "Fail to add votes."
        );
        assert.equal(
            openStatus,
            "open",
            "Fail to stay open even the votes are below the quorum"
        );
      });
    });
});