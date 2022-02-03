/* Nicholas Bashour - CS 142 - Project 3 - February 2, 2022 */

'use strict';

class TableTemplate
{
    static fillIn(tableId, dictionary, columnToUpdate)
    {
        // Update the column names in the header row
        var table = document.getElementById(tableId);
        var headerRow = table.rows[0];        
        var processor = new Cs142TemplateProcessor(headerRow.innerHTML);
        headerRow.innerHTML = processor.fillIn(dictionary);        

        // Update table visibility
        table.style.visibility = "visible";

        // If there's no column specified, update the whole table & return
        if(columnToUpdate === undefined)
        {
            processor = new Cs142TemplateProcessor(table.innerHTML);
            table.innerHTML = processor.fillIn(dictionary);
            return;
        }
        
        // Find column to update
        var columnNo = -1;
        for(var i = 0; i < headerRow.children.length; i++)
        {
            if(headerRow.children[i].innerHTML === columnToUpdate) columnNo = i;
        }
        
        // If none found, return; else update all columns
        if(columnNo === -1) return;

        // For each row after header: process the appropriate column of that row 
        for(var j = 1; j < table.rows.length; j++)
        {
            var cell = table.rows[j].children[columnNo];
            processor = new Cs142TemplateProcessor(cell.innerHTML);
            cell.innerHTML = processor.fillIn(dictionary);            
        }
    }
}