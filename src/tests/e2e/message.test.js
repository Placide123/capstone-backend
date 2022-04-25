import app from '../../app';
import chai ,{expect} from 'chai';
import chaiHttp from "chai-http";
import mongoose from 'mongoose';

chai.use(chaiHttp);


describe("POST API /api",()=>{
  
    before(()=>{
        mongoose.connection.dropCollection('message');
    });
    const messages={
        Name:"Twiringiyimana",
        Email:"castlewitty9@gmail.com",
        message:"hello beautiful people"
    }

    it("should successfully create a message and return 201",(done)=>{
        chai.request(app).post('/api')
        .send(messages)
        .end((err,res)=>{
            if(err) return done(err);
            expect(res.status).to.be.equal(201);
            expect(res.body).haveOwnProperty('success');
            expect(res.body).haveOwnProperty('data');
            return done();
        });
    });
})

describe("GET API /api",()=>{
    before(()=>{
        mongoose.connection.dropCollection('message');
    }); 

    it("should successfully get all message and return 200",(done)=>{
        chai.request(app).get('/api')
        .end((err,res)=>{
            if(err) return done(err);
            expect(res.status).to.be.equal(200);
            return done();
        });
    });

});


describe('DElete API /api',()=>{
    before(()=>{
                mongoose.connection.dropCollection('message');
            });
    const messages={
                        Name:"Twiringiyimana",
                        Email:"castlewitty9@gmail.com",
                        message:"hello beautiful people"
                    }  
    let messageId;
    it('should delete a message using its ID and return 204',(done)=>{
        chai.request(app)
        .post('api/save')
        .send(messages)
        .end((err,res)=>{
            if(err) return done(err)
            messageId=res.body.data._id;
            chai.request(app)
                .delete('/api/:id' + messageId)
                .end((err,res)=>{
                    if(err) return done(err);
                    expect (res.status).to.be.equal(204)
                    return done();
                })
        })
    })
    
})

// describe("delete API /api/",()=>{
//     before(()=>{
//         mongoose.connection.dropCollection('message');
//     }); 
//     const messages={
//         Name:"Twiringiyimana",
//         Email:"castlewitty9@gmail.com",
//         message:"hello beautiful people"
//     }
//     it('should delete a message',(done)=>{
        
//     let id;
//     chai.request(app).post('/api/save')
//     .send(messages)
//     .end((err,res)=>{
//         if(err) return done(err);
//         id=res.body.data._id;
//         chai.request(app)
//         .delete('/api'+ id)
//         .end((err,res)=>{
//             if(err) return done(err);
//             expect(res.status).to.be.equal(204)
//             return done();
//         })       
//     })

   
//     })
    
  
// });