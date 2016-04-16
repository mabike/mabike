/**
 * This method gets all things that are located inside a given geospatial bounding box.
 */

// const thingsCollection = app.Collections.things;
//
// // Fields to be returned for each thing in the bounding box
// const thingFields = {
//   title: 1,
//   type: 1,
//   'location.center': 1
// };
//
// Meteor.publish('location:thingsInBoundingBox', function(boundingBox) {
//   check(boundingBox, [
//     [
//       [Number]
//     ]
//   ]);
//   var cursor = thingsCollection.find({
//     'location.center': {
//       $geoWithin: {
//         $geometry: {
//           type: 'Polygon',
//           coordinates: boundingBox
//         }
//       }
//     }
//   }, {
//     fields: thingFields
//   });
//   return cursor;
// });
