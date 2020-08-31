import axios from 'axios';

const API_URL = 'https://redevcrm.herokuapp.com';
//users
const getUsers = async () => {
    return await axios.get(`${API_URL}/users`).then(res => res.data.map(user => {
        const {_id, birthday, email, firstName, lastName} = user;
        return {
            key: _id,
            birthday,
            email,
            firstName,
            lastName
        }
    }));
}

//leeds
const getLeeds = async () => {
    return await axios.get(`${API_URL}/leeds`).then(res => res.data.map(leeds => {
        const {_id, type, target} = leeds;
        return {
            key: _id,
            type,
            target
        }
    }));
}

//login
const loginUser = async (values) => await axios.post(`${API_URL}/users/login`, values).then(res => res.data);

// quotes
const getQuotes = async () => {
    return await axios.get(`${API_URL}/quotes`).then(res => res.data.map(item => {
        const {_id, author, text} = item;
        return {
            key: _id,
            author,
            quote: text
        }
    }));
}
const postQuote = async (value) => {
    return await axios.post(`${API_URL}/quotes`, value).then(res => {
        const {_id, author, text} = res.data;
                return {
                    key: _id,
                    author,
                    quote: text
                }
    })
}
const deleteQuote = async (item) => axios.delete(`${API_URL}/quotes/` + item).then(res => res.data);

const postEditingQuotes = async (quoteId, quoteText) => await axios.patch(`${API_URL}/quotes/${quoteId}`, quoteText).then(res => console.log(res.data));

//tasks
const getTasks = async () => {
    return await axios.get(`${API_URL}/tasks`).then(res => res.data.map(task => {
        const {_id, theme, text} = task;
        return {
            key: _id,
            theme,
            text
        }
    }));    
}
const postTask = async (value) => {
    return await axios.post(`${API_URL}/tasks`, value).then(res => {
        const {_id, theme, text} = res.data;
        return {
            key: _id,
            theme,
            text
        }
    });
}

//CheatSheetSections
const getCheatSheetSections = async () => {
    return await axios.get(`${API_URL}/CheatSheetSections`).then(res => res.data.map(sections => {
        const {_id, title, logo, image} = sections;
        return {
            key: _id,
            title,
            logo,
            image
        }
    }));    
}

const postCheatSheetSections = async (value) => {
    return await axios.post(`${API_URL}/CheatSheetSections`, value).then(res => {
        const {_id, title, logo, image} = res.data;
        return {
            key: _id,
            title,
            logo,
            image
        }
    })
}

const getCheatSheetThemes = async () => {
    return await axios.get(`${API_URL}/CheatSheetThemes`).then(res => res.data.map(theme => {
        const {_id, title, keyword, image, сheatSheetSectionId} = theme;
        return {
            key: _id,
            title,
            keyword,
            image,
            сheatSheetSectionId
        }
    }))
}

const getCheatSheetThemesSection = async () => {
    return await axios.get(`${API_URL}/CheatSheetSections`).then(res => res.data.map(sections => {
        const {_id, title} = sections;
        return {
            key: _id,
            title
        }
    }));
}

const postCheatSheetThemes = async (value) => {
    return await axios.post(`${API_URL}/CheatSheetThemes`, value).then(res => {
        const {_id, title, keyword, image, cheatSheetSectionId} = res.data;
        return {
            key: _id,
            title,
            keyword,
            image,
            cheatSheetSectionId
        }
    })
}

export {
    getUsers, 
    getLeeds, 
    loginUser, 
    getQuotes, 
    postQuote,
    deleteQuote,
    postEditingQuotes,
    getTasks,
    postTask,
    getCheatSheetSections,
    postCheatSheetSections,
    getCheatSheetThemes,
    getCheatSheetThemesSection,
    postCheatSheetThemes
};