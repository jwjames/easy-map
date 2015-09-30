## Easy-maps

An extremely simple one-line Google Maps package. Can be used with Lat Lng or an address.<br><br>
####Announcement: Now accepts an array of addresses!

### Add with:
```
meteor add jeffrey:easy-map
```


<br>
Notes:<br>
<li>
- This package has a default `width:800px` and `height:500px`. <br>
<li>
<br><br>

## Directions:
Add
```{{> map lat:"[latitude]" lng:"[longitude]"}}``` OR ```{{> map address: [address]}}``` in your HTML file. You will see a map appear centered on a pin at that location.

### Example:
#### Html:
##### LatLng:
```javascript
{{> map lat="40.7133" lng="-73.9533"}}
```
##### Address:
```javascript
{{> map address="1600 Pennsylvania Ave NW, Washington, DC 20500"}}
```

#### Array of addresses:
##### Html:
```javascript
<template name = "outerTemplate">
{{> map addresses=addresses}}
</template>
```
##### Javascript:
```javascript
Template.outerTemplate.helpers({
  'addresses':
    [
    "1600 Pennsylvania Ave NW, Washington, DC 20500",
    "Ft. Lauderdale, FL",
    "1526 H St, Sacramento, CA 95814"
    ]
});
