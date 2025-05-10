import axios from 'axios'
const host = process.env.REACT_APP_HOST_SERVER

axios.defaults.withCredentials = true

const getTomatoDetails = async () => {
    const tomatoDetailsURL = `${host}/api/get-tomato-data`;
    try {
        const responseFromTomato = await axios.get(tomatoDetailsURL);
        const jsonFromTomato = responseFromTomato.data;
        return jsonFromTomato
    } catch (error) {
        return ({ success: false, error: error.message });
    }
}

const uploadTomatoDetails = async (id, tomatoDetails) => {
    const tomatoUploadURL = `${host}/api/tomato-data/${id}`
    try {
        const doUpload = await axios.post(tomatoUploadURL, {
            tomato_details: tomatoDetails
        });
        return doUpload.data;
    } catch (error) {
        return ({ success: false, error: error.message });
    }
}

const deleteTomatoDetails = async (image) => {
    const tomatoDeleteURL = `${host}/api/delete-tomato-data`
    try {
        const doDelete = await axios.delete(tomatoDeleteURL, {
            data: { image }
        });
        return doDelete.data
    } catch (error) {
        return ({ success: false, error })
    }
}

export { getTomatoDetails, uploadTomatoDetails, deleteTomatoDetails };