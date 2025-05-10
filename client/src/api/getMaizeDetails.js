import axios from 'axios'
const host = process.env.REACT_APP_HOST_SERVER

axios.defaults.withCredentials = true

const getMaizeDetails = async () => {
    const maizeDetailsURL = `${host}/api/get-maize-data`;
    try {
        const responseFromMaize = await axios.get(maizeDetailsURL);
        const jsonFromMaize = responseFromMaize.data;
        return jsonFromMaize
    } catch (error) {
        return ({ success: false, error: error.message });
    }
}

const uploadMaizeDetails = async (id, maizeDetails) => {
    const maizeUploadURL = `${host}/api/maize-data/${id}`
    try {
        const doUpload = await axios.post(maizeUploadURL, {
            maize_details: maizeDetails
        });
        return doUpload.data;
    } catch (error) {
        return ({ success: false, error: error.message });
    }
}

const deleteMaizeDetails = async (image) => {
    const maizeDeleteURL = `${host}/api/delete-maize-data`
    try {
        const doDelete = await axios.delete(maizeDeleteURL, {
            data: { image }
        });
        return doDelete.data
    } catch (error) {
        return ({ success: false, error })
    }
}

export { getMaizeDetails, uploadMaizeDetails, deleteMaizeDetails };