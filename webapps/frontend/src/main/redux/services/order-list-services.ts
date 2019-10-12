let defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    //'X-CSRF-Token': g.csrfToken,
    // 'Content-Type': 'application/x-www-form-urlencoded',
    //'Content-Type': 'multipart/form-data'
};

let g = window.g;


export function fetchTableList(params={}){
    let url = `${g.baseUrl}tb-order-list`;

    let defaultData = {
    };
    //console.log('params',params);
    let ajaxData = {...defaultData, ...params};

    let responseIsOk = false;
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'post',
            headers: defaultHeaders,
            credentials: 'same-origin',
            body: JSON.stringify(ajaxData),
          }).then( response => {
            responseIsOk = response.ok;
            if(!response.ok){
              //console.log(response)
            }
            return response.json();
          }).then( data => {
            if(responseIsOk){
              resolve(data);
            }else{
              reject(data);
            }
          }).catch(error => {
            //console.log(error)
            reject(error);
          });
    })
}