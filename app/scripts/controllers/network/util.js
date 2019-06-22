const {
  MAINNET,
  MAINNET_DISPLAY_NAME,
  MAINNET_CODE,
  TESTNET_CODE,
  TESTNET,
  TESTNET_DISPLAY_NAME
} = require('./enums')

const networkToNameMap = {
  [MAINNET]: MAINNET_DISPLAY_NAME,
  [TESTNET]: TESTNET_DISPLAY_NAME,
  [MAINNET_CODE]: MAINNET_DISPLAY_NAME,
  [TESTNET_CODE]: TESTNET_DISPLAY_NAME,
}

const getNetworkDisplayName = key => networkToNameMap[key]

module.exports = {
  getNetworkDisplayName,
}
