const obj = (param: any) => {
    return Object.keys(param).length === 0 && param.constructor === Object
}

function removeFieldEmptyInObj(obj: {}): {} {
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
}

const checkEmpty = {
    obj, removeFieldEmptyInObj
}

export default checkEmpty