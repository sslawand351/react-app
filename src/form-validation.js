
export const isValidEmail = email => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
export const isEmpty = val => {
    if (typeof val === 'string') {
        val = val.trim()
    }
    return !val || !val.length
}