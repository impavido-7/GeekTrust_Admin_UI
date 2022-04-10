import axios from "axios";

const instance = axios.create({
    baseURL: "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem"
});

export default instance;