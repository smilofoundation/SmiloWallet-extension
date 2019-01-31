import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import SenderToRecipient from '../sender-to-recipient'
import { FLAT_VARIANT } from '../sender-to-recipient/sender-to-recipient.constants'
import TransactionActivityLog from '../transaction-activity-log'
import { connect } from 'react-redux'
import TransactionBreakdown from '../transaction-breakdown'
import Button from '../button'
import Tooltip from '../tooltip'
const smiloExplorerLinker = require("../../../lib/smilo-explorer-linker");

class TransactionListItemDetails extends PureComponent {
  static contextTypes = {
    t: PropTypes.func,
  }

  static propTypes = {
    onCancel: PropTypes.func,
    onRetry: PropTypes.func,
    showCancel: PropTypes.bool,
    showRetry: PropTypes.bool,
    transactionGroup: PropTypes.object,
  }

  handleEtherscanClick = () => {
    const { transactionGroup: { primaryTransaction }, provider } = this.props
    const { hash } = primaryTransaction

    const url = smiloExplorerLinker.createTxLink(hash, provider.type)

    global.platform.openWindow({ url: url })
  }

  handleCancel = event => {
    const { transactionGroup: { initialTransaction: { id } = {} } = {}, onCancel } = this.props

    event.stopPropagation()
    onCancel(id)
  }

  handleRetry = event => {
    const { transactionGroup: { initialTransaction: { id } = {} } = {}, onRetry } = this.props

    event.stopPropagation()
    onRetry(id)
  }

  render () {
    const { t } = this.context
    const { transactionGroup, showCancel, showRetry, onCancel, onRetry } = this.props
    const { primaryTransaction: transaction } = transactionGroup
    const { txParams: { to, from } = {} } = transaction

    return (
      <div className="transaction-list-item-details">
        <div className="transaction-list-item-details__header">
          <div>{ t('details') }</div>
          <div className="transaction-list-item-details__header-buttons">
            {
              showRetry && (
                <Button
                  type="raised"
                  onClick={this.handleRetry}
                  className="transaction-list-item-details__header-button"
                >
                  { t('speedUp') }
                </Button>
              )
            }
            {
              showCancel && (
                <Button
                  type="raised"
                  onClick={this.handleCancel}
                  className="transaction-list-item-details__header-button"
                >
                  { t('cancel') }
                </Button>
              )
            }
            <Tooltip title={t('viewOnEtherscan')}>
              <Button
                type="raised"
                onClick={this.handleEtherscanClick}
                className="transaction-list-item-details__header-button"
                >
                <img src="/images/arrow-popout.svg" />
              </Button>
            </Tooltip>
          </div>
        </div>
        <div className="transaction-list-item-details__body">
          <div className="transaction-list-item-details__sender-to-recipient-container">
            <SenderToRecipient
              variant={FLAT_VARIANT}
              addressOnly
              recipientAddress={to}
              senderAddress={from}
            />
          </div>
          <div className="transaction-list-item-details__cards-container">
            <TransactionBreakdown
              transaction={transaction}
              className="transaction-list-item-details__transaction-breakdown"
            />
            <TransactionActivityLog
              transactionGroup={transactionGroup}
              className="transaction-list-item-details__transaction-activity-log"
              onCancel={onCancel}
              onRetry={onRetry}
            />
          </div>
        </div>
      </div>
    )
  }
}



function mapStateToProps(state) {
  return {
    provider: state.metamask.provider
  };
}

export default connect(mapStateToProps)(TransactionListItemDetails);
