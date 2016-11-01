'use strict';

import fetch from 'isomorphic-fetch'

const requests = {
    get(url, params) {
        let query = url;
        if (params && params !== '') {
            query += '?';
            for (let i in params) {
                if (params[i].isArray) {
                    params[i].forEach(function (value) {
                        query += `${i}=${value}&`;
                    })
                } else {
                    query += i + '=' + params[i] + '&';
                }
            }
            query = query.substr(0, query.length - 1);
        }
        return fetch(query, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            mode: 'cors',
            credentials: 'include'
        })
            .then(response => response.json())
            .catch(error => alert('服务器错误'))
    },
    post(url, params) {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        }).then(response => response.json(),
            () => {
                alert('网络异常');
            });
    },
    delete(url) {
        return fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(response => response.json(),
            () => {
                alert('网络异常');
            });
    },
    postFile(url, formdata) {
        return fetch(url, {
            method: 'POST',
            body: formdata,
            credentials: 'include'
        }).then(response => response.json(),
            () => {
                alert('网络异常');
            })
    }
};

export default requests;
