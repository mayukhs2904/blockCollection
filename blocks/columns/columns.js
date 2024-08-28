// export default function decorate(block) {
//   const cols = [...block.firstElementChild.children];
//   block.classList.add(`columns-${cols.length}-cols`);

//   // setup image columns
//   [...block.children].forEach((row) => {
//     [...row.children].forEach((col) => {
//       const pic = col.querySelector('picture');
//       if (pic) {
//         const picWrapper = pic.closest('div');
//         if (picWrapper && picWrapper.children.length === 1) {
//           // picture is only content in column
//           picWrapper.classList.add('columns-img-col');
//         }
//       }
//     });
//   });
// }

/*
 * Table Block
 * Recreate a table
 * https://www.hlx.live/developer/block-collection/table
 */

function buildCell(rowIndex) {
  const cell = rowIndex ? document.createElement('td') : document.createElement('th');
  if (!rowIndex) cell.setAttribute('scope', 'col');
  return cell;
}

export default async function decorate(block) {
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  const header = !block.classList.contains('no-header');
  if (header) table.append(thead);
  table.append(tbody);

  [...block.children].forEach((child, i) => {
    const row = document.createElement('tr');
    if (header && i === 0) thead.append(row);
    else tbody.append(row);
    [...child.children].forEach((col) => {
      const cell = buildCell(header ? i : i + 1);
      cell.innerHTML = col.innerHTML;
      row.append(cell);
    });
  });
  block.innerHTML = '';
  block.append(table);
}