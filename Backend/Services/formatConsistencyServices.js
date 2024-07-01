const db = require("../database/connection");
const checkPKFormatConsistency = require("../utils/checkPKFormatConsistency")
const checkFKFormatConsistency = require('../utils/checkFKFormatConsistency')

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
