let mongoose = require('mongoose')  // importation de notre module mongoose

// connection a notre base de données
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connect Success')
    })
    .catch((error) => {
        console.log(error)
    })

// création d'un shema
const shema = new mongoose.Schema({
    Name: { type: String, require: true },
    Age: Number,
    favoriteFoods: [String],
});

//création d'un model
const Model = new mongoose.Model('Model', shema)

// création de la personne
const person = new Model({
    id: 0,
    Name: "El Hadj Hady BA",
    Age: 21,
    favoriteFoods: ["Dieune", "Guinar", "Yapp", "Guerté thiaf khott wala kembeu"]
})
// Sauvegarde de notre donnée personne
person.save((err) => {
    if (err) {
        console.err(err)
    }
    console.log("Donnée sauvegardée");
})

// création d'autres modéles
var people = [        // données à ajouter
    {
        id: 1,
        Name: "Ahmadou",
        Age: 18,
        favoriteFoods: ["Maffé yap", "Thiéré", "Vermicelle"]
    },
    {
        id: 2,
        Name: "Samba Laobé",
        Age: 18,
        favoriteFoods: ["Domada", "Kaldou", "Spaghetti"]
    },
    {
        id: 3,
        Name: "Boy Sérèré",
        Age: 18,
        favoriteFoods: ["Maffé", "Thiéré", "Macaroni"]
    }
]
// fonction de création de models
Model.create(people, (err, data) => err ?
    console.log(err) : console.log("Data saved", data))


//trouver toutes les données 
Model.find((err, data) => err ?
    console.log(err) : console.log(data))


//Trouvez une personne qui a un certain aliment dans ses favoris.
Model.findOne({ favoriteFood: ["Maffé"] }, (err, data) => err ?
    console.log(err) : console.log(data))

//trouver  by id 
Model.findById(Model.id, (err, data) => err ?
    console.log(err) : console.log(data))

//Effectuer des mises à jour classiques en exécutant Rechercher, Modifier, puis Enregistrer
Model.findById(Model.id, (err, data) => {
    if (err) {
        console.log(err)
    } else {
        data.favoriteFood.push('hamburger')
        data.save((err) => err ? console.log(err) : console.log(data))
    }
})

//Effectuer de nouvelles mises à jour sur un document en utilisant model.findOneAndUpdate()
updateAge = { Age: 20 }
Model.findOneAndUpdate(Model.Name, updateAge, { new: true }, (err, data) => err ?
    console.log(err) : console.log('updated', data))
// { new: true } qui indique que nous souhaitons renvoyer le document mis à jour au lieu de l'ancien document

//effacer un Document en utilisant model.findByIdAndRemove
Model.findByIdAndRemove(Model.id, (err, data) => err ?
    console.log(err) : console.log('removed', data))

//effacer plusieurs Documents avec la fonction model.remove()
Model.remove({ name: "Mary" }, (err, data) => err ?
    console.log(err) : console.log(data))

//Chaîne d'aides à la recherche pour restreindre les résultats de la recherche
Model.find({ favoriteFood:  ["burritoS"] })
    .sort('name').limit(2).select().exec((err, data) => {
        err ? console.log(err) : console.log(data)
    })