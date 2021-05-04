import axios from 'axios'
import { API_URL, JPA_API_URL} from '../../APIRouterConstants'

class AuthenticationService {

    executeBasicAuthenticationService(username, password) {
        console.log("AuthenticationService.executeBasicAuthenticationService:" + username + ":" + password)
        return axios.post(`${API_URL}/users/login/api/user`, 
            {
                user_email: username,
                user_login: username,
                user_pwd: password
            }
        )
    }

    createBasicAuthToken(username, password) {
        console.log(`inside executeAuthenticationService ${username}:${password}`)
        console.log(`Basic ${username}:${password}`)
        return 'Basic ' + window.btoa(username + ":" + password)
    }

    registerSuccessfulLogin(username, password) {
        console.log("Inside AuthenticationService.registerSuccessfulLogin ")
        sessionStorage.setItem('authenticatedUser', username)
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password))
    }
    logout() {
        sessionStorage.removeItem('authenticatedUser')
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('authenticatedUser')

        if (user === null) return false;

        return true;
    }


    getLoggedInUser() {
        let user = sessionStorage.getItem('authenticatedUser')

        if (user === null) return '';

        return user;
    }

    setupAxiosInterceptors(basicAuthHeader) {
        axios.interceptors.request.use(
            (config) => {
                if(this.isUserLoggedIn()) {
                    config.headers.authorization = basicAuthHeader
                }
                return config
            }
        )
    }
    
}

export default new AuthenticationService()
