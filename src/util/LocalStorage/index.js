const set = (key, value) => {
    localStorage.setItem(key, value)
}

const get = (key) => {
    return localStorage.getItem(key)
}

const remove = (key) => {
    localStorage.removeItem(key)
}

const clear = (key) => {
    localStorage.clear(key)
}

const handleLocalStorage = {
    set,
    get,
    remove,
    clear,
}

export default handleLocalStorage
