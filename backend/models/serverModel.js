const mongoose =  require('mongoose')

const serverModel =  mongoose.Schema(
    {
        serverName:{type: String, trim: true },
        users:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
        }],
        chat: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }],
    },
    {timeStamps: true}   
)

const Server = mongoose.model("Server", serverModel)
module.exports = Server