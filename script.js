const File = require("./models/file");
const fs = require("fs");
const connectDB = require("./config/db");
connectDB();

async function deleteData() {
  //fetch 24 hours old files and delete
  const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const files = await File.find({ createdAt: { $lt: pastDate } });

  if (files.length) {
    for (const file of files) {
      try {
        fs.unlinkSync(file.path);
        await file.remove();
        console.log(`successfully deleted ${file.filename}`);
      } catch (err) {
        console.log(`error deleting file ${err}`);
      }
    }

    console.log("job done");
  }
}

deleteData().then(process.exit);
