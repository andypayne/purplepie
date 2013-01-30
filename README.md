
# Purple Pie

Purple Pie is a _very_ simple pie chart plugin for jQuery.

## Usage

To use it, specify the slice sizes in percentages (0-100) in a data-slices
attribute of a container div:

```html
<div class="pie-pan" data-slices="[25,10,30]"></div>
```

Then call invoke purplePie and pass in options:

```javascript
$('#container .pie-pan').purplePie({ 'background-color': '#f6f6f6',
                                     'size': '40px',
                                     'colors': ['#810f7c', '#8856a7', '#8c96c6', '#b3cde3', '#edf8fb'] 
});
```

## Options

* **background-color:** A background color for remaining pie (if not totaling 100%)
* **colors:** The list of colors to be used for slices. Any remaining slices will start over at the first color.
* **size:** The size (width and height) of the pie in pixels

## License

[MIT License](http://opensource.org/licenses/MIT). See the LICENSE.txt file.

