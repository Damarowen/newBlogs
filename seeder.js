const fs = require('fs');
const connectDB = require('./config/db');
const Blogs = require('./models/blogs')

//connect to db
connectDB();

//read data file
const blog = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/blogs.json`, 'utf-8')
)

console.log(blog)


//import into DB

const importData = async () =>{
    try {
        await Blogs.create(blog)
        console.log(`data imported ${__dirname}`)
        process.exit();
    } catch(err) {
        console.error(err)
    }
}


const deleteData = async () =>{
    try {
        await Blogs.deleteMany({})
        console.log(`data delete ${__dirname}`)
        process.exit();
    } catch(err) {
        console.error(err)
    }
}

//call function default node process
if(process.argv[2] === 'install'){
    importData();
} else if (process.argv[2] === 'delete') {
    deleteData();
  }