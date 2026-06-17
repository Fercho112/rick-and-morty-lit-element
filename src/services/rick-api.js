const API_RICK_AND_MORTY = "https://rickandmortyapi.com/api/character"

export const fetchCharacters = async (page = 1, name = "", signal) => {
    const queryParams = new URLSearchParams();

    if (page) queryParams.set("page", page);
    if (name) queryParams.set("name", name);

    const response = await fetch(`${API_RICK_AND_MORTY}?${queryParams.toString()}`, { signal });


    // errores
    if (response.status === 404) return { results: [], info: null }
    else if (response.status === 429) throw new Error("Demasiadas peticiones")
    else if (!response.ok) throw new Error("Error al obtener los personajes: " + response.statusText)

    return await response.json();

}