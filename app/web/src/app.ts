/// <reference path="global.d.ts" />

import { common } from './common'
import { current_path_in } from './common/utils'

import './css/style.scss'

window.g = window.g || {};
let g = window.g;
g['name'] = "test";

function main(){
    common();

    if(current_path_in('/')){import('app/main').then(m=>{m.init()})}
    if(current_path_in('/login')){import('app/auth').then(m=>{m.init()})}
}

($=>{$(()=>{main()})})(jQuery);
