const { exec } = require("child_process");
const notifier = require("node-notifier");
const getUserName = require("git-user-name");
const parse = require("parse-diff");
const args = require("minimist")(process.argv.slice(2));

const getWorkingDirectoryChanges = (gitDiff) => {
  const files = parse(gitDiff);
  let numberOfChanges = 0;
  files.forEach(function (file) {
    // numberOfChanges += file.deletions;
    // numberOfChanges += file.additions;
    numberOfChanges += file.chunks[0].changes.length;
  });

  return numberOfChanges;
};

const notifyAuthorForPullRequest = (allowedPRLines) => {
  const firstName = getUserName().split(" ")[0];
  const notificationIcon =
    args["icon"] || "https://afzaalb.vercel.app/common/afzaalb.jpg";

  notifier.notify({
    title: `${firstName}, Time for Pull Request`,
    message: `PR limit for ${allowedPRLines} line(s) has exceeded.`,
    icon: notificationIcon, // Absolute path (doesn't work on balloons)
    sound: true, // Only Notification Center or Windows Toasters
    wait: true, // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait or notify-send as it does not support the wait option
  });
};

const pullRequestNotifier = () => {
  const allowedPRLines = args["allowedLines"] || 100;

  exec("git diff", (err, stdout) => {
    if (err) {
      return;
    }

    const numberOfChanges = getWorkingDirectoryChanges(stdout);
    // Only Notify for PR when limit is reached/exceeded
    if (numberOfChanges >= allowedPRLines) {
      notifyAuthorForPullRequest(allowedPRLines);
    }
  });
};

module.exports = pullRequestNotifier();
