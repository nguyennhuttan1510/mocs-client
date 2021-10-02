import moment from 'moment'

const Date = (date) => {
    if (!date) return
    return moment(date).format('DD-MM-YYYY, h:mm a')
}

const Money = (number) => {
    if (!number) return
    return new Intl.NumberFormat().format(number)
}

const upCaseFirst = (string) => {
    if (!string) return
    return string
        .trim()
        .toLowerCase()
        .split(' ')
        .map(function (Word) {
            return Word[0].toUpperCase() + Word.slice(1)
        })
        .join(' ')
}

export const HandleShowCharFirstName = (string) => {
    if (!string) return
    let result
    let words = string.trim().split(' ')
    result = words[words.length - 1].slice(0, 1) + words[0].slice(0, 1)
    return result
}

export const HandleConvertPoint = (currentPoint) => {
    let objPoint = {
        min: 0,
        max: 0,
        colorMin: '',
        colorMax: '',
        valueBar: 0,
    }
    // if (!currentPoint) return objPoint
    if (currentPoint >= 0 && currentPoint < 300) {
        objPoint = {
            min: 0,
            max: 300,
            colorMin: 'gray',
            colorMax: '#ffe112',
        }
    } else if (currentPoint >= 300 && currentPoint < 800) {
        objPoint = {
            min: 300,
            max: 800,
            colorMin: '#ffe112',
            colorMax: '#ff0000',
        }
    } else {
        objPoint = {
            min: 300,
            max: 800,
            colorMin: '#ffe112',
            colorMax: '#ff0000',
        }
    }
    const valueBar = (Number(currentPoint) / (objPoint.max - objPoint.min)) * 100

    return { ...objPoint, valueBar: valueBar }
}

export const constantFormat = {
    Date,
    Money,
    upCaseFirst,
    HandleShowCharFirstName,
}
