const model = require("../config/aisetup");

async function getResponse(req,res){
    try{
        const prompt = req.body.code;
        if(!prompt) return res.status(500).json({
            success:false,
            message:'No Prompt Recieved'
        })
        const data =await model.generateContent(prompt);
        const finalOutput = data.response.text();

        return res.send(finalOutput)

    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}
module.exports = getResponse;