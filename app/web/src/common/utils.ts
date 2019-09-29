import { isArray, isString } from 'lodash'

export function current_path_in(path_data: any): boolean {
    let current_path: string = location.pathname;
    if(isString(path_data)){
        return path_data == current_path;
    }
    if(isArray(path_data)){
        let index: number = path_data.indexOf(current_path);
        return index >= 0;
    }
    return false
}

export function import_path_module(path_data: any, module_name: string): void {
    if(current_path_in(path_data)){
        import(module_name).then(m=>{m.init()})
    }
}
