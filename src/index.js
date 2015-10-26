// Dependencies
import {Server} from 'http'
import stringify from 'json-stringify-safe'
import querystring from 'querystring'

// Public
class Superserver extends Server{
  constructor(){
    super()

    this.on('request',this.handleRequest)
  }

  acam= [
    'CHECKOUT',
    'CONNECT',
    'COPY',
    'DELETE',
    'GET',
    'HEAD',
    'LOCK',
    'MERGE',
    'MKACTIVITY',
    'MKCOL',
    'MOVE',
    'M-SEARCH',
    'NOTIFY',
    'OPTIONS',
    'PATCH',
    'POST',
    'PROPFIND',
    'PROPPATCH',
    'PURGE',
    'PUT',
    'REPORT',
    'SEARCH',
    'SUBSCRIBE',
    'TRACE',
    'UNLOCK',
    'UNSUBSCRIBE',
  ]

  handleRequest= (req,res)=>{
    let body= ''

    req.on('data',data=>{
      body+= data

      if(body.length > 1000*1000){// byte
        req.connection.destroy()// throw `Error: socket hang up`
      }
    })
    
    req.on('end',()=>{
      req.originalUrl= `http://${req.headers.host}${req.url}`

      try{
        req.query= querystring.parse(req.url.split('?')[1] || '')
      }
      catch(error){}

      if(body.length){
        req.body= body
        try{
          req.data= JSON.parse(body)
        }
        catch(error){}
      }

      res.statusCode= 200
      res.statusMessage= 'OK'

      res.setHeader('content-type','application/json')
      res.setHeader('access-control-allow-origin','*')
      res.setHeader('access-control-allow-methods',this.acam.join(','))

      let allowHeader= ''
      allowHeader+= req.headers['access-control-request-headers'] || ''
      if(allowHeader){
        allowHeader+= ', '
      }
      allowHeader+= Object.keys(req.headers).join(', ')
      res.setHeader('access-control-allow-headers',allowHeader)

      res.end(stringify(req,null,2))
    })
  }
}

export default new Superserver
export {Superserver}
