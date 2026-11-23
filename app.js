document.addEventListener("DOMContentLoaded", () => {
	let words = [];
	let index = 0; // first word of the next chunk
	let timer = null;
	let running = false;
	let wordsPerDisplay = 1;
	let progressive = true;
	let wpm = 300;
	let wordsShown = 0;

	const wordEl = document.getElementById("word");
	const wpmSlider = document.getElementById("wpm");
	const wpmValue = document.getElementById("wpmValue");
	const wordsPerDisplaySlider = document.getElementById("wordsPerDisplay");
	const wordsPerDisplayValue = document.getElementById("wordsPerDisplayValue");
	const progressiveBox = document.getElementById("progressive");
	const customTextEl = document.getElementById("customText");
	const titleEl = document.getElementById("current-title");
	const countEl = document.getElementById("word-count");
	const startButton = document.getElementById("start");
	const pauseButton = document.getElementById("pause");

	wpmSlider.value = wpm;
	wpmValue.textContent = wpm;
	wordsPerDisplaySlider.value = wordsPerDisplay;
	wordsPerDisplayValue.textContent = wordsPerDisplay;
	titleEl.textContent = "";
	countEl.textContent = "";

	// Read live, so moving a slider changes the reading already under way.
	wpmSlider.oninput = () => {
		wpm = +wpmSlider.value;
		wpmValue.textContent = wpm;
	};
	wordsPerDisplaySlider.oninput = () => {
		wordsPerDisplay = +wordsPerDisplaySlider.value;
		wordsPerDisplayValue.textContent = wordsPerDisplay;
	};
	progressiveBox.onchange = () => {
		progressive = progressiveBox.checked;
	};

	function getORPIndex(word) {
		if (word.length <= 1) return 0;
		if (word.length <= 5) return 1;
		if (word.length <= 9) return 2;
		return Math.floor(word.length * 0.35);
	}

	/** Progressive mode starts at 200 WPM and adds 25 every 5 words, up to the slider. */
	function speed() {
		if (!progressive) return wpm;
		return Math.min(wpm, 200 + 25 * Math.floor(wordsShown / 5));
	}

	/**
	 * How long a chunk stays up: each word its share of a minute, so several
	 * words at once read at the same speed as one by one, and longer when the
	 * chunk ends a sentence or a clause.
	 */
	function delayFor(chunk) {
		let delay = (60000 / speed()) * chunk.length;
		const last = chunk[chunk.length - 1] || "";
		if (/[.!?]["')\]]*$/.test(last)) delay *= 1.6;
		else if (/[,;:]["')\]]*$/.test(last)) delay *= 1.3;
		return delay;
	}

	function loadText() {
		const custom = customTextEl.value.trim();
		if (custom) {
			words = custom.split(/\s+/);
			return "Custom entered text";
		}
		const text = texts[Math.floor(Math.random() * texts.length)];
		words = text.content.trim().split(/\s+/);
		return text.title;
	}

	function updateStatus() {
		countEl.textContent = `${index} / ${words.length}`;
	}

	function renderWords(chunk) {
		wordEl.innerHTML = "";
		const centerIdx = Math.floor(chunk.length / 2);
		chunk.forEach((word, i) => {
			const wordDiv = document.createElement("div");
			wordDiv.className = `word-group ${i === centerIdx ? "center-word" : ""}`;
			const orpIndex = getORPIndex(word);
			[...word].forEach((char, j) => {
				const span = document.createElement("span");
				span.textContent = char;
				span.className = `letter ${j === orpIndex ? "orp" : ""}`;
				wordDiv.appendChild(span);
			});
			wordEl.appendChild(wordDiv);
		});

		// Keep the middle word's highlighted letter on the focus lines.
		const orpLetter = wordEl.querySelector(".center-word .orp");
		if (orpLetter) {
			const orpRect = orpLetter.getBoundingClientRect();
			const containerRect = wordEl.getBoundingClientRect();
			const offset = orpRect.left - containerRect.left + orpRect.width / 2;
			wordEl.style.left = "50%";
			wordEl.style.transform = `translateX(${-offset}px)`;
		}
	}

	function step() {
		const chunk = words.slice(index, index + wordsPerDisplay);
		renderWords(chunk);
		index += chunk.length;
		wordsShown += chunk.length;
		updateStatus();

		if (index < words.length) {
			// The pause belongs to what is on screen now, not to the next chunk.
			timer = setTimeout(step, delayFor(chunk));
		} else {
			running = false;
			pauseButton.textContent = "Pause";
		}
	}

	function start() {
		clearTimeout(timer);
		titleEl.textContent = loadText();
		index = 0;
		wordsShown = 0;
		running = true;
		pauseButton.textContent = "Pause";
		updateStatus();
		step();
	}

	function pause() {
		clearTimeout(timer);
		running = false;
		pauseButton.textContent = "Resume";
	}

	function resume() {
		if (index === 0 || index >= words.length) return;
		running = true;
		pauseButton.textContent = "Pause";
		step();
	}

	startButton.onclick = start;
	pauseButton.onclick = () => (running ? pause() : resume());

	// Space pauses and resumes, or starts when nothing is loaded yet.
	document.addEventListener("keydown", e => {
		if (e.code !== "Space" || e.target === customTextEl) return;
		e.preventDefault();
		if (running) pause();
		else if (index > 0 && index < words.length) resume();
		else start();
	});

	// The theme follows the system until it is switched, then is remembered.
	const themeSwitch = document.getElementById("themeSwitch");
	function applyTheme(light) {
		document.body.classList.toggle("light", light);
		document.body.classList.toggle("dark", !light);
		themeSwitch.checked = light;
	}
	const saved = localStorage.getItem("rsvp-theme");
	applyTheme(saved ? saved === "light" : window.matchMedia("(prefers-color-scheme: light)").matches);
	themeSwitch.onchange = () => {
		applyTheme(themeSwitch.checked);
		localStorage.setItem("rsvp-theme", themeSwitch.checked ? "light" : "dark");
	};
});
