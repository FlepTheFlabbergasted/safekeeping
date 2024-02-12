let hostDiv;
let columnState = '';
const singleColumn = document.createElement('div');
const doubleColumnA = document.createElement('div');
const doubleColumnB = document.createElement('div');

singleColumn.className = 'column';
doubleColumnA.className = 'column';
doubleColumnB.className = 'column';

window.onload = function() {
  hostDiv = document.querySelector('.column-50-50');
  const hostDivClone = hostDiv.cloneNode(true);
  const hostDivChildren = hostDiv.children;
  
  console.log(hostDiv);
  console.log(hostDivChildren);

  for(let i = 0; i < hostDivChildren.length; i++) {
    // If odd index
    if(i % 2 === 0) {
      doubleColumnA.appendChild(hostDivClone.firstElementChild)
    } else {
      doubleColumnB.appendChild(hostDivClone.firstElementChild)
    }
  }

  singleColumn.replaceChildren(...hostDivChildren);

  stuff(window.innerWidth);
  delete hostDivClone;
}

window.onresize = function(resizeEvent) {
  const windowWidth = resizeEvent.srcElement.innerWidth;
  console.log(windowWidth);
  stuff(windowWidth);
}

function stuff(windowWidth) {
  if(windowWidth <= 1000 && columnState !== 'single' ) {
    console.log('Single column');
    hostDiv.replaceChildren();
    hostDiv.replaceChildren(singleColumn);
    columnState = 'single';
  } else if(windowWidth >= 1000 && columnState !== 'double') {
    console.log('Double column');
    hostDiv.replaceChildren();
    hostDiv.appendChild(doubleColumnA);
    hostDiv.appendChild(doubleColumnB);
    columnState = 'double';
  }
}
