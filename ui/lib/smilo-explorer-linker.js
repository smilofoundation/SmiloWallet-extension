const protocol = "https://";
const baseExplorerLink = "explorer.smilo.network";
  
function createTxLink(hash, networkType) {
    return `${ getBaseUrl(networkType) }/tx/${ hash }`
}

function createAccountLink(addr, networkType) {
    return `${ getBaseUrl(networkType) }/addr/${ addr }`
}

function getBaseUrl(networkType) {
    return `${ protocol }${ getPrefix(networkType) }${ baseExplorerLink }`;
}

function getPrefix(networkType) {
    let prefix
    switch (networkType) {
      case "mainnet": // main net
        prefix = ''
        break
      case "testnet": // ropsten test net
        prefix = 'testnet-'
        break
      default:
        prefix = ''
    }
    return prefix
}

module.exports = {
    createTxLink,
    createAccountLink
}