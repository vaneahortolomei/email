import axios from "axios";

const emails = axios.create({
    baseURL: "http://localhost:9000",
    withCredentials: false,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin' : '*',
    },
});


export default {
    getEmailsList() {
        return emails.get("/emails").then(response => response.data);
    },
    putEmailsList(id, email){
        return emails.put(`/emails/${id}`, email);
    },
};
