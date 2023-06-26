import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app= express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())


//mongodb://127.0.0.1:27017/myLoginRegisterDB
// mongodb connection 
mongoose.connect("mongodb://127.0.0.1:27017/myLoginRegisterDB",{
 
useNewUrlParser: true,
useUnifiedTopology:true
}).then((res)=>{
    console.log("DB Connected")
}).catch((err)=>{
    console.log(err)
})


const userSchema= new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    wpms:{
        type:Array,
        unique: true
    },
    maxwpm:String
  
})


const User=new mongoose.model("User",userSchema) //User naam ka modal create ho gya jo userSchema jaisa hai
//jab login pe click hua toh saara data req.body me aa gya
// yha ham uss data ko store kar lenge
// DB me find karenge, mil gya toh passwrod match kagenge 
app.post("/login",(req,res)=>{
    const {email,password}= req.body           //jo data login press karne ke baad aaya hai woh yha store kar rahe 
    User.findOne({email:email},(err,user)=>{
        if(user){
                if(password===user.password){
                    res.send({message:"Login successfull",user:user._id});
                }
                else{
                    res.send({message:"Password didn't match"})
                }
        }
        else{
            res.send({message:"User not found"})
        }
    })
})

//jab register pe click hua toh saara data req.body me aa gya
// yha ham uss data ko store kar lenge
// error aa gya toh err send kar dega, warna success ho jayga
//jo data ham enter kar rahe agar woh database me exist karega toh already reg show kar denge
app.post("/register",(req,res)=>{
    const {name,email,password}= req.body           //jo data register press karne ke baad aaya hai woh yha store kar rahe 
    User.findOne({email:email},(err,user)=>{
        if(user ){
            res.send({message:"User already registered"})
        }
        else{
            const user= new User({
                name,
                email,
                password
            })
            user.save(err=>{
                if(err){
                    res.send(err)
                }
                else{
                    res.send({message:"Successfully registered : Now Login"})
                }
            })
        
        }
    })
})

//created page that will have all data of registered user 

app.get("/getAllUser",async(req,res)=>{
    try{
const allUser= await User.find({});
res.send(allUser)
    }
    catch(err0r){
console.log(error);
    }
})



app.get('/getname/:Id', async(req, res) => {
    
    User.findOne({ _id:req.params.Id})
      .then(result => {
        if (result) {
          res.json(result.name);
        } else {
          res.status(404).json({ error: 'User not found' });
        }
      })
  });


  app.post('/updateProfile/:Id', async (req, res) => {
    const user = await User.findOne({ _id: req.params.Id });
    if (user) {
      await User.updateOne(
        { _id: req.params.Id },
        {$addToSet: { wpms: req.body}}
      ).exec();
    } 
     let maxi="";
     if(user.maxwpm) maxi=user.maxwpm;
    console.log(user.wpms);
     user.wpms.forEach(data => {
        if(data.Correct>maxi) maxi=data.Correct;
     });

     
     await User.updateOne({_id:req.params.Id},{maxwpm:maxi}).then(res=>{
     
     })
  });






  app.get('/getProfile/:Id', async(req, res) => {
   
    User.findOne({ _id:req.params.Id})
        .then(result => {
          if (result) {
            res.json(result);
          } else {
            res.status(404).json({ error: 'User not found' });
          }
        })
    });

   

//listening on port 9002
app.listen(9002,()=>{
    console.log("BE started at port 9002")
})


