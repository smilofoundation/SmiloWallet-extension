module.exports = function (network) {
    const net = parseInt(network)
    let prefix
    switch (net) {
      case 1: // main net
        prefix = ''
        break
      case 2: // ropsten test net
        prefix = 'testnet-'
        break
      default:
        prefix = ''
    }
    return prefix
  }
  