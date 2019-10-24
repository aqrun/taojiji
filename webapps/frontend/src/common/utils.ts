import { isArray, isString } from 'lodash';

let g = window.g;

export function current_path_in(path_data: any): boolean {
    let current_path: string = window.location.pathname;
    if('location_pathname' in window){
        current_path = window.location_pathname
    }
    //console.log(current_path);
    if(isString(path_data)){
        return path_data === current_path;
    }
    if(isArray(path_data)){
        let index: number = path_data.indexOf(current_path);
        return index >= 0;
    }
    return false
}

export function getCurrentPath() {
    let current_path: string = window.location.pathname;
    if('location_pathname' in window){
        current_path = window.location_pathname
    }
    current_path = current_path.replace(g.baseUrl, '/');
    console.log('current_path',current_path)
    return current_path;
}
