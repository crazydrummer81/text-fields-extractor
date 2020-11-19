'use strict';


class ButtonCopy {
	constructor(text) {
		this.node = document.createElement('div');
		this.node.classList.add('button-copy');
		this.node.innerText = text.length > 20 ? text.slice(0,20) + '...' : text;
		this.node.dataset.fullText = text;

		this.node.addEventListener('click', (e) => {
			navigator.clipboard.writeText(this.node.dataset.fullText)
        .then(() => {
				console.log('Copied:', text);
				this.node.classList.add('overlayed');
            setTimeout( () => { 
					this.node.classList.remove('overlayed');
            }, 500);
        })
        .catch(err => {
            console.error('Something went wrong', err);
        });	
		});
	}
	appendTo(parentNode) {
		parentNode.append(this.node);
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const prefix  = document.getElementById('source-text-param-prefix').value,
			postfix = document.getElementById('source-text-param-postfix').value;

	const inputNode = document.getElementById('source-text'),
			resultNode = document.getElementById('result'),
			resultLabelNumberNode = document.querySelector('#result-label span');
	
	inputNode.addEventListener('input', function(e) {
		const re = new RegExp(`${prefix}(.*?)${postfix}`, 'g')
		const matches = inputNode.value.matchAll(re);
		resultNode.innerHTML = '';
		let count = 0;
		for (let item of matches) {
			count++;
			const button = new ButtonCopy(item[1]);
			button.appendTo(resultNode);
		};
		resultLabelNumberNode.innerText = count;
	});

});

