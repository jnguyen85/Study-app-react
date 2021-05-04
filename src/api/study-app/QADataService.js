import axios from 'axios'
import { API_URL, JPA_API_URL} from '../../APIRouterConstants'

class QADataService {

    retrieveAllQA(name) {
        console.log("QQADataService.retrieveAllQA username=" + name)

        return axios.get(`${API_URL}/users/${name}/qa`)
    }


    retrieveQa(username, qa_id) {
        console.log(`QADataService.retrieveQs username=${username}`)
                                                        
        return axios.get(`${API_URL}/users/${username}/qa/${qa_id}`)
    }

    deleteQA(username, qa_id) {   
        console.log("QADataService.deleteQA qa_id=" + qa_id)

        return axios.delete(`${API_URL}/users/${username}/qa/${qa_id}`)
    }


    updateQA(username, Qid, qa) {   

        console.log(`http://localhost:8080/studyapp/users/${username}/qa/${Qid}`) 

        return axios.put(`${API_URL}/users/${username}/qa/${Qid}`, qa)
    }

    createQA(name, qa) {

        console.log("QADataService.createQa qa:" + qa)

        return axios.post(`${API_URL}/users/${qa.user_email}/qa/`, qa)
    }


    registerUser(user) {
        console.log("QADataService.registerUser user:" + user.user_email)
        return axios.post(`${API_URL}/users/register/api/user`, user)

    }
    
}


export default new QADataService()