import axios from "axios";

const emails = axios.create({
    baseURL: "https://dbjs.netlify.app",
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
