export function parseString(str: string){
    return str.replaceAll(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\`/g, '`').replace(/\\t/g, '\t')
}