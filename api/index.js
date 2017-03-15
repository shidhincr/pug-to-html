let pug = require('pug');
let {json, send} = require('micro');
let qs = require('qs');
let url = require('url')

const getSource = async (req) => {
  let query = qs.parse( url.parse(req.url).query );
  if(query.source){
    return {source: query.source }; 
  }

  let data;
  try {
    data = await json(req);
  } catch(e){
    data = {}
  }
  return {source: decodeURIComponent(data.source)}
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  let {source} = await getSource(req);
  if(source){
    // @TODO: get the locals from request and add it here
    let out = pug.compile(source, {})({});
    send(res, 200, { out });
  } else {
    return '';
  }
}