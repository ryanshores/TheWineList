const APIURL = '/api/wine/'

export async function getWines() {
  return fetch(APIURL)
  .then(res => {
    if(!res.ok) return handleResNotOkay(res)
    return res.json()
  })
}

export async function addWine(val) {
  return fetch(APIURL, {
    method: 'post',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({name: val})
  })
  .then(res => {
    if(!res.ok) return this.handleResNotOkay(res)
    return res.json()
  })
}

export async function toggleWine(wine) {
  const toggleURL = APIURL + wine._id
  return fetch(toggleURL, {
    method: 'put',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({completed: !wine.completed})
  })
  .then(res => {
    if(!res.ok) return this.handleResNotOkay(res)
    return res.json()
  })
}

export async function removeWine(id) {
  const deleteURL = APIURL + id
  fetch(deleteURL, {
    method: 'delete'
  })
  .then(res => {
    if(!res.ok) return this.handleResNotOkay(res)
    return res.json()
  })
}

function handleResNotOkay(res) {
  if(res.status >= 400 && res.status < 500) {
    return res.json()
      .then(data => {
        let err = {errorMessage: data.message}
        throw err
      })
  } else {
    let err = {errorMessage: "Server is not responding"}
    throw err
  }
}
