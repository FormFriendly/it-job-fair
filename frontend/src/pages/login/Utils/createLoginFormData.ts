import {iForm} from "../Types/types";

const createLoginFormData = (values: iForm) => {
    const formData = new FormData();
    formData.append('username', values.username);
    formData.append('password', values.password);
    return formData
}

export default createLoginFormData