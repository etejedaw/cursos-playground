var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    name: { 
        type: String, 
        required: [true, 'El nombre es necesario'] 
    },
    price: { 
        type: Number, 
        required: [true, 'El precio únitario es necesario'] 
    },
    description: { 
        type: String, 
    },
    img: {
        type: String
    },
    enable: { 
        type: Boolean, 
        required: true, 
        default: true 
    },
    categorie: { 
        type: Schema.Types.ObjectId, 
        ref: 'Categorie', 
        required: true 
    },
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    }
});

module.exports = mongoose.model('Product', productSchema);