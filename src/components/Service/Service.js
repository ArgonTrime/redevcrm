const getUsers = async (url) => {
    const res = await fetch(url);

    if(!res.ok) {
        throw new Error();
    }

    return await res.json();
}

export {getUsers};