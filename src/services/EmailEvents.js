import axios from "axios";

const emails = axios.create({
    baseURL: "//localhost:9000",
    withCredentials: true,
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
