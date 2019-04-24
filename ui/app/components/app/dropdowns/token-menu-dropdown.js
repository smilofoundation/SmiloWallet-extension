const Component = require('react').Component
const PropTypes = require('prop-types')
const h = require('react-hyperscript')
const inherits = require('util').inherits
const connect = require('react-redux').connect
const actions = require('../../../store/actions')
const smiloExplorerLinker = require('../../../../lib/smilo-explorer-linker')
const { Menu, Item, CloseArea } = require('./components/menu')

TokenMenuDropdown.contextTypes = {
  t: PropTypes.func,
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(TokenMenuDropdown)

function mapStateToProps (state) {
  return {
    network: state.metamask.network,
    provider: state.metamask.provider
  }
}

function mapDispatchToProps (dispatch) {
  return {
    showHideTokenConfirmationModal: (token) => {
      dispatch(actions.showModal({ name: 'HIDE_TOKEN_CONFIRMATION', token }))
    },
  }
}


inherits(TokenMenuDropdown, Component)
function TokenMenuDropdown () {
  Component.call(this)

  this.onClose = this.onClose.bind(this)
}

TokenMenuDropdown.prototype.onClose = function (e) {
  e.stopPropagation()
  this.props.onClose()
}

TokenMenuDropdown.prototype.render = function () {
  const { showHideTokenConfirmationModal } = this.props

  return h(Menu, { className: 'token-menu-dropdown', isShowing: true }, [
    h(CloseArea, {
      onClick: this.onClose,
    }),
    h(Item, {
      onClick: (e) => {
        e.stopPropagation()
        showHideTokenConfirmationModal(this.props.token)
        this.props.onClose()
      },
      text: this.context.t('hideToken'),
    }),
    h(Item, {
      onClick: (e) => {
        e.stopPropagation()

        const url = smiloExplorerLinker.createAccountLink(this.props.token.address, this.props.provider.type);

        global.platform.openWindow({ url })
        this.props.onClose()
      },
      text: this.context.t('viewOnEtherscan'),
    }),
  ])
}
