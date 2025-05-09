import axios from 'axios';

const host = process.env.REACT_APP_HOST_SERVER;

axios.defaults.withCredentials = true;

const handleUpload = async (file, uri) => {

    if (!(file instanceof File) || !file.size) {
        return { success: false, error: 'Invalid file object' };
    }

    const uploadPhoto = `${host}/api/${uri}`;

    try {
        const formData = new FormData();
        formData.append('image', file);

        const doUploadImage = await axios.post(uploadPhoto, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return doUploadImage.data
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export default handleUpload;
