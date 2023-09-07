const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/contact'
const Person = require('./models/person'); 

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });


const newPerson = new Person({
  name: 'John Wale',
  age: 30,
  favoriteFoods: ['Pizza', 'Burger'],
});

// Save the new person to the database using async/await
async function savePerson() {
  try {
    const savedPerson = await newPerson.save();
    console.log('New person saved:', savedPerson);
  } catch (err) {
    console.error('Error:', err);
  }
}

savePerson();

// An array of objects representing multiple persons
const arrayOfPeople = [
  {
    name: 'Alice',
    age: 28,
    favoriteFoods: ['Sushi', 'Pasta'],
  },
  {
    name: 'Bob',
    age: 35,
    favoriteFoods: ['Burger', 'Steak'],
  },
  {
    name: 'Charlie',
    age: 24,
    favoriteFoods: ['Pizza', 'Tacos'],
  },
];

// Use Model.create() to insert multiple records with async/await
async function createPeople() {
  try {
    const createdPeople = await Person.create(arrayOfPeople);
    console.log('Created people:', createdPeople);
  } catch (err) {
    console.error('Error:', err);
  }
}

createPeople();
const searchCriteria = {
  name: 'Charlie', // Replace with the name you want to search for
};

// Use Model.find() with .exec() to return a promise
const query = Person.find(searchCriteria);

query.exec()
  .then(foundPeople => {
    console.log('Found people:', foundPeople);
  })
  .catch(err => {
    console.error('Error:', err);
  });

  const search = {
    name: 'Bob', // Replace with the name you want to search for
  };
  
  // Use Model.findOne() with .exec() to return a promise
  const queryy = Person.findOne(search);
  
  queryy.exec()
    .then(foundPerson => {
      if (foundPerson) {
        console.log('Found person:', foundPerson);
      } else {
        console.log('Person not found.');
      }
    })
    .catch(err => {
      console.error('Error:', err);
    });

    //Search Your Database by _id:
const personId = '64f7520a18f615e6a726b2b9';

Person.findById(personId)
  .then(foundPerson => {
    if (foundPerson) {
      console.log('Found person by _id:', foundPerson);
    } else {
      console.log('Person not found.');
    }
  })
  .catch(err => {
    console.error('Error:', err);
  });

  const personName = 'Bob'; // Replace with the name of the person you want to update
  const newAge = 20; // Replace with the new age value
  
  // Use Model.findOneAndUpdate() with promises to find a person by name and update their age
  Person.findOneAndUpdate(
    { name: personName },
    { $set: { age: newAge } }, // Update the age to the desired value
    { new: true } // Return the updated document
  )
    .then(updatedPerson => {
      if (updatedPerson) {
        console.log('Updated person:', updatedPerson);
      } else {
        console.log('Person not found.');
      }
    })
    .catch(err => {
      console.error('Error:', err);
    });


    const DeletePersonId = '64f7520a18f615e6a726b2b9'; // Replace with the actual _id you want to delete

// Use Model.findByIdAndRemove() with promises to delete a person by _id
Person.findByIdAndRemove(DeletePersonId)
  .then(removedPerson => {
    if (removedPerson) {
      console.log('Deleted person:', removedPerson);
    } else {
      console.log('Person not found.');
    }
  })
  .catch(err => {
    console.error('Error:', err);
  });

  const criteria = { name: 'Alice' };

// Use Model.remove() with promises to delete documents based on criteria
Person.deleteMany(criteria)
  .then(deletedInfo => {
    if (deletedInfo.deletedCount > 0) {
      console.log(`${deletedInfo.deletedCount} documents deleted.`);
    } else {
      console.log('No matching documents found.');
    }
  })
  .catch(err => {
    console.error('Error:', err);
  });

  const queryCriteria = { favoriteFoods: 'Sushi' };
const queryOptions = {
  sort: { name: 1 }, // Sort by name in ascending order
  limit: 2, // Limit the results to 2 documents
  select: 'name favoriteFoods', // Select only name and favoriteFoods fields
};

// Use query helpers like find, sort, limit, and select
const NewQuery = Person.find(queryCriteria)
  .sort(queryOptions.sort)
  .limit(queryOptions.limit)
  .select(queryOptions.select);

// Execute the query using exec and pass the results to the done callback
NewQuery.exec()
  .then(results => {
    if (results.length > 0) {
      console.log('Query results:', results);
    } else {
      console.log('No matching documents found.');
    }
  })
  .catch(err => {
    console.error('Error:', err);
  });