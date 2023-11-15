import { Looker40SDK } from '@looker/sdk'
import {
  AuthToken,
  AuthSession,
  BrowserTransport,
  DefaultSettings,
} from '@looker/sdk-rtl'

class SDKSession extends AuthSession {
  // This is a placeholder for the fetchToken function.
  // It is modified to make it useful later.
  async fetchToken() {
    return fetch('')
  }

  activeToken = new AuthToken()
  constructor(settings, transport) {
    super(settings, transport || new BrowserTransport(settings))
  }

  // This function checks to see if the user is already authenticated
  isAuthenticated() {
    const token = this.activeToken
    if (!(token && token.access_token)) return false
    return token.isActive()
  }

  // This function gets the current token or fetches a new one if necessary
  async getToken() {
    if (!this.isAuthenticated()) {
      const token = await this.fetchToken()
      const res = await token.json()
      this.activeToken.setToken(res.user_token)
    }
    return this.activeToken
  }

  // This function authenticates a user, which involves getting a new token
  // It returns a modified object with a new authorization header.
  async authenticate(props) {
    const token = await this.getToken()
    if (token && token.access_token) {
      props.mode = 'cors'
      delete props.credentials
      props.headers = {
        ...props.headers,
        Authorization: `Bearer ${this.activeToken.access_token}`,
      }
    }
    return props
  }
}

// This class sets the fetchToken to use the 'real' address of the backend server.
class SDKSessionEmbed extends SDKSession {
  async fetchToken() {
    return fetch(`http://localhost:3001`)
  }
}

// This creates a new session with the 'real' address used above
const session = new SDKSessionEmbed({
  ...DefaultSettings,
  base_url: process.env.REACT_APP_LOOKER_API_HOST,
})

// This exports the SDK with the authenticated session
export const sdk = new Looker40SDK(session)