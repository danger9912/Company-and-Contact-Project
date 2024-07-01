const temporalQualityServices = require('../Services/temporalQualityServices');


exports.tempoConistency = async (req, res, next) =>{
    try {
        const result = await temporalQualityServices.tempoConistency(req.body.filename,req.body.attributes);
        // console.log(result);
        res.status(200).json({result});
      } catch (err) {
        console.error(err);
        next(err);
      }
};
exports.tempoValidity = async (req, res, next) =>{
  try {
      const result = await temporalQualityServices.tempoValidity(req.body.filename,req.body.attributes);
      // console.log(result);
      res.status(200).json({result});
    } catch (err) {
      console.error(err);
      next(err);
    }
};

exports.tempoStartend = async (req, res, next) =>{
    try {
        const result = await temporalQualityServices.tempoStartend(req.body.filename,req.body.attributes);
        // console.log(result);
        res.status(200).json({result});
      } catch (err) {
        console.error(err);
        next(err);
      }
};