import axios from 'axios';

//users
const getUsers = async () => {
    return await axios.get('https://redevcrm.herokuapp.com/users').then(res => res.data);
}

//leeds
const getLeeds = async () => {
    return await axios.get('https://redevcrm.herokuapp.com/leeds').then(res => res.data);
}

//login
const loginUser = async (values) => {
    return await axios.post('https://redevcrm.herokuapp.com/users/login', values).then(res => res.data);
}

// quotes
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

//tasks
const getTasks = async () => {
    return await axios.get('https://redevcrm.herokuapp.com/tasks').then(res => res.data.map(task => {
        const {_id, theme, text} = task;
        return {
            key: _id,
            theme,
            text
        }
    }));    
}
const postTask = async (value) => {
    return await axios.post('https://redevcrm.herokuapp.com/tasks', value).then(res => {
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
    return await axios.get('https://redevcrm.herokuapp.com/CheatSheetSections').then(res => res.data.map(sections => {
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
    return await axios.post('https://redevcrm.herokuapp.com/CheatSheetSections', value).then(res => {
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
    return await axios.get('https://redevcrm.herokuapp.com/CheatSheetThemes').then(res => res.data.map(theme => {
        const {_id, title, keyword, image, cheatSheetSectionId} = theme;
        return {
            key: _id,
            title,
            keyword,
            image,
            cheatSheetSectionId
        }
    }))
}

const getCheatSheetThemesSection = async () => {
    return await axios.get('https://redevcrm.herokuapp.com/CheatSheetSections').then(res => res.data.map(sections => {
        const {_id, title} = sections;
        return {
            key: _id,
            title
        }
    }));
}

const postCheatSheetThemes = async (value) => {
    return await axios.post('https://redevcrm.herokuapp.com/CheatSheetThemes', value).then(res => {
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
    getTasks,
    postTask,
    getCheatSheetSections,
    postCheatSheetSections,
    getCheatSheetThemes,
    getCheatSheetThemesSection,
    postCheatSheetThemes
};