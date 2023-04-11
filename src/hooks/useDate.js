export const useDate = (dateConvert) => {
    // crea un nuevo objeto `Date`
    var today = new Date();
    
    // `getDate()` devuelve el día del mes (del 1 al 31)
    var day = dateConvert ? dateConvert.getDate() : today.getDate();
    
    // `getMonth()` devuelve el mes (de 0 a 11)
    var month = dateConvert ? dateConvert.getMonth()+1 : today.getMonth() + 1;
    
    // `getFullYear()` devuelve el año completo
    var year = dateConvert ? dateConvert.getFullYear() : today.getFullYear();
    
    // muestra la fecha de hoy en formato `MM/DD/YYYY`
    //console.log(`${month}/${day}/${year}`);
    const date = `${month}/${day}/${year}`

    return {date}
}