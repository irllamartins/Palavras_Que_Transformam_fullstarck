import moment from "moment"

/*
moment.locale();         // en
moment().format('LT');   // 10:47 AM
moment().format('LTS');  // 10:47:49 AM
moment().format('L');    // 01/09/2021
moment().format('l');    // 1/9/2021
moment().format('DD/MM/YYYY');    // dia/mes/ano
moment().format('HH:mm:ss');    // 01:59:00
*/

export const dateAndHour = (value: string | undefined) => {
    moment.locale('pt-br') // pt-br       
    const date = moment(value )
    return `${date.format("DD/MM/YYYY")} ${date.format('HH:mm:ss')}`
}

export const dateFomart = (value: string | undefined) => {
    moment.locale('pt-br') // pt-br       
    const date = moment(value)
    return `${date.format("DD/MM/YYYY")}`
}


