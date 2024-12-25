const createFileFormData = (label: string, value: File) => {
    const formData = new FormData();
    formData.append(label, value);
    return formData;
}

export default createFileFormData;
