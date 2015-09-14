## Easy-maps
An extremely simple one-line Google Maps package. <br><br>
### Add with:
```
meteor add jeffrey:easy-map
```
<br>
Note: This package has a default `width:800px` and `height:500px`
<br><br>

## Directions:
Add
```{{> map lat:"[latitude]"" lng:"[longitude]""}}``` in your HTML file. You will see a map appear centered on a pin at that location.

### Example:
#### Html:
```javascript
{{> map lat="40.7133" lng="-73.9533"}}
```
