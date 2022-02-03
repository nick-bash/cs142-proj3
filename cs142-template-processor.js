 /* Nicholas Bashour - CS 142 - Project 3 - February 2, 2022 */

'use strict';

function Cs142TemplateProcessor (template)
{
    this.template = template;
}

Cs142TemplateProcessor.prototype.fillIn = function(dictionary)
{
        var foundProp = true;        
        var replacementText;
        var startPos;
        var endPos;
        var property; 

        // Iteratively search through the string for '{{...}}' until no longer found
        while(foundProp)
        {            
            startPos = this.template.search(/{{/);
            endPos = this.template.search(/}}/);
            
            if(startPos !== -1 && endPos !== -1) // check was found
            {
                property = this.template.slice(startPos + 2, endPos);
                replacementText = dictionary[property] ? dictionary[property] : "";                
                this.template = this.template.replace("{{"+property+"}}", replacementText);                
            }
            else
            {
                foundProp = false;                
            }            
        }
        
        return this.template;
};