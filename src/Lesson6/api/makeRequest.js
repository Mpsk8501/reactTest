async function getAuth(login, pass) {
    return  makeRequest(`serv/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({login: login, pass: pass})
    })
}

async function all() {
    return await makeRequest('/serv/all')
}

async function getCart(cartToken) {
    let url = '/serv/cart/0';
    if(cartToken){
        url = `/serv/cart/${cartToken}`
    }
    return makeRequest(url)
}
async function addToCart(cartToken,id) {
    return makeRequest(`/serv/addCart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({'token': cartToken, id: id})
    })
}
async function updateCart(cartToken,id,cnt) {
    return makeRequest(`/serv/updateCart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({'token': cartToken, id: id,current:cnt})
    })

}


async function removeInCart(cartToken,id) {
    return  makeRequest(`/serv/removeGood`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({'token':cartToken,id:id})
    });


}

async function removeCart(cartToken) {
    return  makeRequest(`/serv/removeCart`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({'token':cartToken})
    });
}






function makeRequest(url, options = {}) {
    if (!options.headers) {
        options.headers = {};
    }
    options.headers['authorization'] = localStorage.getItem('token');
    return fetch(url, options).then((response) => {
        if (response.status !== 200) {
            return response.text().then((text) => {
                throw new Error(text)
            })
        }
        return response.json()
    })

}

export {all, getAuth,getCart,addToCart,removeInCart,updateCart,removeCart};

// async function add(text,id=''){
//     let data = await makeRequest(`serv/add`,{
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json;charset=utf-8'
//         },
//         body: JSON.stringify({text:text,name:window.localStorage.getItem('name'),
//             key:window.localStorage.getItem('token'),
//             id:id})
//     });
//     return data
// }

// async function one(id){
//     let data = await makeRequest(`serv/all/${id}`);
//     return data
// }

// async function remove(id){
//     let data = await makeRequest(`serv/${id}`,{
//         method:'DELETE'
//     });
//     return data
// }
// async function add(article){
//
//     let data = await makeRequest(`serv/all`,{
//         method: 'POST',
//         body: JSON.stringify(article)
//     });
//     return data
// }

// async function edit(id, articleEdit) {
//     console.log(id);
//     let edArr = Object.assign({id:id},articleEdit);
//     console.log(edArr);
//     let data = await makeRequest(`serv/all`,{
//         method: 'PUT',
//         body: JSON.stringify(edArr)
//     });
//     return data
// }
