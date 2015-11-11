# KDE KATE Script b64functions.js 

1) Purpose:
  
  This script adds four new functions to the Kate Editor:

   **b64encode**:   encodes the select text or all document, if no text is selected, to BASE64
   **b64decode**:   decodes from BASE64 the selected text or all document if no text is selected.
   **b64xmltidy**:  Splits XML tags, one for each line
   **b64wrap80**:   Line wraps at column 80 the selected text or all document if no text is selected.


2) How to install:

  Just copy the b64functions.js script to the Kate scripts directory (the path is valid for Plasma 5)

    sudo cp b64functions.js /usr/share/apps/katepart/script/commands

  and restart Kate, or using Kate command line (Press F7) execute the command **reload-scripts**
  

3) Functions manual:

 The b64encode and b64decode are more or less self-explanatory. Select text to encode or decode. If no text is selected 
 the b64 functions is applied to all text.

 b64xmltidy allows that a XML file that was encoded into BASE64 as a sigle line, be split into
 a more human readable form by putting each xml tag on a new line.

 b64wrap80 wraps the text output from the b64encode command so it spans several lines instead of 
 just one single line.

4) How to use it:

  This was tested with Kate 15.08.3 running on Plasma 5.4.

  To use just go to Tools->Scripts->Editing and the new available functions should appear.

  Also if pressing F7 key to access Kate command line and writing **b64** should show the available functions. see attached screenshot.

  If text is select then the above functions are only applied on the selected text, otherwise all document content is processed.
