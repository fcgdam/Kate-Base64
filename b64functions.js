/* kate-script
 * author: Francisco D. <fdsyncmaster@gmail.com>
 * license: GPL
 * revision: 2
 * kate-version: 3.4
 * type: commands
 * functions: b64encode, b64decode, b64xmltidy, b64wrap80
 * i18n-catalog: b64endecatalog
 *
 * The version solves the anonymous range function error on Kate recent versions
 * 
 */

// required katepart js libraries
require ("range.js");

function help(cmd)
{
    if (cmd == "b64encode") {
        return i18n("Encode the selected text to BASE64.");
    } else
    if (cmd == "b64decode") {
        return i18n("Decode the selected text from BASE64 to text.");
    } else
    if (cmd == "b64xmltidy") {
        return i18n("Decode the selected text from BASE64 to text.");
    } else
    if (cmd == "b64wrap80") {
        return i18n("Wraps test a column 80.");
    } 
    
}

function action(cmd)
{
    var a = new Object();
   if (cmd == "b64encode") {
        a.text = i18n("BASE64: Encodes to BASE64.");
        a.icon = "";
        a.category = "";
        a.interactive = false;
        a.shortcut = "";
    } else if (cmd == "b64decode") {
        a.text = i18n("BASE64: Decodes BASE64.");
        a.icon = "";
        a.category = "";
        a.interactive = false;
        a.shortcut = "";
    } else if (cmd == "b64xmltidy") {
        a.text = i18n("XML: tidy xml with LF");
        a.icon = "";
        a.category = "";
        a.interactive = false;
        a.shortcut = "";
    }  else if (cmd == "b64wrap80") {
        a.text = i18n("BASE64: Wraps at column 80");
        a.icon = "";
        a.category = "";
        a.interactive = false;
        a.shortcut = "";
    }
    return a;
}

function b64encode ()
{
    var selectionRange = view.selection();
    if ( view.hasSelection() ) {
        // Encodes to BASE64 only the selected text
	if (selectionRange.isValid()) {
	    // Encode all text in the selection range to BASE64
	    var fromLine = selectionRange.start.line;
	    var toLine = selectionRange.end.line;
	    var fromColumn = selectionRange.start.column;
	    var toColumn= selectionRange.end.column;
	    
	    
	    encodedtext = _b64encode(view.selectedText());
	    
	    document.editBegin();
	    document.removeText(fromLine,fromColumn, toLine,toColumn);
	    document.insertText(fromLine,fromColumn, encodedtext);
	    document.editEnd();
	} 
    } else {
      // No Selection, encodes all document
      encodedtext = _b64encode(document.text());
      
      document.editBegin();
      document.setText(encodedtext);
      document.editEnd();
    }
}


function b64decode ()
{
    var selectionRange = view.selection();
    if ( view.hasSelection() ) {
        // Decodes from BASE64 only the selected text
	if (selectionRange.isValid()) {
	    
	    var fromLine = selectionRange.start.line;
	    var toLine = selectionRange.end.line;
	    var fromColumn = selectionRange.start.column;
	    var toColumn= selectionRange.end.column;
	    
	    
	    encodedtext = _b64decode(view.selectedText());
	    
	    document.editBegin();
	    document.removeText(fromLine,fromColumn, toLine,toColumn);
	    document.insertText(fromLine,fromColumn, encodedtext);
	    document.editEnd();
	} 
    } else {
      // No Selection, decodes all document
      encodedtext = _b64decode(document.text());
      document.editBegin();
      document.setText(encodedtext);
      document.editEnd();
    }
}

function b64xmltidy()
{
    var selectionRange = view.selection();
    if ( view.hasSelection() ) {
        // Tidy only the selected text
	if (selectionRange.isValid()) {
	    
	    var fromLine = selectionRange.start.line;
	    var toLine = selectionRange.end.line;
	    var fromColumn = selectionRange.start.column;
	    var toColumn= selectionRange.end.column;
	    
	    // Use regexp to search globally the end tags that right beside start tags
	    // even if it has spaces between the tags.
	    // For REGEXP help, see http://www.w3schools.com/jsref/jsref_obj_regexp.asp
	    
	    // First remove all hardcoded LF an CR
	    doctext = view.selectedText().replace(/\n*/g,"");
	    doctext = doctext.replace(/\r*/g,"");
	    
	    // Second split all final tag/start tag into end tag, New Line, start tag
	    encodedtext = view.selectedText().replace(/>\s*</g,">\n<");
  
	    document.editBegin();
	    document.removeText(fromLine,fromColumn, toLine,toColumn);
	    document.insertText(fromLine,fromColumn, encodedtext);
	    document.editEnd();
	} 
    } else {
      // No Selection, process all document
      encodedtext = document.text().replace(/>\s*</g,">\n<");

      document.editBegin();
      document.setText(encodedtext);
      document.editEnd();
    }  
  
}

function b64wrap80()
{
    var selectionRange = view.selection();
    if ( view.hasSelection() ) {
        // Process selection
	if (selectionRange.isValid()) {
	    
	    var fromLine = selectionRange.start.line;
	    var toLine = selectionRange.end.line;
	    var fromColumn = selectionRange.start.column;
	    var toColumn= selectionRange.end.column;
	    
	    // First remove all hardcoded LF an CR
	    doctext = view.selectedText().replace(/\n*/g,"");
	    doctext = doctext.replace(/\r*/g,"");
	    
	    // Second split text at column 77 (not 80 to have space for LFCR)
	    newtext = "";
	    
	    len = doctext.length;
	    
	    for ( start = 0 ; start < len - 77 ; start = start + 77 ) {
	      newtext = newtext + doctext.substring(start, start + 77) + "\n";
	      
	    }  
	    newtext = newtext + doctext.substring(start) + "\n";
	    
	    
	    document.editBegin();
	    document.removeText(fromLine,fromColumn, toLine,toColumn);
	    document.insertText(fromLine,fromColumn, newtext);
	    document.editEnd();
	} 
    } else {
	    // First remove all hardcoded LF an CR
	    doctext = document.text().replace(/\n*/g,"");
	    doctext = doctext.replace(/\r*/g,"");
	    
	    // Second split text at column 78 (not 80 to have space for LFCR)
	    newtext = "";
	    
	    len = doctext.length;
	    
	    for ( start = 0 ; start < len - 77 ; start = start + 77 ) {
	      newtext = newtext + doctext.substring(start, start + 77) + "\n";
	      
	    }  
	    newtext = newtext + doctext.substring(start) + "\n";
	    document.editBegin();
	    document.setText(newtext);
	    document.editEnd();
    }  
  
}

// ---------------
// The following code was taken/borrowed from http://www.webtoolkit.info/javascript-base64.html
// and adapted to be used by Kate Script.

// Private functions
function _b64encode(input) {
		_keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
 

		while (i < input.length) {
 
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
 
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
 
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
 
			output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
 
		}
 
		return output;
	}
	
function _b64decode(input) {
		_keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
 
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
		while (i < input.length) {
 
			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));
 
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
 
			output = output + String.fromCharCode(chr1);
 
			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
 
		}
		return output;
 
	}	
