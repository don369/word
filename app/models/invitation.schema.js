module.exports = (Schema) => {

    const invitationSchema = new Schema({
        code: { type: String, index: { unique: true } }
    });

    return invitationSchema;
}