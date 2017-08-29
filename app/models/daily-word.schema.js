/**
 * 存储每日一词的数据结构
 */
module.exports = (Schema) => {
    const dailyWordSchema = new Schema({
        lexiconsId: {
            type: Schema.Types.ObjectId,
            ref: 'lexicons'
        }
    })

    dailyWordSchema.statics.getWord = async function () {
        const word = await this.findOne().populate('lexiconsId').exec();
        return word.lexiconsId;
    }
    return dailyWordSchema;
}