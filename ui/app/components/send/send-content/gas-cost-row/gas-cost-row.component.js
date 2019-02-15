import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SendRowWrapper from '../send-row-wrapper/'
import UserPreferencedCurrencyInput from '../../../user-preferenced-currency-input'
import UserPreferencedTokenInput from '../../../user-preferenced-token-input'

export default class GasCostRow extends Component {

  static propTypes = {
    amount: PropTypes.string,
    amountConversionRate: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    balance: PropTypes.string,
    conversionRate: PropTypes.number,
    convertedCurrency: PropTypes.string,
    gasTotal: PropTypes.string,
    inError: PropTypes.bool,
    primaryCurrency: PropTypes.string,
    selectedToken: PropTypes.object,
    setMaxModeTo: PropTypes.func,
    tokenBalance: PropTypes.string,
    updateGasFeeError: PropTypes.func,
    updateSendAmount: PropTypes.func,
    updateSendAmountError: PropTypes.func,
    updateGas: PropTypes.func,
  }

  static contextTypes = {
    t: PropTypes.func,
  }

  validateAmount (amount) {
    const {
      amountConversionRate,
      balance,
      conversionRate,
      gasTotal,
      primaryCurrency,
      selectedToken,
      tokenBalance,
      updateGasFeeError,
      updateSendAmountError,
    } = this.props

    updateSendAmountError({
      amount,
      amountConversionRate,
      balance,
      conversionRate,
      gasTotal,
      primaryCurrency,
      selectedToken,
      tokenBalance,
    })

    if (selectedToken) {
      updateGasFeeError({
        amountConversionRate,
        balance,
        conversionRate,
        gasTotal,
        primaryCurrency,
        selectedToken,
        tokenBalance,
      })
    }
  }

  updateAmount (amount) {
    const { updateSendAmount, setMaxModeTo } = this.props

    setMaxModeTo(false)
    updateSendAmount(amount)
  }

  updateGas (amount) {
    const { selectedToken, updateGas } = this.props

    if (selectedToken) {
      updateGas({ amount })
    }
  }

  renderInput () {
    const { amount, inError, selectedToken } = this.props
    const Component = selectedToken ? UserPreferencedTokenInput : UserPreferencedCurrencyInput

    return (
      <input style={
        {
          minHeight: "54px",
          border: "1px solid #dedede",
          borderRadius: "4px",
          color: "#4d4d4d",
          fontSize: "1rem",
          padding: "8px 10px",
          width: "100%"
        }
      } type="text" disabled value="1 XSP"></input>
      // <Component
      //   onChange={newAmount => this.validateAmount(newAmount)}
      //   onBlur={newAmount => {
      //     this.updateGas(newAmount)
      //     this.updateAmount(newAmount)
      //   }}
      //   error={inError}
      //   value={amount}
      // />
    )
  }

  render () {
    const { gasTotal, inError } = this.props

    return (
      <SendRowWrapper
        label={`Gas price:`}
        showError={inError}
        errorType={'amount'}
      >
        { this.renderInput() }
      </SendRowWrapper>
    )
  }

}
