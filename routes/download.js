const router = require("express").Router();
const File = require("../models/file");

router.get("/:uuid", async (req, res) => {
  const file = await File.findOne({ uuid: req.params.uuid });

  if (!file) {
    return res.render("download", { error: "Link has expeired." });
  }

  //this is the download path and if you are using different server to store file
  //then just store that in env and maention here
  const filePath = `${__dirname}/../${file.path}`;
  res.download(filePath);
});

module.exports = router;
