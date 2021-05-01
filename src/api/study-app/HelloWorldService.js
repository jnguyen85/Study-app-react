import axios from 'axios'

class HelloWorldService {
    executeHelloWorldService() {
        return axios.get('http://localhost:8080/studyapp/')
    }

    executeHelloWorldBeanService() {
        return axios.get('http://localhost:8080/study-app/hello-world-bean')
    }

    executeHelloWorldPathVariableService(name) {
        return axios.get(`http://localhost:8080/study-app/hello-world/path-variable/${name}`)
    }
}

export default new HelloWorldService()