/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */
function getMinMax(str) {
  let arr = str.replace(/,/g, ' ').split(' ');
  let arrInteger = arr.filter( item => isFinite(+item) && item != '' );
  
  arrInteger.sort( (a, b) => a - b );

  return {
    min: +arrInteger[0],
    max: +arrInteger[arrInteger.length - 1],
  }
}
