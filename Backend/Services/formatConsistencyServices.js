
const checkPKFormatConsistency = require("../utilis/checkPKFormatConsistency")
const checkFKFormatConsistency = require('../utilis/checkFKFormatConsistency')

const formatServices = {
 
  
  



  async checkPrimaryKeyFormat(filename,attributes) {
    try{
const result =  checkPKFormatConsistency(filename,attributes)
return result;
    } catch (error) {
      console.error("Error occured", error);
      throw new Error("Internal Server Error");
    }
  },

  async checkForeignKeyFormat(filename,primary_key,files) {
    try{
      const result =  checkFKFormatConsistency(filename,primary_key,files)
      return result;
    } catch (error) {
      console.error("Error occured:", error);
      throw new Error("Internal Server Error");
    }
  }

};

module.exports = formatServices;
