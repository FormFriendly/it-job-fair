import {iForm} from "../Types/types";

const createRegistrationFormData = (values: iForm) => {
    const formData = new FormData();
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('role', values.role);
    return formData
}

export default createRegistrationFormData