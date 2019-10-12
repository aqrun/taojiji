/// <reference path="global.d.ts" />

import { common } from './common'
import { getCurrentPath } from './common/utils'

import './css/style.scss'

window.g = window.g || {};
let g = window.g;
g['name'] = "test";

function main(){
    common();
    let allModules:{[index:string] : ()=>{}} = {
        '/': () => import('app/main').then(m=>m.init()),
        '/login': () => import('app/auth').then(m=>m.init()),
    };
    let current_path:string = getCurrentPath();
    if(current_path in allModules){
        allModules[current_path]();
    }
}
main();