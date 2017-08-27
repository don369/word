module.exports = (Schema) => {
    const userSchema = new Schema({
        name: { type: String, index: { unique: true } },
        password: String,

    });

    return userSchema;
}