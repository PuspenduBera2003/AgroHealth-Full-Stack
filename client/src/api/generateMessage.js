import axios from 'axios'
const host = process.env.REACT_APP_HOST_SERVER

axios.defaults.withCredentials = true;

const generateMessage = async (prompt, image) => {
    const generateMessageURL = `${host}/api/chat`;

    try {
        const response = await axios.post(generateMessageURL, {
            prompt: prompt,
            image: image
        });
        return response.data;
    } catch (error) {
        return ({ success: false, error: error.message });
    }
}

export default generateMessage