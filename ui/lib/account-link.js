import { MAINNET_CODE, TESTNET_CODE } from "../../app/scripts/controllers/network/enums";

module.exports = function (address, network) {
  const net = parseInt(network)
  let link
  switch (net) {
    case MAINNET_CODE: // main net
      link = `https://explorer.smilo.network/addr/${address}`
      break
    case TESTNET_CODE: // test net
      link = `https://testnet-explorer.smilo.network/addr/${address}`
      break
    default:
      link = ''
      break
  }

  return link
}
