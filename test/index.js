// Dependencies
import superserver from '../src'
import superagent from 'superagent'
import {equal} from 'assert'

// Environment
if(process.env.PORT==null){
  process.env.PORT= 59798
}

// Specs
describe('superserver',function(){
  this.timeout(500)

  before(done=>{
    superserver.listen(process.env.PORT,done)
  })
  after(done=>{
    superserver.close(done)
  })

  it('GET,POST,PUT,DELETE',done=>{
    let verbs= ['GET','POST','PUT','DELETE']

    let promises= verbs.map(verb=>{
      let promise= new Promise((resolve,reject)=>{
        let url= `http://localhost:${process.env.PORT}/hoge?foo=bar`

        superagent(verb,url)
        .set('foo','bar')
        .send({'baz':'beep'})
        .end((error,response)=>{
          if(error){
            return reject(error)
          }

          let allowHeader= ''
          allowHeader+= response.body.headers['access-control-request-headers'] || ''
          if(allowHeader){
            allowHeader+= ', '
          }
          allowHeader+= Object.keys(response.body.headers).join(', ')

          equal(response.headers['content-type'],'application/json')
          equal(response.headers['access-control-allow-origin'],'*')
          equal(response.headers['access-control-allow-methods'],superserver.acam.join(','))
          equal(response.headers['access-control-allow-headers'],allowHeader)

          let request= response.body

          // FIXME: doesn't retain url eg. '/?foo=bar&baz&beep' => '/?foo=bar&baz=&beep='
          equal(request.originalUrl,url)
          equal(request.url,'/hoge?foo=bar')
          equal(request.query.foo,'bar')

          equal(request.method,verb)
          equal(request.headers.foo,'bar')

          equal(request.body,'{"baz":"beep"}')
          equal(request.data.baz,'beep')

          resolve()
        })
      })

      return promise
    })

    Promise.all(promises)
    .then(results=>{
      done()
    })
    .catch(errors=>{
      done(errors)
    })
  })
})
