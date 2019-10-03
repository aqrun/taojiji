import { isArray, isString } from 'lodash';

export function current_path_in(path_data: any): boolean {
    let current_path: string = window.location.pathname;
    console.log(current_path);
    if(isString(path_data)){
        return path_data === current_path;
    }
    if(isArray(path_data)){
        let index: number = path_data.indexOf(current_path);
        return index >= 0;
    }
    return false
}
