const apiURL = 'https://pug-repl-api-ggwevdkfbe.now.sh';

export function compilePugTemplate( str = '' ){
  let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  method = 'POST',
  body = {
    source: encodeURIComponent( str.trim() )
  };

  return fetch(apiURL, {
    headers, method, body: JSON.stringify(body)
  }).then(res=>res.json());
}