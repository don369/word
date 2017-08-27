module.exports = (Schema)=>{
    const wordSchema = new Schema({
        extension: String,
        date: String,
        learnNumber: Number,
        word: String,
        userId: {
            type: Schema.ObjectId,
            ref: 'myusers'
        }
    })
    return wordSchema;
}
