import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Button from '../button'
import Identicon from '../identicon'
import TokenBalance from '../token-balance'
import UserPreferencedCurrencyDisplay from '../user-preferenced-currency-display'
import { SEND_ROUTE } from '../../routes'
import { PRIMARY, SECONDARY } from '../../constants/common'
const Web3 = require("web3");
let web3 = new Web3();
import Tooltip from '../tooltip-v2'

export default class TransactionViewBalance extends PureComponent {
  static contextTypes = {
    t: PropTypes.func,
    metricsEvent: PropTypes.func,
  }

  static propTypes = {
    showDepositModal: PropTypes.func,
    selectedToken: PropTypes.object,
    history: PropTypes.object,
    network: PropTypes.string,
    balance: PropTypes.string,
    assetImage: PropTypes.string,
    balanceIsCached: PropTypes.bool,
    showFiat: PropTypes.bool,
  }

  static defaultProps = {
    showFiat: true,
  }

  renderBalance () {
    const { selectedToken, balance, xsp, balanceIsCached, showFiat } = this.props

    return selectedToken
      ? (
        <div className="transaction-view-balance__balance">
          <TokenBalance
            token={selectedToken}
            withSymbol
            className="transaction-view-balance__primary-balance"
          />
        </div>
      ) : (
          <Tooltip position="top" title={this.context.t('balanceOutdated')} disabled={!balanceIsCached}>
            <div className="transaction-view-balance__balance">
                <div className="transaction-view-balance__primary-container">
                  <UserPreferencedCurrencyDisplay
                    className={classnames('transaction-view-balance__primary-balance', {
                      'transaction-view-balance__cached-balance': balanceIsCached,
                    })}
                    value={balance}
                    type={PRIMARY}
                    ethNumberOfDecimals={4}
                    hideTitle={true}
                  />
                  {
                    balanceIsCached ? <span className="transaction-view-balance__cached-star">*</span> : null
                  }
                </div>
                {
                  showFiat && (
                    <div style={{display: "flex", 'align-items': 'center'}}>
                      <UserPreferencedCurrencyDisplay
                        className={classnames({
                          'transaction-view-balance__cached-secondary-balance': balanceIsCached,
                          'transaction-view-balance__secondary-balance': !balanceIsCached,
                        })}
                        value={balance}
                        type={SECONDARY}
                        ethNumberOfDecimals={4}
                        hideTitle={true}
                      />
                      <div className="transaction-view-balance__separator">
                        |
                      </div>
                      <div className="transaction-view-balance__secondary-balance">
                        <span className="xsp" title={ this.formatXSP(xsp) }>{ this.formatXSP(xsp) }</span>
                        <span className="xsp-suffix">XSP</span>
                      </div>
                    </div>
                  )
                }
            </div>
          </Tooltip>
      )
  }

  formatXSP(xsp) {
    return web3.fromWei(xsp, "ether");
  }

  renderButtons () {
    const { t, metricsEvent } = this.context
    const { selectedToken, showDepositModal, history } = this.props

    return (
      <div className="transaction-view-balance__buttons">
        {/* {
          !selectedToken && (
            <Button
              type="primary"
              className="transaction-view-balance__button"
              onClick={() => {
                metricsEvent({
                  eventOpts: {
                    category: 'Navigation',
                    action: 'Home',
                    name: 'Clicked Deposit',
                  },
                })
                showDepositModal()
              }}
            >
              { t('deposit') }
            </Button>
          )
        } */}
        <Button
          type="primary"
          className="transaction-view-balance__button"
          onClick={() => {
            metricsEvent({
              eventOpts: {
                category: 'Navigation',
                action: 'Home',
                name: 'Clicked Send',
              },
            })
            history.push(SEND_ROUTE)
          }}
        >
          { t('send') }
        </Button>
      </div>
    )
  }

  render () {
    const { network, selectedToken, assetImage } = this.props

    return (
      <div className="transaction-view-balance">
        <div className="transaction-view-balance__balance-container">
          <Identicon
            diameter={50}
            address={selectedToken && selectedToken.address}
            network={network}
            image={assetImage}
          />
          { this.renderBalance() }
        </div>
        { this.renderButtons() }
      </div>
    )
  }
}
