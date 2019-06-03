# Smilo Readme

This readme serves as an extra readme documenting the knowledge gathered by the Smilo team while working on the Smilo Browser Extension. It also contains an overview of the changes made by the Smilo team.

## Read the docs!

The `./docs` folder contains a lot of information provided by the MetaMask team. Before you start working on this project make sure you have at least read through this documentation.

## QA tips

The [MetaMask QA docs](./docs/QA_Guide.md) provides a good starting point on testing before a release. Things to keep in mind though:

- If you want to test deployment of a dapp you can use [the Smilo Remix website](https://remix.smilo.network). 
- You can replace MEW (My Ether Wallet) with [the Smilo Wallet](https://smilowallet.io).
- You can replace references to various Ethereum test nets simply with the Smilo Test net.

## Creating a new release

First update the plugin manifest found in `./app/manifest.json`. Make sure the `manifest_version` is newer than the current release. If merging with the MetaMask team this value is most likely updated already.

Also see [this MetaMask readme](./docs/bumping_version.md).

Next run the dist command:

```
npm run dist
```

This will clean any old builds, create a new distribution build and create a zipped version of the source code.

Next open the `builds` folder to find browser specific builds. You will also find `src.zip` which you will need when uploading to Firefox.

## Tips when merging with the MetaMask team

Merging changes from the MetaMask team is bound to lead to merge conflicts. Below we share some tips which might help to make this process a little less painful.

- Only merge official tagged releases. A list of official releases can be found [here](https://github.com/MetaMask/metamask-extension/releases). These releases have been tested properly by the MetaMask team. Merging anything else increases the risk of merging bugs introduced by the MetaMask team.
- Incrementally merge changes. By incrementally merging each release you decrease the amount of merge conflicts. This also allows you to test each release's changes properly.
- Don't wait too long. Ideally merge new releases every two weeks.

## Known issues

These are known issues as of the time of writing.

### Testing

Unit tests have not been updated to reflect the changes made. This is a major issue and should preferably be fixed before including more updates from the MetaMask team.

### Build watch

The build watch which is started when running `gulp dev` is not reliable. At times changes no longer seem to be included in new builds. Personally I prefer to just run `gulp dev` again after each build. It is painfully slow though...

This is most likely an issue with MetaMask as it has always been unreliable.

## Changes made by the Smilo team

We've made several changes to integrate this browser plugin with the Smilo Blockchain. We'll discuss these changes in this chapter on a per-file basis.

This is not a comprehensive list of changes! Things will be missing! Please use the git commit log and git blame to get a better understanding of all changes.

We've divided this list in plugin and ui changes. Plugin changes refer to all changes made to the logic running in the background. These files can be found in the `./app` directory. UI refers to the user interface shown to the user. These files can be found in the `./ui` directory.

### Plugin changes

#### ./app/manifest.json

Changed manifest so the store listing shows the correct information. Also changed the hotkeys with which the plugin can be opened.

#### ./app/scripts/controllers/blacklist.js

Apart from the official blacklist maintained by MetaMask we've also included our own custom blacklist. This blacklist can be found [here](https://github.com/Smilo-platform/SmiloWallet-extension/blob/develop/app/phishing-config.json).

#### ./app/scripts/controllers/network/enum.js

Changed the main net and test net codes, display names and end point.

_This is the place to change the default rpc end point should it ever change again in the future!_

#### ./app/scripts/controllers/network/network.js

Changed the way a connection with the main net and test net is made. In MetaMask the Infura API is used. We've removed this code and replaced it with a plain RPC target.

#### ./app/scripts/inpage.js

Changed the way the plugin is exposed on a web page. MetaMask exposes the web3 client as a global variable named `ethereum` on every web page. We have changed this so it is exposed as a global variable named `smilo`. This way we prevent conflicts with the MetaMask plugin.

#### ./app/scripts/lib/account-tracker.js

Added support for SmiloPay. At the time of writing the used web3 library did not yet support this so instead we've fallen back on a plain HTTP POST call.

#### ./app/scripts/lib/auto-reload.js

Changed the global `web3` variable to `smiloWeb3` to prevent conflicts with MetaMask.

#### ./app/scripts/lib

Changed the used keyring controller to the Smilo version (also see `Node module changes`).

#### ./app/scripts/metamask-controller.js

Changed the used keyring controller to the Smilo version (also see `Node module changes`).

#### ./app/scripts/platforms/extension.js

Changed the block exporer link to refer to the Smilo main or test net explorer.

### UI changes

#### ./ui/app/components/app/dropdowns/token-menu-dropdown.js

Changed the block exporer link to refer to the Smilo main or test net explorer.

#### ./ui/app/components/app/modals/account-details-modal/account-details-modal.component.js

Changed the block exporer link to refer to the Smilo main or test net explorer.

#### ./ui/app/components/app/modals/confirm-remove-account/confirm-remove-account.component.js

Changed the block exporer link to refer to the Smilo main or test net explorer.

#### ./ui/app/components/app/transaction-activity-log/transaction-activity-log.component.js

Changed the block exporer link to refer to the Smilo main or test net explorer.

#### ./ui/app/components/app/transaction-list-item-details/transaction-list-item-details.component.js

Changed the block exporer link to refer to the Smilo main or test net explorer.

#### ./ui/app/components/ui/jazzicon/jazzicon.component.js

Changed the used account icon generator library to the Smilo version (also see `Node module changes`).

#### ./ui/app/pages/create-account/connect-hardware

Changed the block exporer link to refer to the Smilo main or test net explorer.

#### ./ui/app/pages/first-time-flow/create-password/import-with-seed-phrase/import-with-seed-phrase.component.js

Changed link to terms and conditions

#### ./ui/app/pages/first-time-flow/create-password/create-password/create-password.component.js

Changed link to terms and conditions

#### ./ui/app/pages/settings/info-tab/info-tab.component.js

Changed privacy policy link, terms and conditions link, website link and mail link.

#### ./ui/lib/account-link.js

Added logic to return the correct explorer link.

## Build setup changes

We've expanded the build setup to include an option to create a zipped version of the source code. Firefox requires this zip because we minify our code base. This has no impact on the rest of the build system. It is mostly included for convenience's sake.

## Node module changes

We've forked and changed several modules.

### @smilo-platform/smiloicon

Changed the account icon library so icons with Smilo colors are generated.

Forked repo found [here](https://github.com/Smilo-platform/SmiloIcon).

### @smilo-platform/eth-keyring-controller

Changed the keyring controller library so private keys using the smilo derivation path are generated.

Forked repo found [here](https://github.com/Smilo-platform/KeyringController).

## Other changes

We've changed logos and images. Original file names have been retained. That's why you might find a file named `eth.png` which shows a Smilo logo. This makes it easier to merge future work from the MetaMask team in our browser as we change less.
