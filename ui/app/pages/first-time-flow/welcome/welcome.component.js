import EventEmitter from 'events'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Button from '../../../components/ui/button'
import { INITIALIZE_CREATE_PASSWORD_ROUTE, INITIALIZE_SELECT_ACTION_ROUTE } from '../../../helpers/constants/routes'

export default class Welcome extends PureComponent {
  static propTypes = {
    history: PropTypes.object,
    isInitialized: PropTypes.bool,
    participateInMetaMetrics: PropTypes.bool,
    welcomeScreenSeen: PropTypes.bool,
  }

  static contextTypes = {
    t: PropTypes.func,
    metricsEvent: PropTypes.func
  }

  constructor (props) {
    super(props)

    this.animationEventEmitter = new EventEmitter()
  }

  componentDidMount () {
    const { history, welcomeScreenSeen, setParticipateInMetaMetrics } = this.props

    setParticipateInMetaMetrics(false)
      .then(
        () => {
          if(welcomeScreenSeen) {
            history.push(INITIALIZE_SELECT_ACTION_ROUTE)
          }
        }
      );
  }

  handleContinue = () => {
    this.props.history.push(INITIALIZE_SELECT_ACTION_ROUTE)
  }

  render () {
    const { t } = this.context

    return (
      <div className="welcome-page__wrapper">
        <div className="welcome-page">
          <img className="welcome-page__logo" src="images/icon-512.png"></img>
          {/* <Mascot
            animationEventEmitter={this.animationEventEmitter}
            width="225"
            height="225"
          /> */}
          <div className="welcome-page__header">
            { t('welcome') }
          </div>
          <div className="welcome-page__description">
            <div>{ t('metamaskDescription') }</div>
            <div>{ t('happyToSeeYou') }</div>
          </div>
          <Button
            type="confirm"
            className="first-time-flow__button"
            onClick={this.handleContinue}
          >
            { t('getStarted') }
          </Button>
        </div>
      </div>
    )
  }
}
