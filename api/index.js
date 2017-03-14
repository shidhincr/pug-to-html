let pug = require('pug');
let {json, send} = require('micro');
let qs = require('qs');
let url = require('url')

const getSource = async (req) => {
  let query = qs.parse( url.parse(req.url).query );
  if(query.source){
    return query.source; 
  }

  let data;
  try {
    data = await json(req);
  } catch(e){
    data = {}
  }
  return data.source
}

module.exports = async (req, res) => {
  let source = await getSource(req);
  if(source){
    let out = pug.compile(source, {})({});
    send(res, 200, { out });
  } else {
    return '';
  }
}