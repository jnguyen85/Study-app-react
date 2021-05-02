import axios from 'axios'

class QADataService {

    retrieveAllQA(name) {
        console.log("QQADataService.retrieveAllQA username=" + name)

        return axios.get(`http://localhost:8080/studyapp/users/${name}/qa`)
    }


    retrieveQa(username, qa_id) {
        console.log(`QADataService.retrieveQs username=${username}`)
                                                        
        return axios.get(`http://localhost:8080/studyapp/users/${username}/qa/${qa_id}`)
    }

    deleteQA(username, qa_id) {   
        console.log("QADataService.deleteQA qa_id=" + qa_id)

        return axios.delete(`http://localhost:8080/studyapp/users/${username}/qa/${qa_id}`)
    }


    updateQA(username, Qid, qa) {   

        console.log(`http://localhost:8080/studyapp/users/${username}/qa/${Qid}`) 

        return axios.put(`http://localhost:8080/studyapp/users/${username}/qa/${Qid}`, qa)
    }

    createQA(name, qa) {

        console.log("QADataService.createQa qa:" + qa)

        return axios.post(`http://localhost:8080/studyapp/users/${qa.user_email}/qa/`, qa)
    }


    registerUser(user) {
        console.log("QADataService.registerUser user:" + user.user_email)
        return axios.post(`http://localhost:8080/studyapp/users/register/api/user`, user)

    }
    
}


export default new QADataService()