export const HandleConvertURLImage = (url) => {
    console.log(
        '🚀 ~ file: HandleConvertURLImage.js ~ line 1 ~ HandleConvertURLImage ~ url',
        typeof url
    )
    console.log(
        '🚀 ~ file: HandleConvertURLImage.js ~ line 2 ~ HandleConvertURLImage ~ url',
        url
    )
    if (!url || typeof url !== 'string') return
    let result
    url = url.replaceAll(`\\`, `/`)
    result = process.env.REACT_APP_API_SERVER + url
    return result
}
export const HandleSessionsOfDay = () => {
    const currentDate = new Date()
    const getHour = currentDate.getHours()
    let session = 'Good Night'
    if (getHour >= 4 && getHour < 10) {
        session = 'Good Morning'
    } else if (getHour >= 10 && getHour < 16) {
        session = 'Good Afternoon'
    } else {
        session = 'Good Night'
    }
    return session
}
