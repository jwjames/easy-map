Meteor.startup(function () {
  GoogleMaps.load();
});

Template.map.onRendered(function () {
  console.log(this.data.lng);
  console.log(this.data.lat);
  var location = {};
  location.lat = this.data.lat;
  location.lng = this.data.lng;
  var self = this;
  var mapContainer = this.find('.map-container');
  var loaded = false;
  var marker;
  // Run computation once, as soon as location is loaded.
  this.autorun(function () {
    if (GoogleMaps.loaded() && location && location.lat && location.lng) {
      console.log('Map loaded and location received.');
      console.log('Location: ' + location.lat + ", " + location.lng);
      GoogleMaps.create({
        name: 'map',
        element: mapContainer,
        options: {
          center: new google.maps.LatLng(location.lat, location.lng),
          zoom: 8
        }
      });
      console.log('Map created.');
      loaded = true;
    }

    // Load marker every time the location changes.

    GoogleMaps.ready('map', function (map) {
      if (marker === undefined) {
        console.log('Adding marker.');
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(location.lat, location.lng),
          map: map.instance
        });
        console.log(marker);
      } else {
        function deleteMarker() {
          marker.setMap(null);
          console.log('Clearing marker.');
        };
        console.log('Deleting marker.');
        deleteMarker();
        marker = null;
        console.log('Adding new marker.');
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(location.lat, location.lng),
          map: map.instance
        });
        console.log('New marker location: ' + marker);
      };
    });
  });
});
