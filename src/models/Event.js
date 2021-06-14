const mongoosePaginate = require('mongoose-paginate-v2');

module.exports = mongoose => {


    var schema = mongoose.Schema(

        {

            title : String,

            description : String,

            category : {

                type: mongoose.Schema.Types.ObjectId,

                ref : "Category"

            },

            date : Date,

            isVirtual : Boolean,

            address: String,

            slug: String

        },

        {

            timestamps: true

        }

    )
    
    schema.plugin(mongoosePaginate)
    
    const Event = mongoose.model("Event", schema)

    return Event

}