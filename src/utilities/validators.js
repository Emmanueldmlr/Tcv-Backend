const Joi = require('@hapi/joi')

exports.categoryValidator = () => {

    const schema = Joi.object({

        title : Joi.string().trim().required(),

        description : Joi.string().trim()

    })

    return schema

}

exports.eventValidator = () => {

    const schema = Joi.object({

        title : Joi.string().trim().required(),

        description : Joi.string().trim(),

        date: Joi.date().required(),
        
        isVirtual: Joi.boolean().required(),

        address: Joi.string().trim().required(),

        category_id: Joi.string().trim().required(),

    })

    return schema

}

