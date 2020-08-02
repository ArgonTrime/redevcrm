import axios from 'axios';
// const getUsers = async (url) => {
//     const res = await fetch(url);

//     if(!res.ok) {
//         throw new Error();
//     }

//     return res.json();
// }



// const getLeeds = async (url) => {
//     const res = await fetch(url);

//     if(!res.ok) {
//         throw new Error(res.status);
//     }

//     return res.json();
// }

// const loginUser = async (url, data) => {
//     const res = await fetch(url, {
//         method: 'POST',
//         headers: {
//         'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     });

//     if(!res.ok) {
//         throw new Error(res.status);
//     }

//     return res.text();
// }

// const getQuotes = async (url) => {
//     const res = await fetch(url);
//     if(!res.ok) {
//         throw new Error(res.status);
//     }

//     return res.json();
// }

// const postQuote = async (url, data) => {
//     const res = await fetch(url, {
//         method: 'POST',
//         headers: {
//         'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)  
//     });

//     if(!res.ok) {
//         throw new Error(res.status);
//     }

//     return res.json();
// }

// const deleteQuote = async (item, url) => {
//     const res = await fetch(url + '/' + item, {
//         method: 'DELETE'
//     });

//     return res.json();
// }

const getUsers = async () => {
    return await axios.get('https://redevcrm.herokuapp.com/users').then(res => res.data);
}

const getLeeds = async () => {
    return await axios.get('https://redevcrm.herokuapp.com/leeds').then(res => res.data);
}

const loginUser = async (values) => {
    return await axios.post('https://redevcrm.herokuapp.com/users/login', values).then(res => res.data);
}

const getQuotes = async () => {
    return await axios.get('https://redevcrm.herokuapp.com/quotes').then(res => res.data.map(item => {
        const {_id, author, text} = item;
        return {
            key: _id,
            author,
            quote: text
        }
    }));
}

const postQuote = async (value) => {
    return await axios.post('https://redevcrm.herokuapp.com/quotes', value).then(res => {
        const {_id, author, text} = res.data;
                return {
                    key: _id,
                    author,
                    quote: text
                }
    })
}

const deleteQuote = async (item) => {
    return axios.delete('https://redevcrm.herokuapp.com/quotes/' + item).then(res => res.data);
}

export {
    getUsers, 
    getLeeds, 
    loginUser, 
    getQuotes, 
    postQuote,
    deleteQuote
};