// create comments
module.exports.createCommentController = async (req, res) => {
  try {
    res.json({
      status: "Success",
      data: "comments created",
    });
  } catch (error) {
    res.json(error.message);
  }
};

// get a comment
module.exports.getCommentController = async (req, res) => {
  try {
    res.json({
      status: "Success",
      data: "get a comment",
    });
  } catch (error) {
    res.json(error.message);
  }
};

// update comment
module.exports.updateCommentController = async (req, res) => {
  try {
    res.json({
      status: "Success",
      data: "update comment",
    });
  } catch (error) {
    res.json(error.message);
  }
};

// delete comment
module.exports.deleteCommmentConntroller = async (req, res) => {
  try {
    res.json({
      status: "Success",
      data: "delet comment",
    });
  } catch (error) {
    res.json(error.message);
  }
};
