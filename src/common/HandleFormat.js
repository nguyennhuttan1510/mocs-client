import moment from 'moment'

const Date = (date) => {
    return moment(date).format('DD-MM-YYYY, h:mm a')
}

const Money = (number) => {
    return new Intl.NumberFormat().format(number)
}

const upCaseFirst = (string) => {
    return string
        .toLowerCase()
        .split(' ')
        .map(function (Word) {
            return Word[0].toUpperCase() + Word.slice(1)
        })
        .join(' ')
}

export const constantFormat = {
    Date,
    Money,
    upCaseFirst,
}
