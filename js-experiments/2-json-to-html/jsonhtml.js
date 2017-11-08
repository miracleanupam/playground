// Data to be used
var data = [
  {
    tagName: 'div',
    className: 'test-class',
    styles: {
      width: "100px",
      height: "100px",
      backgroundColor: 'red'
    },
    children: [
      {
        tagName: 'div',
        className: 'box',
        styles: {
          width: "50px",
          height: "50px",
          backgroundColor: 'blue'
        },
      },
      {
        tagName: 'div',
        className: 'box',
        styles: {
          width: "50px",
          height: "50px",
          backgroundColor: 'brown',
          float: 'right'
        },
      }
    ]
  }
];

// Get main wrapper
var mainWrap = document.getElementById('main-wrapper');

// create obj definition for html dom element to be created dynamically
function Dom(data){
  this.data = data;
  var that = this;

  // Function to create new dom element
  this.createdom = function(type){
    var dom = document.createElement(type);
    return dom;
  }
  // Function to add class to the dom element specified via arguments
  this.addclass = function(dom,classname){
    dom.setAttribute('class', classname);
  }
  // Add style to specified dom element
  this.addstyle = function(dom, stylename, value){
    dom.style[stylename] = value;
  }
  // Append one dom element to another
  this.addchild = function(parent, child){
    parent.appendChild(child);
  }
  // To apply all styles specified to a dom element
  // And for all children
  this.iterateobj = function(parentdom, obj){
      var dom;
      // get all keys of data given as a array
      var kees = Object.keys(obj);
      // Go through every key
      kees.forEach(function(item){
        // if key is 'tagName', create dom element
        if (item == 'tagName'){
          dom = that.createdom(obj[item]);
          // Append it to its parent dom element
          that.addchild(parentdom, dom);
        }else if(item == 'className'){
          // add class to the new created dom element
          that.addclass(dom, obj[item]);
        }else if(item == 'styles'){
          // Apply styles to the newly created dom element recursively
          // Initial context is maintained so that the parent and child doms
          // are still clear
          that.iterateobj(dom, obj[item]);
        }else if(item == 'children'){
          // For every child object under children key, repeat the same process
          // recursively.Passing the newly created created dom element as a
          // parent
          obj[item].forEach(function(child){
            that.iterateobj(dom, child);
          });
        }else{
          // For styling
          that.addstyle(parentdom, item, obj[item]);
        }
      });
    }

    // initialisation
    this.init = function(){
      this.iterateobj(mainWrap, data[0]);
    }
}
// Execute
var a = new Dom(data);
a.init(data);
