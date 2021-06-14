module.exports = mongoose => {

    var schema = mongoose.Schema(

        {

            title : String,

            description : String,

        },

        {

            timestamps: true

        }

    )

    const Category = mongoose.model("Category", schema)

    return Category

}