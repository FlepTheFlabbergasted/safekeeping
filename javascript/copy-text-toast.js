// ####################################################################
// #    Bookmarklet to copy text and display a neat "copy" message    #
// ####################################################################
//
// 1. Replace 'YOUR-SELECTORS-HERE' with correct queries to select the text you want
// 2. Create a bookmark in your browser and copy everything BELOW this comment
// 3. Click the bookmark to execute code
//

javascript:

function createSnackbarStyle() {
	let style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = `
	.snackbar {
		visibility: hidden;
		background-color: #333;
		color: #fff;
		text-align: center;
		border-radius: 500px;
		padding: 12px 16px;
		position: fixed;
		z-index: 100;
		left: 50%;
		transform: translate(-50%);
		top: 10px;
		animation: fadeInOut 0.8s ease-in-out;
	} 
	@keyframes fadeInOut { 
		0% {visibility: visible; top: 10px; opacity: 0; }
		25% { opacity: 1; }
		100% {top: 40px; opacity: 0; } 
	}`;

	document.getElementsByTagName('head')[0].appendChild(style);
}

function copyTextDisplaySnackbar() {
	let textToCopy = document.body.querySelector('YOUR-SELECTORS-HERE')?.innerText;

	if (!textToCopy) {
		throw new Error('Could not copy text!');
	}

	let div = document.createElement("div");
	div.innerText = 'Copied!';
	div.className = 'snackbar';
	document.body.appendChild(div);
	setTimeout(function() { document.body.removeChild(div)}, 850);

	let textArea = document.createElement("textarea");
	textArea.value = textToCopy;
	textArea.style.position = 'absolute';
	textArea.style.opacity = 0;
	document.body.prepend(textArea);
	textArea.focus();
	textArea.select();
	document.execCommand('copy');
	document.body.removeChild(textArea);
	console.log(textToCopy);
}

createSnackbarStyle();
copyTextDisplaySnackbar();
