let userValue:string|undefined = undefined;

export const getUserValue = ()=>{
    return userValue
};
export const setUserValue = (value:string)=>{
    userValue = value;
};