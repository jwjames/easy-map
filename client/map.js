Meteor.startup(function () {
  GoogleMaps.load();
});

Template.map.onRendered(function () {
  //Set location as object.
  var location = {};

  if (this.data.addresses) {
    console.log("Location initiated as an array")
    location.addresses = this.data.addresses;
    console.log("Location[0] in array set as: " + location.addresses[0]);
  };

  if (this.data.address) {
    console.log("Location initiated as an address");
    location.address = this.data.address;
    console.log("Location address set as: " + location.address);
  };

  if (this.data.lat && this.data.lng) {
    location.lat = this.data.lat;
    location.lng = this.data.lng;
  };


  var self = this;
  var mapContainer = this.find('.map-container');
  var loaded = false;
  var marker;
  // Run computation once, as soon as location is loaded.
  this.autorun(function () {

    // Mapping by lat lng coordinates:
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
    };

    // Mapping by address string:
    if (GoogleMaps.loaded() && location && location.address) {
      console.log('Setting geocode fn for single address');

      function geocodeAddress(address, fn) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
          'address': address
        }, function (results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            fn(results[0].geometry.location);
          } else {
            console.log('Geocode was not successful: ' + status);
          }
        });
      };

      geocodeAddress(location.address, function (location) {
        GoogleMaps.create({
          name: 'map',
          element: mapContainer,
          options: {
            center: location,
            zoom: 8
          }
        });
        console.log('Map created.');
        loaded = true;

        // Load marker every time the location changes.
        GoogleMaps.ready('map', function (map) {
          if (marker === undefined) {
            console.log('Adding marker at ' + location);
            marker = new google.maps.Marker({
              position: location,
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
              position: location,
              map: map.instance
            });
            console.log('New marker location: ' + marker);
          };
        });

      });
    };

    if (GoogleMaps.loaded() && location && location.addresses) {
      // REMEMBER TO SET BOUNDS
      console.log('Setting geocode fn for mutliple addresses');
      var bounds = new google.maps.LatLngBounds();

      function geocodeAddresses(addresses, fn) {

        var geocoder = new google.maps.Geocoder();
        var locationArr = [];

        for (i = 0; i < addresses.length; i++) {

          geocoder.geocode({
            'address': addresses[i]
          }, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
              //Center map on first result.
              locationArr.push(results[0].geometry.location);
              fn(locationArr);
            } else {

              console.log('Geocode was not successful: ' + status);

            }
          });

        }
      };

      // Set location.address as an array of lat/lng objects, make center on the first
      // element in the array.

      geocodeAddresses(location.addresses, function (locationArray) {
        // Create map centered on first address.
        console.log('location Array: ' + locationArray);
        GoogleMaps.create({
          name: 'map',
          element: mapContainer,
          options: {
            center: locationArray[0],
            zoom: 8
          }
        });

        console.log('Map created.');
        loaded = true;
        // Load marker for each location.
        GoogleMaps.ready('map', function (map) {
          var bounds = new google.maps.LatLngBounds();
          // Pass in locations from array, set markers - DO THIS
          for (i = 0; i < locationArray.length; i++) {
            console.log('Adding marker at ' + locationArray[i]);
            bounds.extend(locationArray[i]);
            marker = new google.maps.Marker({
              position: locationArray[i],
              map: map.instance
            });
            map.instance.fitBounds(bounds);
            console.log("Marker added :" + marker);
          }
        });


      });

    };
  });
});