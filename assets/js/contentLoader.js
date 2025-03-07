export async function loadContent(type) {
    try {
        const response = await fetch(`./assets/data/${type}.json`);
        return await response.json();
    } catch (error) {
        console.error(`Error loading ${type}:`, error);
        return null;
    }
}