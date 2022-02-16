const Category = require("../../models/category");
const Reciepe = require("../../models/reciepe");

exports.fetchReciepes = async (reciepeId, next) => {
  try {
    const reciepe = await Reciepe.findById(reciepeId);
    return reciepe;
  } catch (error) {
    next(error);
  }
};

// exports.reciepeDelete = async (req, res, next) => {
//   try {
//     await req.reciepe.remove();
//     res.status(204).end();
//   } catch (error) {
//     next(error);
//   }
// };
