import fs from 'fs';
import {Blog} from './../Data/blog.js'
const dataPath = './Data/datamodel.json';

export const saveAccountData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(dataPath, stringifyData)
}

export const getAccountData = () => {
    const jsonData = fs.readFileSync(dataPath)
    return JSON.parse(jsonData)    
}


export const savePost = (data) => {
    var existAccounts = getAccountData()
    const newAccountId = Math.floor(100000 + Math.random() * 900000)
    let obj = new Blog();
    obj.title = data.title;
    obj.content = data.content;
    obj.author = data.author;
    obj.timestamp = new Date();
    existAccounts[newAccountId] = data;

    saveAccountData(existAccounts);
    return obj;
}

export const updatePost = (data,id) =>
{
    var existAccounts = getAccountData()
   fs.readFile(dataPath, 'utf8', (err, var1) => {
    const accountId = id;

    let obj = new Blog();
    obj.title = data.title;
    obj.content = data.content;
    obj.author = data.author;
    obj.timestamp = new Date();  

    existAccounts[accountId] = obj;
     
    saveAccountData(existAccounts);

    return accountId;
   
})
}