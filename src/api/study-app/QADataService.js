import axios from 'axios'

class QADataService {

    retrieveAllQA(name) {
        return axios.get(`http://localhost:8080/studyapp/users/1/qa`)
    }


    retrieveQa(user_id, qa_id) {
        return axios.get(`http://localhost:8080/studyapp/users/1/qa/${qa_id}`)
    }

    deleteQA(user_id, qa_id) {   
        console.log("inside deleteQA qa_id=" + qa_id)
        console.log(`http://localhost:8080/studyapp/users/1/qa/${qa_id}`)

        return axios.delete(`http://localhost:8080/studyapp/users/1/qa/${qa_id}`)
    }


    updateQA(user_id, qa_id, qa) {   
        console.log("inside updateQA qa_id=" + qa.Qid + "qa.Qid=" + qa.Qid) 
        console.log("url to api=" + `http://localhost:8080/studyapp/users/1/qa/${qa_id}`)                   
        return axios.put(`http://localhost:8080/studyapp/users/1/qa/${qa_id}`, qa)
    }

    createQA(name, qa) {
        return axios.post(`http://localhost:8080/studyapp/users/1/qa/`, qa)
    }
    
}


export default new QADataService()