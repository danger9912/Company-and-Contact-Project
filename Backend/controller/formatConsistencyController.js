const formatServices = require('../Services/formatConsistencyServices');



exports.checkPrimaryKeyFormat = async (req,res,next) => {

  const filename = req.body.filename
  const attributes = req.body.attributes

  try{
const result = await formatServices.checkPrimaryKeyFormat(filename,attributes);
res.status(201).json(result)
  } 
  catch(err){
    console.error(err);
    next(err);
  }
}

exports.checkForeignKeyFormat = async (req,res,next) => {
  const filename = req.body.filename
  const primary_key = req.body.primary_key
  const files = req.body.files
  
  try{

    if (!filename || !primary_key || !files || !Array.isArray(files)) {
      return res.status(400).json({ error: "Invalid request body" });
  }

const result = await formatServices.checkForeignKeyFormat(filename,primary_key,files)
res.status(201).json(result)
  } catch(err){
    console.error(err);
    next(err);
  }
}