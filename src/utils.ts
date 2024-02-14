export function parseString(str: string){
    
    return str.replaceAll(/\\n/g, '&#92;n').replace(/\\"/g, '&#92;"').replace(/\\`/g, '&#92;`').replace(/\\t/g, '&#9;');
}

export function formatDate(date: Date | string){
    const d = new Date(date)
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`
}