module.exports = function (address, network) {
  const net = parseInt(network)
  let link
  switch (net) {
    case 1: // main net
      link = `https://testnet-explorer.smilo.network/addr/${address}`
      break
    case 2: // test net
      link = `https://testnet-explorer.smilo.network/addr/${address}`
      break
    default:
      link = ''
      break
  }

  return link
}
