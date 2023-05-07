/* This is cloud */
// export const mongoConfig = {
//     serverUrl: "mongodb+srv://finalproject:5C1jpTzjjWSO7jsC@cluster0.pbfzfk2.mongodb.net/?retryWrites=true&w=majority",
//     database: 'CS554Final_Project'
//   };

/* This is local */
// export const mongoConfig = {
//   serverUrl: "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false",
//   database: 'CS554Final_Project'
// };

/* This is docker container */
export const mongoConfig = {
  serverUrl: 'mongodb://mongo:27017/?useNewUrlParser=true&useUnifiedTopology=true',
  database: 'CS554Final_Project'
};