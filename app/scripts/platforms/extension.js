const extension = require('extensionizer')

class ExtensionPlatform {

  //
  // Public
  //
  reload () {
    extension.runtime.reload()
  }

  openWindow ({ url }) {
    extension.tabs.create({ url })
  }

  closeCurrentWindow () {
    return extension.windows.getCurrent((windowDetails) => {
      return extension.windows.remove(windowDetails.id)
    })
  }

  getVersion () {
    return extension.runtime.getManifest().version
  }

  openExtensionInBrowser (route = null, queryString = null) {
    let extensionURL = extension.runtime.getURL('home.html')

    if (queryString) {
      extensionURL += `?${queryString}`
    }

    if (route) {
      extensionURL += `#${route}`
    }
    this.openWindow({ url: extensionURL })
  }

  getPlatformInfo (cb) {
    try {
      extension.runtime.getPlatformInfo((platform) => {
        cb(null, platform)
      })
    } catch (e) {
      cb(e)
    }
  }

  showTransactionNotification (txMeta, provider) {
    const { status, txReceipt: { status: receiptStatus } = {} } = txMeta

    if (status === 'confirmed') {
      // There was an on-chain failure
      receiptStatus === '0x0'
        ? this._showFailedTransaction(txMeta, 'Transaction encountered an error.')
        : this._showConfirmedTransaction(txMeta, provider.type)
    } else if (status === 'failed') {
      this._showFailedTransaction(txMeta)
    }
  }

  addMessageListener (cb) {
    extension.runtime.onMessage.addListener(cb)
  }

  sendMessage (message, query = {}) {
    const id = query.id
    delete query.id
    extension.tabs.query({ ...query }, tabs => {
      tabs.forEach(tab => {
        extension.tabs.sendMessage(id || tab.id, message)
      })
    })
  }

  _getExplorerLinkPrefix(providerType) {
    let prefix
    switch (providerType) {
      case "mainnet":
        prefix = ''
        break
      case "testnet":
        prefix = 'testnet-'
        break
      default:
        prefix = ''
    }
    return prefix
  }

  _showConfirmedTransaction (txMeta, providerType) {
    this._subscribeToNotificationClicked()

    const nonce = parseInt(txMeta.txParams.nonce, 16)

    const title = 'Confirmed transaction'
    const message = `Transaction ${nonce} confirmed! View on block explorer.`

    console.log(providerType);

    const explorerUrl = `https://${ this._getExplorerLinkPrefix(providerType) }explorer.smilo.network/tx/${txMeta.hash}`

    this._showNotification(title, message, explorerUrl)
  }

  _showFailedTransaction (txMeta, errorMessage) {

    const nonce = parseInt(txMeta.txParams.nonce, 16)
    const title = 'Failed transaction'
    const message = `Transaction ${nonce} failed! ${errorMessage || txMeta.err.message}`
    this._showNotification(title, message)
  }

  _showNotification (title, message, url) {
    extension.notifications.create(
      url,
      {
      'type': 'basic',
      'title': title,
      'iconUrl': extension.extension.getURL('../../images/icon-64.png'),
      'message': message,
      })
  }

  _subscribeToNotificationClicked () {
    if (!extension.notifications.onClicked.hasListener(this._viewOnEtherScan)) {
      extension.notifications.onClicked.addListener(this._viewOnEtherScan)
    }
  }

  _viewOnEtherScan (txId) {
    if (txId.startsWith('https://')) {
      extension.tabs.create({ url: txId })
    }
  }
}

module.exports = ExtensionPlatform
