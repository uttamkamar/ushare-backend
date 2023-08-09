const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const File = require("../models/file");
const { v4: uuidv4 } = require("uuid");

let storage = multer.diskStorage({
  //to change the upload location to a live link then change this "uploads/"
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

let upload = multer({ storage, limits: { fileSize: 1000000 * 100 } }).single(
  "myfile"
); //100mb

router.post("/", (req, res) => {
  //store files
  upload(req, res, async (err) => {
    //validate request
    if (!req.file) {
      return res.json({ error: "All fields are required" });
    }
    if (err) {
      return res.status(500).send({ error: err.message });
    }
    // store into database
    const file = new File({
      filename: req.file.filename,
      uuid: uuidv4(),
      path: req.file.path,
      size: req.file.size,
    });
    const response = await file.save();
    res.json({
      //this is download page link not download link
      //after process the link look like  "http://localhost:3000/files/96826caa-1a29-4e94-8706-46622c54ce2f"
      //change the live link before deploy
      file: `${process.env.APP_BASE_URL}/files/${response.uuid}`,
    });
  });
});

router.post("/send", async (req, res) => {
  const { uuid, emailTo, emailFrom } = req.body;

  //validate request
  if (!uuid || !emailTo || !emailFrom) {
    return res
      .status(422)
      .send({ eroor: "All fields are required except expiry." });
  }

  //get data from database
  const file = await File.findOne({ uuid: uuid });

  if (file.sender) {
    return res.status(422).send({ error: "Email already sent once." });
  }

  file.sender = emailFrom;
  file.receiver = emailTo;
  const response = await file.save();

  //send email
  const sendMail = require("../services/emailService");
  sendMail({
    from: emailFrom,
    to: emailTo,
    subject: "UShare file sharing",
    text: `${emailFrom} shared a file with you`,
    html: require("../services/emailTemplate")({
      emailFrom: emailFrom,
      downloadLink: `${process.env.APP_BASE_URL}/files/${file.uuid}`,
      size: parseInt(file.size / 1000) + "KB",
      expires: "24 Hours",
    }),
  });

  return res.send({ sucess: "success" });
});

module.exports = router;
