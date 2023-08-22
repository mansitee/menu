const inputs = document.querySelectorAll('input');
const radioInputs = document.querySelectorAll('.radio input');
const colorInputs = document.querySelectorAll('.half-container input');
const angleContainer = document.getElementById('angle-container');
const closeButtons = document.querySelectorAll('.close');
const gradientModal = document.getElementById('gradient-modal');
const codeModal = document.getElementById('code-modal');
const showCode = document.getElementById('showCode');
const showControls = document.getElementById('showControls');
const copyToClipboard = document.getElementById('copyToClipboard');


function setBackground() {
	if (this.name === 'background' && this.value === 'linear-gradient') {
		document.documentElement.style.setProperty(
			`--${this.name}`,
			`${this.value}(var(--gradient-angle), var(--first-color), var(--second-color))`
		);
	} else if (this.name === 'background' && this.value === 'radial-gradient') {
		document.documentElement.style.setProperty(
			`--${this.name}`,
			`${this.value}(var(--first-color), var(--second-color))`
		);
	} else {
		document.documentElement.style.setProperty(
			`--${this.name}`,
			this.value
		);
	}
}

function hideLinearAngle() {
	if (this.value === 'radial-gradient') {
		angleContainer.classList.add('hide');
	} else {
		angleContainer.classList.remove('hide');
	}
}

function updateLabels() {
	let label = document.getElementById(`${this.name}-label`);
	label.innerHTML = this.value;
}

function closeModal() {
	gradientModal.classList.add('hide');
	codeModal.classList.add('hide');
	showControls.classList.remove('hide');
}

function showCodeModal() {
	gradientModal.classList.add('hide');
	codeModal.classList.remove('hide');
	showControls.classList.remove('hide');
	copyToClipboard.classList.remove('clicked');
}

function showGradientModal() {
	gradientModal.classList.remove('hide');
	codeModal.classList.add('hide');
	showControls.classList.add('hide');
}

function getBackgroundCode() {
	let bgContainer = document.querySelector('.container');
	let style = getComputedStyle(bgContainer);
	let backgroundImage = style.backgroundImage;
	let code = document.getElementById('code');
	code.innerHTML = `background: ${backgroundImage};`;
}

function clipboard() {
	let code = document.getElementById('code').innerHTML;
	navigator.clipboard.writeText(code).then(function() {
  /* clipboard successfully set */
		console.log('copied!');
		copyToClipboard.classList.add('clicked');
}, function() {
		console.log('failed');
  /* clipboard write failed */
});
}

inputs.forEach((input) => input.addEventListener('change', setBackground));
inputs.forEach((input) => input.addEventListener('mousemove', setBackground));
radioInputs.forEach((input) => input.addEventListener('change', hideLinearAngle));
colorInputs.forEach((input) => input.addEventListener('change', updateLabels));
closeButtons.forEach((input) => input.addEventListener('click', closeModal));
showCode.addEventListener('click', showCodeModal);
showCode.addEventListener('click', getBackgroundCode);
showControls.addEventListener('click', showGradientModal);
copyToClipboard.addEventListener('click', clipboard);