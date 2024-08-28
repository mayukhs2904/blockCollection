import { toClassName } from '../../scripts/aem.js';

export default async function decorate(block) {
  // build tablist
  const tablist = document.createElement('div');
  const tabContent = document.createElement('div');
  tablist.className = 'tabs-list';
  tablist.setAttribute('role', 'tablist');

  // decorate tabs and tabpanels
  const tabs = [...block.children].map((child) => child.firstElementChild);
  tabs.forEach((tab, i) => {
    const id = toClassName(tab.textContent);

    // decorate tabpanel
    const tabpanel = block.children[i].firstElementChild.nextElementSibling;
    tabpanel.className = 'tabs-panel';
    tabpanel.id = `tabpanel-${id}`;
    tabpanel.setAttribute('aria-hidden', !!i);
    tabpanel.setAttribute('aria-labelledby', `tab-${id}`);
    tabpanel.setAttribute('role', 'tabpanel');

    // build tab button
    const button = document.createElement('button');
    button.className = 'tabs-tab';
    button.id = `tab-${id}`;
    button.innerHTML = tab.innerHTML;
    button.setAttribute('aria-controls', `tabpanel-${id}`);
    button.setAttribute('aria-selected', !i);
    button.setAttribute('role', 'tab');
    button.setAttribute('type', 'button');
    button.addEventListener('click', () => {
      block.querySelectorAll('[role=tabpanel]').forEach((panel) => {
        panel.setAttribute('aria-hidden', true);
      });
      tablist.querySelectorAll('button').forEach((btn) => {
        btn.setAttribute('aria-selected', false);
      });
      tabpanel.setAttribute('aria-hidden', false);
      button.setAttribute('aria-selected', true);
    });
    tabContent.append(tabpanel);
    tablist.append(button);
    
  });
  block.innerHTML='';
  [...tabContent.children].map((child) => block.append(child));
  block.prepend(tablist);
}

// eslint-disable-next-line import/no-unresolved
// import { createTag } from '../../scripts/scripts.js';

// function changeTabs(e) {
//   const { target } = e;
//   const tabMenu = target.parentNode;
//   const tabBlock = tabMenu.parentNode; 

//   tabMenu.querySelectorAll('[aria-selected="true"]').forEach((t) => t.setAttribute('aria-selected', false));

//   target.setAttribute('aria-selected', true);

//   tabBlock.querySelectorAll('[role=tabpanel]').forEach((panel) => {
//     panel.setAttribute('aria-hidden', true);
//   });


//   tabBlock.querySelector(`#${target.getAttribute('aria-controls')}`).setAttribute('aria-hidden', false);
// }

// function initTabs(block) {
//   const tabs = block.querySelectorAll('[role="tab"]');

//   tabs.forEach((tab) => {
//     tab.addEventListener('click', changeTabs);
//   });
// }
// let initCount = 0;
// export default async function decorate(block) {
//   const tabList = createTag('div', { class: 'tabs-list', role: 'tablist' });
//   const tabContent = createTag('div', { class: 'tabs-panel' });

//   const tabNames = [];
//   const tabContents = [];
//   // list of Universal Editor instrumented 'tab content' divs
//   const tabInstrumentedDiv = [];

//   [...block.children].forEach((child) => {
//     // keep the div that has been instrumented for UE
//     tabInstrumentedDiv.push(child);

//     [...child.children].forEach((el, index) => {
//       if (index === 0) {
//         tabNames.push(el.textContent.trim());
//       } else {
//         tabContents.push(el.childNodes);
//       }
//     });
//   });

//   tabNames.forEach((name, i) => {
//     const tabBtnAttributes = {
//       role: 'tab',
//       class: 'tabs-tab',
//       id: `tab-${initCount}-${i}`,
//       tabindex: i > 0 ? '0' : '-1',
//       'aria-selected': i === 0 ? 'true' : 'false',
//       'aria-controls': `tab-panel-${initCount}-${i}`,
//       'aria-label': name,
//       'data-tab-id': i,
//     };

//     const tabNameDiv = createTag('button', tabBtnAttributes);
//     tabNameDiv.textContent = name;
//     tabList.appendChild(tabNameDiv);
//   });

//   tabContents.forEach((content, i) => {
//     const tabContentAttributes = {
//       id: `tab-panel-${initCount}-${i}`,
//       role: 'tabpanel',
//       class: 'tabs-panel',
//       'aria-hidden': 'true',
//       tabindex: '0',
//       'aria-labelledby': `tab-${initCount}-${i}`,
//     };

//     // get the instrumented div
//     const tabContentDiv = tabInstrumentedDiv[i];
//     // add all additional attributes
//     Object.entries(tabContentAttributes).forEach(([key, val]) => {
//       tabContentDiv.setAttribute(key, val);
//     });

//     // default first tab is active
//     if (i === 0) tabContentDiv.setAttribute('aria-hidden',false);
//     tabContentDiv.replaceChildren(...Array.from(content));
//     tabContent.appendChild(tabContentDiv);
//   });

//   // Replace the existing content with the new tab list and tab content
//   block.innerHTML = ''; // Clear the existing content
//   block.appendChild(tabList);
//   [...tabContent.children].map((child) => block.append(child));

//   initTabs(block);
//   initCount += 1;
    
//   };
  