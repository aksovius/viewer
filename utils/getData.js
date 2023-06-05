export default async function getData(URL) {
    const res = await fetch(URL);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
}