const db = require("../models")

const Joi = require("@hapi/joi")

const validators = require('../utilities/validators')

const Category = db.categories



exports.fetchCategories = async (req, res) => {
    
    Category.find()

    .then( categories => {

        res.send(categories)

    })
    .catch(err => {

        res.status(500).send({

            message : err.message || "Some error occurred while retrieving categories."

        });

    })
} 

exports.findCategory = async  (req, res) => {

    const id = req.params.id;

    Category.findById(id)

    .then(category => {

        if (!category) return res.status(404).send({ message: "No category found "});
      
        res.send(category);

    })
    .catch(err => {

        res.status(500).send({

            message : err.message || "Some error occurred while retrieving category."

        });
    })
}

exports.create = async (req, res) => {

    try{

        await validators.categoryValidator().validateAsync(req.body)

        const {title, description} = req.body

        const checkCategory = await Category.find({title})
        
        if(checkCategory.length > 0) return res.status(409).send(

            {message: "Category Already Exist"}

        )

        const newCategory = new Category({

            title: title,

            description : description

        })

        const savedCategory = await  newCategory.save(newCategory)
        
        res.json(savedCategory)

    }
    catch(err){

        res.status(500).send({

            message : err.message || "Some error occurred while creating category."

        });
    }

}

exports.delete = async (req, res) => {

    try{

        const id = req.params.id

        const deletedCategory = await Category.findByIdAndDelete(id)
        
        if(!deletedCategory) return res.status(404).send(

            {message: "Category Does not Exist"}

        )

        res.send({

            message: "Category was deleted successfully!"
          
        });

    }
    catch(err){

        res.status(500).send({

            message : err.message || "Some error occurred while deleting category."

        });
    }

}

exports.update = async (req, res) => {

    try{

        if (!req.body) {

            return res.status(400).send({

                 message: "category details to update can not be empty!"

            });

        }

        const id = req.params.id

        const updatedCategory = await Category.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        
        if(!updatedCategory) return res.status(404).send(

            {message: "Category Does not Exist"}

        )

        res.send(updatedCategory);

    }
    catch(err){

        res.status(500).send({

            message : err.message || "Some error occurred while updating category."

        });
    }

}