import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://placide:placide@cluster0.w6w0o.mongodb.net/capstone?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("App connected to Mongodb successfully")
})
.catch((e) => {
    console.log("Mongodb connection error "+e.message);
})