const mongoose=require('mongoose')

const dnsRecordSchema=new mongoose.Schema({
    USERID:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    sourceIP:{type:String,required:true},
    serverName:{type:String,required:true},
    recordType:{type:String,required:true},
    domain:{type:String,required:true},
    ttl:{type:Number,required:true},
    ipAddress:{type:String,required:true}
})
const dnsRecord=mongoose.model('dnsRecords',dnsRecordSchema)
module.exports=dnsRecord