const db = require("../models")

const validators = require('../utilities/validators')

const slug = require("slug")

const Event = db.events

const Category = db.categories

exports.fetchEvents = async (req, res) => {

    const { page } = req.query;

    var options = {

        populate: ({ path: 'category', select: 'title description _id' }),

        limit:    4,

        page: page || 1,

    };
    
    Event.paginate({}, options)
    
    .then( events => {

        res.send(events)

    })

    .catch(err => {

        res.status(500).send({

            message : err.message || "Some error occurred while retrieving events."

        });

    })
} 

exports.fetchLatestEvents = async (req, res) => {
    
    Event.find().sort({ _id: -1 }).limit(4).populate("category", "title description _id")

    .then( events => {

        res.send(events)

    })

    .catch(err => {

        res.status(500).send({

            message : err.message || "Some error occurred while retrieving events."

        });

    })
} 

exports.findEvent = async  (req, res) => {

    const slug = req.params.slug;

    Event.findOne({slug}).populate("category", "title description _id")

    .then(event => {

        if (!event) return res.status(404).send({ message: "No event found "});
      
        res.send(event);

    })
    .catch(err => {

        res.status(500).send({

            message : err.message || "Some error occurred while retrieving events."

        });
    })
}

exports.create = async (req, res) => {
    
    try{

        await validators.eventValidator().validateAsync(req.body)

        const {title, description, category_id, isVirtual, date, address} = req.body

        const checkCategory = await Category.findById(category_id)
        
        if(checkCategory.length < 1) return res.status(409).send(

            {message: "Category Does not Exist"}

        )
        
        const checkEvent = await Event.find({title})

        if(checkEvent.length > 0) return res.status(409).send(

            {message: "Event Already Exist"}

        )

        const newEvent = new Event({

            title: title,

            description : description,

            category: category_id,

            isVirtual,

            date,

            address,

            slug: slug(title)

        })

        const savedEvent = await  newEvent.save(newEvent)
        
        res.json(savedEvent)

    }
    catch(err){

        res.status(500).send({

            message : err.message || "Some error occurred while creating Event."

        });
    }
} 

exports.delete = async (req, res) => {

    try{

        const id = req.params.id

        const deletedEvent = await Event.findByIdAndDelete(id)
        
        if(!deletedEvent) return res.status(404).send(

            {message: "Event Does not Exist"}

        )

        res.send({

            message: "Event was deleted successfully!"
          
        });

    }
    catch(err){

        res.status(500).send({

            message : err.message || "Some error occurred while deleting Event."

        });

    }

}


// exports.searchEvent = async (req, res) => {
    
//     try{

//         const {title, description, category_id, isVirtual, date, address} = req.query

//     }
//     catch(err){

//         res.status(500).send({

//             message : err.message || "Some error occurred while creating Event."

//         });
//     }
// } 