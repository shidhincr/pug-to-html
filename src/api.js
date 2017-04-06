const apiURL = 'https://pug-repl-api.now.sh';

export function compilePugTemplate( str = '', locals={} ){
  let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  method = 'POST',
  body = {
    source: encodeURIComponent( str.trim() ),
    locals
  };

  return fetch(apiURL, {
    headers, method, body: JSON.stringify(body)
  }).then(res=>res.json());
}