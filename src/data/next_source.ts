export const dataSource = async (multiplier = 1) => {
    const url = process.env.DEB_NEXT_SOURCE_URL;
    if (!url) {
        throw new Error('The DEB source URL is not set');
    }
    const response = await fetch(`${url}?multiplier=${multiplier}`);
    return await response.text()
}
