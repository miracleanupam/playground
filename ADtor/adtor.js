console.log("Author: AD");


// No operation function
const noop = () => {};

// Global Variables
let savedSel;
let selecX, selecY;

// Get selection Coordinates
// paran win is the div (editor div in this case)
function getSelectionCoords(win) {
  win = window || win;
  let doc = win
  let sel = doc.selection, range, rects, rect;
  var x = 0, y = 0;
  if (sel) {
    if (sel.type != "Control") {
      range = sel.createRange();
      range.collapse(true);
      x = range.boundingLeft;
      y = range.boundingTop;
    }
  } else if (win.getSelection) {
    sel = win.getSelection();
    if (sel.rangeCount) {
      range = sel.getRangeAt(0).cloneRange();
      if (range.getClientRects) {
        range.collapse(true);
        rects = range.getClientRects();
        if (rects.length > 0) {
          rect = rects[0];
          x = rect.left;
          y = rect.top;
        }
      }
      // Fall back to inserting a temporary element
      if (x == 0 && y == 0) {
        var span = doc.createElement("span");
        if (span.getClientRects) {
          // Ensure span has dimensions and position by
          // adding a zero-width space character
          span.appendChild( doc.createTextNode("\u200b") );
          range.insertNode(span);
          rect = span.getClientRects()[0];
          x = rect.left;
          y = rect.top;
          var spanParent = span.parentNode;
          spanParent.removeChild(span);

          // Glue any broken text nodes back together
          spanParent.normalize();
        }
      }
    }
  }

  return { x: x, y: y };
}

//Save User Progress to Local Storge
saveData = () => {
  localStorage.setItem('adtorDatum', adtor.editor.innerHTML);
  localStorage.setItem('adtorTitle', title.value);
}

// Down HTML version of the user's data
saveHTML = (data, filename, type) => {
  // Create html string
  // Add links to necessary css and google fonts,
  // Add contents from the editor and title
  let htmlContent = "<!DOCTYPE html>"+
  "<html>"+
  "<head>"+
  "<meta charset='utf-8'>"+
  "<title>"+filename+"</title>"+
  "<link rel='stylesheet' href='https://dahalad.github.io/ADtor/newDoc.css'>"+
  "<link href='https://fonts.googleapis.com/css?family=Slabo+27px' rel='stylesheet'>"+
  "</head>"+
  "<body>"+
  "<div class='title'>"+filename+"</div><hr>"+
  "<div>"+data+"</div>"+
  "</body>"+
  "</html>";

  // Create new blob
  let file = new Blob([htmlContent], {type:type});
  let a = document.createElement('a');
  let url = URL.createObjectURL(file);
  a.href = url;
  a.download = filename+'.html';
  document.body.appendChild(a);
  a.click();
  setTimeout(function(){
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  },0);
}

// Get image from url
getImage = () => {
  let imgurl = prompt("Enter Image URL");
  if (imgurl != null) {
    document.execCommand('insertImage', false, imgurl);
  }
}

// On page load, do these things
window.onload = () => {
  let body = document.getElementById('bdy');
  body.style.background = '#f2f2f2';

  let title = document.getElementById('title');

  let undoButton = document.getElementById('undo');
  undoButton.setAttribute('onmousedown', "event.preventDefault();");
  undoButton.onclick = () => { document.execCommand('undo', false, null) };

  let redoButton = document.getElementById('redo');
  redoButton.setAttribute('onmousedown', "event.preventDefault();");
  redoButton.onclick = () => { document.execCommand('redo', false, null) };

  let saveFileButton = document.getElementById('filesave');
  saveFileButton.setAttribute('onmousedown', "event.preventDefault();");
  saveFileButton.onclick = () => { saveHTML(adtor.editor.innerHTML, title.value, 'html') };


  // Define ADtor
  class ADtor {
    constructor() {
      this.editor = document.createElement('div');
      this.editor.style.height = '370px';
      this.editor.style.overflowX = 'hidden';
      this.editor.style.overflowY = 'scroll';
      this.editor.setAttribute('class', 'story');
      this.editor.style.width = "100%";
      this.editor.style.border = "solid #f2f2f2 1px";
      this.editor.style.borderRadius = '3px';
      body.appendChild(this.editor);
      this.editor.contentEditable = true;
    }
  }


  // Define Toolbar
  class Toolbar {
    // Provide an instance of adtor to link one toolbar to that editor
    constructor(adtor) {
      this.container = adtor.editor;
      this.toolbar = document.createElement('div');
      this.toolbar.setAttribute('class', 'toolbar-wrap');
      this.toolbar.style.position = 'absolute';
      this.toolbar.style.display = 'none';

      // Add buttons for various cammands to the toolbar

      // Bold
      this.boldButton = document.createElement('button');
      this.boldButton.setAttribute('class', 'toolbar-buttons');
      this.boldButton.setAttribute('name', 'bold');
      this.boldButton.setAttribute('onmousedown', "event.preventDefault();");
      this.boldButton.onclick = () => { this.command('bold') };
      this.boldButton.innerHTML = "<strong><i class='fa fa-bold' aria-hidden='true'></strong>";
      this.toolbar.appendChild(this.boldButton);

      // Italic
      this.italicButton = document.createElement('button');
      this.italicButton.setAttribute('class', 'toolbar-buttons');
      this.italicButton.setAttribute('name', 'italic');
      this.italicButton.setAttribute('onmousedown', "event.preventDefault();");
      this.italicButton.onclick = () => { this.command('italic') };
      this.italicButton.innerHTML = "<i class='fa fa-italic' aria-hidden='true'></i>";
      this.toolbar.appendChild(this.italicButton);

      // URL - link
      this.linkButton = document.createElement('button');
      this.linkButton.setAttribute('class', 'toolbar-buttons');
      this.linkButton.setAttribute('name', 'link');
      this.linkButton.setAttribute('onmousedown', "event.preventDefault();");
      this.linkButton.onclick = () => { this.linker() };
      this.linkButton.innerHTML = "<i class='fa fa-chain' aria-hidden='true'></i>";
      this.toolbar.appendChild(this.linkButton);

      // URL - unlinker
      this.unlinkButton = document.createElement('button');
      this.unlinkButton.setAttribute('class', 'toolbar-buttons');
      this.unlinkButton.setAttribute('name', 'unlink');
      this.unlinkButton.setAttribute('onmousedown', "event.preventDefault();");
      this.unlinkButton.onclick = () => { this.unlinker() };
      this.unlinkButton.innerHTML = "<i class='fa fa-unlink' aria-hidden='true'></i>";
      this.toolbar.appendChild(this.unlinkButton);

      // Font Size Increase
      this.fsize = 3;
      this.bigTextButton = document.createElement('button');
      this.bigTextButton.setAttribute('class', 'toolbar-buttons');
      this.bigTextButton.setAttribute('name', 'bigtext');
      this.bigTextButton.setAttribute('onmousedown', "event.preventDefault();");
      this.bigTextButton.onclick = () => { this.commandFont('big') };
      this.bigTextButton.innerHTML = "<i class='fa fa-text-height' aria-hidden='true'></i>";
      this.toolbar.appendChild(this.bigTextButton);

      // Hidden contenteditable div to get user link url
      this.getInput = document.createElement('prompt');
      this.getInput.style.position = 'absolute';
      this.getInput.style.top = '0px';
      this.getInput.style.left = '0px';
      this.getInput.style.display = 'none';
      this.getInput.style.width = '400px';
      this.getInput.style.height = '21px';
      this.getInput.style.borderRadius = '5px';
      this.getInput.style.border = 'none';
      this.getInput.style.outline = 'none';
      this.getInput.style.background = '#000000';
      this.getInput.style.color = '#f2f2f2';
      this.getInput.style.padding = '8px 5px';
      this.getInput.contentEditable = true;
      this.getInput.setAttribute('class', 'prompter');
      this.getInput.setAttribute('onkeydown', "event.preventDefault();");
      this.getInput.onkeydown = (evt) => { this.getUrl(evt) };
      this.getInput.setAttribute('placeholder', 'url: ');
      this.toolbar.appendChild(this.getInput);

      // Font Size Decrease
      this.smallTextButton = document.createElement('button');
      this.smallTextButton.setAttribute('class', 'toolbar-buttons');
      this.smallTextButton.setAttribute('name', 'smalltext');
      this.smallTextButton.setAttribute('onmousedown', "event.preventDefault();");
      this.smallTextButton.onclick = () => { this.commandFont('small') };
      this.smallTextButton.innerHTML = "<small><small><i class='fa fa-text-height' aria-hidden='true'></i></small></small>";
      this.toolbar.appendChild(this.smallTextButton);

      // Code
      this.codeButton = document.createElement('button');
      this.codeButton.setAttribute('class', 'toolbar-buttons');
      this.codeButton.setAttribute('name', 'code');
      this.codeButton.setAttribute('onmousedown', "event.preventDefault();");
      this.codeButton.onclick = () => { this.commandWithArg('code') };
      this.codeButton.innerHTML = "<i class='fa fa-code' aria-hidden='true'></i>";
      this.toolbar.appendChild(this.codeButton);

      // Quote
      this.quoteButton = document.createElement('button');
      this.quoteButton.setAttribute('class', 'toolbar-buttons');
      this.quoteButton.setAttribute('name', 'quote');
      this.quoteButton.setAttribute('onmousedown', "event.preventDefault();");
      this.quoteButton.onclick = () => {this.commandWithArg('blockquote')};
      this.quoteButton.innerHTML = "<i class='fa fa-quote-left' aria-hidden='true'></i>";
      this.toolbar.appendChild(this.quoteButton);

      // Add all the buttons to the toolbar
      body.appendChild(this.toolbar);

    }

    unlinker() {
      let success;
        try {
          success = document.execCommand('unlink', false, null);
        } catch (e) {
          console.log(e);
        }
    }

    // linker
    linker() {
      savedSel = this.saveSelection();
      this.getInput.style.display = 'block';
      this.getInput.focus();
    }

    // Get user input for link
    getUrl(evnt) {
        // this.getInput.style.display = 'block';
        // this.getInput.focus();
        // When user presses enter
        if (evnt.keyCode == 13) {
          let success;
          evnt.preventDefault();
          // Get input text
          let url = this.getInput.innerText;
          // Hide link input div
          this.getInput.style.display = 'none';
          // Restore selection
          this.restoreSelection(savedSel);
          // If user entered something create link
          if (url != '') {
            try {
              success = document.execCommand('createLink', false, url);
            } catch (e) {
              noop();
            }
            // If link is created, remove content of the link input div
            // Set linkInputDivShown to true
            if (success) {
              this.getInput.innerHTML = "";
              this.linkInputDivShown = true;
            }
          }
          // If user presses ESC, reset things
        }else if (evnt.keyCode == 27) {
          evnt.preventDefault();
          this.getInput.style.display = 'none';
          this.getInput.innerHTML = "";
        }
      }

    // Save user selection
    saveSelection() {
      if (window.getSelection) {
        // Get selection
        let sel = window.getSelection();
        // Get the first range in that selection
        if (sel.getRangeAt && sel.rangeCount) {
          return sel.getRangeAt(0);
        }
        // Browser compatibility
      } else if (document.selection && document.selection.createRange) {
        return document.selection.createRange();
      }
      return null;
    }

    // Restore Selection
    restoreSelection(range) {
      // If there is a saved rang in the selection
      if (range) {
        if (window.getSelection) {
          let sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
        } else if (document.selection && range.select) {
          range.select();
        }
      }
    }

    // execute commands
    command(action) {
      let success;
      try {
        success = document.execCommand(action, false, null);
      } catch (error) {
        noop();
      }
    }

    // execute font increase or decrease command
    commandFont(action) {
      let success;
      if (action === 'big') {
        if (this.fsize<7) {
          this.fsize++;
        }
      }else {
        if (this.fsize>1) {
          this.fsize--;
        }
      }
      try {
        success = document.execCommand('fontSize', false, this.fsize);
      } catch (e) {
        noop();
      }
    }

    // Execute Command for code and quote
    commandWithArg(arg) {
      let success;
      // save selection first
      let selecteData = window.getSelection();
      // Get selction start node
      let parser = selecteData.anchorNode;
      let isSurroundedByActionTag = false;
      let actionTagNode;
      // Check the parents of the selection start node for blockquote or code
      while (parser != this.container && parser != null) {
        parser = parser.parentNode;
        if (parser.nodeName == arg.toUpperCase()) {
          isSurroundedByActionTag = true;
          actionTagNode = parser;
          break;
        }
      }
      if (isSurroundedByActionTag) {
        // Get the actioinTagNode's nextSibling
        // Create a new Range in that sibling
        // Set cursor to that sibling and then
        // Remove the action tags
        try {
          let nextSegment = selecteData.focusNode.parentNode.nextSibling;
          let range = document.createRange();
          range.setStart(nextSegment, 0);
          range.setEnd(nextSegment, 0 );
          range.collapse(false);
          selecteData.removeAllRanges();
          selecteData.addRange(range);
          blockquoteNode.outerHTML = blockquoteNode.innerHTML;
        } catch (e) {
          noop();
        }
        // If not isSurroundedByActionTag
      }else {
        // Get the string representation of selected data
        let content = selecteData.toString();
        // Try to insert Action Tags
        // and set cursor to next sibling
        // &nbsp; are inserted for cursor handling
        try {
          success = document.execCommand('insertHTML', false, '&nbsp;&nbsp;&nbsp;&nbsp;<'+arg+'>'+content+'</'+arg+'>&nbsp;&nbsp;&nbsp;&nbsp;')
        } catch (e) {
          noop();
        }
        if (success) {
          let nextSegment;
          nextSegment = selecteData.focusNode.nextSibling;
          // If there is no next sibling, create one with empty characters
          if (nextSegment == null) {
            nextSegment = document.createTextNode("\u200b\u200b");
            selecteData.focusNode.parentNode.appendChild(nextSegment);
          }
          let range = document.createRange();
          range.setStart(nextSegment, 0);
          range.setEnd(nextSegment, 0 );
          range.collapse(false);
          selecteData.removeAllRanges();
          selecteData.addRange(range);

          // Remove <br> tags inserted by Firefox browsers, for compatibility
          if (navigator.appCodeName == "Mozilla") {
            //remove all br tags
            let brs = adtor.editor.getElementsByTagName("br");
            for (var i = 0; i < brs.length; i++) { brs[i].parentNode.removeChild(brs[i]); }
          }
        }

      }
      // After everything is done, hide the toolbar
      this.toolbar.style.display = 'none';
    }
  }

  // Display Toolbar
  displayToolbar = () => {
    // If there is a selection
    if (document.getSelection().toString() != '') {
      // Get the coordinates of selection
      let coords = getSelectionCoords(adtor.editor);
      // Change coordinates to fit toolbar
      if (coords.x+400 > window.innerWidth) {
        coords.x = window.innerWidth-450;
      }
      toolbar.toolbar.style.left = coords.x+'px';
      toolbar.toolbar.style.top = coords.y-45+'px';
      // Display toolbar
      toolbar.toolbar.style.display = 'block';
      // Else hide toolbar
    }else {
      toolbar.toolbar.style.display = 'none';
    }
  }



  // Create an editor
  adtor = new ADtor();
  // Create a toolbar and bind it to adtor created above
  toolbar = new Toolbar(adtor);

  // If there is user progress load it and set it in the adtor
  if (localStorage.getItem('adtorDatum')) {
    adtor.editor.innerHTML = localStorage.getItem('adtorDatum');
  }
  if (localStorage.getItem('adtorTitle')) {
    title.value = localStorage.getItem('adtorTitle')
  }

  // Put cursor to the editor
  adtor.editor.focus();
  // If there is user progress, set the cursor at the end
  try {
    let startSel = document.getSelection();
    let startRange = document.createRange();
    let lastItem = adtor.editor.childNodes[adtor.editor.childNodes.length-1];
    // Firefox compatibility
    if (lastItem.nodeName === 'DIV') {
      console.log(lastItem.childNodes[lastItem.childNodes.length-1], lastItem.childNodes[lastItem.childNodes.length-1].length-1);
      startRange.setStart(lastItem.childNodes[lastItem.childNodes.length-1], lastItem.childNodes[lastItem.childNodes.length-1].length-1);
      startRange.setEnd(lastItem.childNodes[lastItem.childNodes.length-1], lastItem.childNodes[lastItem.childNodes.length-1].length-1);
      // For chromium
    }else {
      startRange.setStart(lastItem, lastItem.length-1);
      startRange.setEnd(lastItem, lastItem.length-1);
    }
    startRange.collapse(false);
    startSel.removeAllRanges();
    startSel.addRange(startRange);
  } catch (e) {
    noop();
  }

  adtor.editor.onselectstart = () => {
    // Add event listener to display toolbar
    ['keyup', 'mouseup'].forEach((evt)=>{ adtor.editor.addEventListener(evt, displayToolbar) });
  }
}
