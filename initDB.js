const db = connect('mongodb://localhost/gastronomicon');

// bulk insert of ingredients
db.ingredients.insertMany([
  {
    name: 'apples',
    taste: [
      'sweet',
      'astringent'
    ],
    role: 'cooling',
    season: [
      'autumn'
    ],
    weight: 'medium',
    volume: 'quiet-moderate'
  },
  {
    name: 'apricots',
    taste: [
      'sweet'
    ],
    season: [
      'summer'
    ],
    weight: 'medium',
    volume: 'moderate'
  },

])
