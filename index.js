const { exec } = require("child_process");
const notifier = require("node-notifier");
const getUserName = require("git-user-name");
const parse = require("parse-diff");

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

const notifyAuthorForPullRequest = (numberOfChanges) => {
  const firstName = getUserName().split(" ")[0];
  notifier.notify(
    {
      title: `${firstName}, Time for Pull Request`,
      message: `PR limit for ${numberOfChanges} lines has exceeded.`,
      icon: "https://cloud.lunchon.ae/static/onIco.png", // Absolute path (doesn't work on balloons)
      sound: true, // Only Notification Center or Windows Toasters
      wait: true, // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait or notify-send as it does not support the wait option
    },
    function (err, response, metadata) {
      console.log("Notifier callback", err, response, metadata);
      // Response is response from notification
      // Metadata contains activationType, activationAt, deliveredAt
    }
  );

  notifier.on("click", function (notifierObject, options, event) {
    // Triggers if `wait: true` and user clicks notification
  });

  notifier.on("timeout", function (notifierObject, options) {
    // Triggers if `wait: true` and notification closes
  });
};

const pullRequestNotifier = (allowedPRLines = 100) => {
  exec("git diff", (err, stdout) => {
    if (err) {
      return;
    }
    const numberOfChanges = getWorkingDirectoryChanges(stdout);

    // Only Notify for PR when limit is reached/exceeded
    if (numberOfChanges >= allowedPRLines) {
      notifyAuthorForPullRequest(numberOfChanges);
    }
  });
};

module.exports = { pullRequestNotifier };
