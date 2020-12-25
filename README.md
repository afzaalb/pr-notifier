<p align="center">
  <img src="./preview.png?raw=true" alt="Notification Preview" title="Here's how a pr-notifier alert looks like!" />
</p>

# pr-notifier
pr-notifier is a native notification service which will alert you to create a pull request as soon as the allowed limit of changes is exceeded. The purpose is to avoid long pull requests for reviewers.

![Huge pull requests tend to be frustrating](./long-pr.png?raw=true "Huge pull requests tend to be frustrating")

### Installation

Either through cloning with git or by using [npm](http://npmjs.org) (the recommended way):

```bash
npm install -g pr-notifier
```

And pr-notifier will be installed globally to your system path.

You can also install pr-notifier as a development dependency:

```bash
npm install --save-dev pr-notifier
```

### Usage

There are two ways to add this service to your devlopment cycle.

Recommended way is to add this in a post development script or after `npm run dev` which usually watches for changes.
Example for use with nodemon:

If you have a nodemon.json file, add this command to the restart event:
```bash
"events": {
  "restart": "pr-notifier"
}
```

Using nodemon via CLI or within a package.json script:
```bash
nodemon ./server.js --exec pr-notifier
```

This will result in a native notification alert being generated every time the change limit exceeds.


Or just add as a script in package.json scripts section:
```bash
"pr:notify": "pr-notifier"
```
And execute `npm run pr:notify` wherever you want to.

### Arguments

pr-notifier can accepts two arguments(optional).
- `allowedLines (Default: 100)`
- `icon (Default: https://afzaalb.vercel.app/common/afzaalb.jpg)`

```bash
pr-notifier --allowedLines=120 --icon=absoluteIconUrl
```

Both arguments are optional but i'd recommend changing atleast `allowedLines` as per your own PR guidelines.

### Support

Currently this works on Linix/Unix based systems with NodeJS only. Windows support will be added in future.

Also don't forget to star the repo if you like what you see.

### Author
**Muhammad Afzaal**
- [Github](https://github.com/afzaalb)
- [Twitter](https://twitter.com/mafzaalkhalid?lang=en)
