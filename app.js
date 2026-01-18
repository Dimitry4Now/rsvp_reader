document.addEventListener("DOMContentLoaded", () => {
	let words = [];
	let index = 0;
	let timer = null;
	let currentTextIndex = 0;

	let progressive = true;
	let currentWpm = 200;
	let wordsShown = 0;

	const wordEl = document.getElementById("word");
	const wpmSlider = document.getElementById("wpm");
	const wpmValue = document.getElementById("wpmValue");

	let wpm = 300;
	wpmSlider.value = 300;
	wpmValue.textContent = 300;

	wpmSlider.oninput = () => {
		wpm = +wpmSlider.value;
		wpmValue.textContent = wpm;
	};

	document.getElementById("progressive").onchange = e => {
		progressive = e.target.checked;
	};

	function getORPIndex(word) {
		if (word.length <= 1) return 0;
		if (word.length <= 5) return 1;
		if (word.length <= 9) return 2;
		return Math.floor(word.length * 0.35);
	}

	function loadRandomText() {
		currentTextIndex = Math.floor(Math.random() * texts.length);
		words = texts[currentTextIndex].content.split(/\s+/);
		console.log(`Loaded: "${texts[currentTextIndex].title}" (${words.length} words)`);
	}

	function updateStatus() {
		document.getElementById("current-title").textContent = texts[currentTextIndex].title;
		document.getElementById("word-count").textContent = `${index} / ${words.length}`;
	}

	function renderWord(word) {
		wordEl.innerHTML = "";
		const orpIndex = getORPIndex(word);

		[...word].forEach((char, i) => {
			const span = document.createElement("span");
			span.textContent = char;
			span.className = `letter ${i === orpIndex ? "orp" : ""}`;
			wordEl.appendChild(span);
		});

		// Calculate actual offset by measuring rendered elements
		const orpLetter = wordEl.children[orpIndex];
		const orpRect = orpLetter.getBoundingClientRect();
		const wordRect = wordEl.getBoundingClientRect();
		const preciseOffset = orpRect.left - wordRect.left + (orpRect.width / 2);
	
		wordEl.style.left = "50%";
		wordEl.style.transform = `translateX(${-preciseOffset}px)`;
	}

	function getDelay() {
		let delay = 60000 / currentWpm;
		const word = words[index] || "";
		if (word.match(/[.!?]$/)) delay *= 1.6;
		if (word.endsWith(",")) delay *= 1.3;
		return delay;
	}

	function step() {
		renderWord(words[index]);
		index++;
		wordsShown++;
		updateStatus();

		if (progressive && wordsShown % 25 === 0 && currentWpm < wpm) {
			currentWpm += 25;
		}

		timer = setTimeout(step, getDelay());
	}

	document.getElementById("start").onclick = () => {
		clearTimeout(timer);
		loadRandomText();
		index = 0;
		wordsShown = 0;
		currentWpm = progressive ? 200 : wpm;
		document.getElementById("start").textContent = "Start";
		updateStatus();
		step();
	};

	document.getElementById("pause").onclick = () => {
		clearTimeout(timer);
	};

	const themeSwitch = document.getElementById("themeSwitch");
	themeSwitch.onchange = () => {
		if (themeSwitch.checked) {
			document.body.classList.add("light");
			document.body.classList.remove("dark");
		} else {
			document.body.classList.add("dark");
			document.body.classList.remove("light");
		}
	};

	// Initialize with random text
	loadRandomText();
	updateStatus();
});

