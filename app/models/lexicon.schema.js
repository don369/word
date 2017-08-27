module.exports = (Schema) => {
    const lexiconSchema = new Schema({
        name: String,
        UK: String,
        UKMP3: String,
        US: String,
        USMP3: String,
        interpetation: String
    });

    return lexiconSchema;
}