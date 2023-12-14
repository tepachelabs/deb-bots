export const dataSource = async () => {
    const url = process.env.DEB_NEXT_SOURCE_URL;
    if (!url) {
        throw new Error('The DEB source URL is not set');
    }
    const response = await fetch(url)
    const data = await response.text()
    return data
}