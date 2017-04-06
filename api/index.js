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
  return {source: decodeURIComponent(data.source), locals: data.locals || {} }
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://www.undefinednull.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  try{
    let {source, locals} = await getSource(req);
    if(source){
      let out = pug.compile(source, {})(locals);
      send(res, 200, { out });
    } else {
      send(res, 200, { out: '' });
    }
  } catch(e){
    send(res, 403, { out: '' });
  }
}