module.exports = (Schema) => {
    const lexiconSchema = new Schema({
        name: String,
        UK: String,
        UKMP3: String,
        US: String,
        USMP3: String,
        interpetation: String
    });

    lexiconSchema.statics.randomFindOneWord = async function (opt = {}) {
        try {
            const count = await this.count();
            const i = Math.floor(Math.random() * count);
            const word = await this.find({}, opt).skip(i).limit(1);
            return word[0];
        } catch (err) {
            throw err;
        }
    }

    return lexiconSchema;
}