export default function convertDate(month: number, day: string) {
    let parsedSelectMonth
    let parsedSelectDay
    if (month < 10) {
        parsedSelectMonth = `0${month + 1}`
    } else {
        parsedSelectMonth = month + 1
    }
    if (parseInt(day) < 10) {
        parsedSelectDay = `0${parseInt(day)}`
    } else {
        parsedSelectDay = parseInt(day)
    }

    return `${parsedSelectMonth}-${parsedSelectDay}`
}
