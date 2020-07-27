const getUsers = async (url) => {
    const res = await fetch(url);

    if(!res.ok) {
        throw new Error();
    }

    return res.json();
}

const getLeeds = async (url) => {
    const res = await fetch(url);

    if(!res.ok) {
        throw new Error(res.status);
    }

    return res.json();
}

const loginUser = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if(!res.ok) {
        throw new Error(res.status);
    }

    return res.text();
}

const getQuotes = async (url) => {
    const res = await fetch(url);
    if(!res.ok) {
        throw new Error(res.status);
    }

    return res.json();
}

const postQuote = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)  
    });

    if(!res.ok) {
        throw new Error(res.status);
    }

    return res.json();
}


export {
    getUsers, 
    getLeeds, 
    loginUser, 
    getQuotes, 
    postQuote
};