const fs = require('fs');
const connectDB = require('./config/db');
const Blogs = require('./models/blogs')
const User = require('./models/user')
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env'});
require('dotenv').config()

//*connect to db
connectDB();

//*read data file
const blog = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/blogs.json`, 'utf-8')
)
const user = {
    name: process.env.NAME,
    email: process.env.EMAIL,
    password: process.env.PASSWORD
    }



//*import into DB

const importData = async () =>{
    try {
        await Blogs.create(blog);
        await User.create(user);
        console.log(`data imported ${__dirname}`);
        process.exit();
    } catch(err) {
        console.error(err)
    }
}


const deleteData = async () =>{
    try {
        await Blogs.deleteMany({});
        await User.deleteMany({});
        console.log(`data delete ${__dirname}`);
        process.exit();
    } catch(err) {
        console.error(err)
    }
}

//*call function default node process
if(process.argv[2] === 'install'){
    importData();
} else if (process.argv[2] === 'delete') {
    deleteData();
  }