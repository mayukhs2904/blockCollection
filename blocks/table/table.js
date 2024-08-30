import { moveInstrumentation } from '../../scripts/scripts.js';
/*
 * Table Block
 * Recreate a table
 * https://www.hlx.live/developer/block-collection/table
 */

  function buildCell(rowIndex) {
    console.log("hello")
    const cell = rowIndex ? document.createElement('td') : document.createElement('th');
    if (!rowIndex) cell.setAttribute('scope', 'col');
    return cell;
  }

  export default async function decorate(block) {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const header = !block.classList.contains('no-header');
    [...block.children].forEach((row, i) => {
      const tr = document.createElement('tr');
      // moveInstrumentation(row, tr);
      buildCell(row);
  
      [...row.children].forEach((cell) => {
        const td = document.createElement(i === 0 && header ? 'th' : 'td');
  
        if (i === 0) td.setAttribute('scope', 'column');
        td.innerHTML = cell.innerHTML;
        tr.append(td);
      });
      if (i === 0 && header) thead.append(tr);
      else tbody.append(tr);
    });
    table.append(thead, tbody);
    block.replaceChildren(table);
  }