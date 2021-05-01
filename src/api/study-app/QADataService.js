import axios from 'axios'

class QADataService {

    retrieveAllQA(name) {
        return axios.get(`http://localhost:8080/studyapp/users/1/qa`)
    }


    retrieveQa(user_id, qa_id) {
        return axios.get(`http://localhost:8080/studyapp/users/1/qa/${qa_id}`)
    }





    deleteQA(user_id, qa_id) {   
                            
        return axios.delete(`http://localhost:8080/studyapp/users/1/qa/${qa_id}`)
    }
}


export default new QADataService()