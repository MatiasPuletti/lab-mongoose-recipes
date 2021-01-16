const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create({
      title: 'Diavola Pizza',
      level: 'Easy Peasy',
      ingredients: ['ingredient1', 'ingredient2', 'ingredient3'],
      cuisine: 'italian',
      dishType: 'main_course',
      image:
        'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/0EA71728-231C-4C47-A4B2-F2231AB7769D/Derivates/CBD91DB5-FC9E-4C44-8D9B-1AE0D873F9D8.jpg',
      duration: 20,
      creator: 'Matias Puletti',
      created: '14/01/2021'
    })
      .then((newRecipe) => {
        console.log(`New recipe added: ${newRecipe.title}`);
      })

      .catch((error) => {
        console.error(`Error creating recipe: ${error}`);
      });

    Recipe.insertMany(data, function (error, recipes) {
      console.log(
        recipes.forEach((dataTitle) =>
          console.log(`Created new recipe: ${dataTitle.title}`)
        )
      );
    });

    Recipe.findOneAndUpdate({
      title: 'Rigatoni alla Genovese',
      duration: 100,
      new: true
    }).then((update) => {
      console.log(`Recipe updated`);
    });

    Recipe.deleteOne({ title: 'Carrot Cake' }).then((removed) => {
      console.log(`Recipe removed`);
      mongoose.connection.close(() => {
        console.log('Mongoose default connection closed');
      });
    });
  })

  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
