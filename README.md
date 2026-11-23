# RSVP Reader

A minimalist speed reading app using Rapid Serial Visual Presentation (RSVP) with Optimal Recognition Point (ORP) highlighting. Practice reading at 180-800 WPM with precise letter centering and punctuation-aware timing.

## Live Demo

https://dimitry4now.github.io/rsvp_reader/

## Features

- ORP highlighting - the optimal recognition point (about a third into each word) is coloured and held on the focus lines
- Precise centering - the ORP letter is centred from its measured position, so long and short words don't jump around
- WPM control - 180-800 words per minute; moving the slider changes a reading already under way
- Words per display - 1, 3 or 5 at a time, still at the chosen WPM
- Progressive mode - starts at 200 WPM and adds 25 every 5 words, up to the slider
- Smart timing - a word or group ending a sentence stays up x1.6, one ending a clause (`,` `;` `:`) x1.3
- Pause and resume - continue from the same word; Space does the same
- Dark and light themes - follows the system until switched, then remembered
- Custom text - paste anything into the text area; leave it empty for a random passage
- Phone-friendly layout; no dependencies, no build step (about 11 KB gzipped)

## Usage

1. Paste a text, or leave the box empty for a random passage
2. Set the WPM and the words per display (WPD)
3. Leave Progressive on to ease into the speed, or off to start at it
4. Start reads from the beginning; Pause / Resume, or Space, stops and continues
5. The switch in the top right changes the theme

## File structure

- `index.html` - the page
- `app.js` - reading loop, ORP, timing, controls
- `texts.js` - the built-in passages
- `style.css` - layout and both themes

## Customization

Add your own reading passages in texts.js:

const texts = [
  { title: "Your Title", content: "Your text here..." },
  // Add more...
];

## Deployment

GitHub Pages serves the `master` branch at https://dimitry4now.github.io/rsvp_reader/, so whatever is merged into `master` is live a minute later. To try a change first, open `index.html` in a browser: there is nothing to build.

## Speed Reading Guide

180-250 WPM = Normal reading; 
300-400 WPM = Good speed; 
500-700 WPM = Advanced; 
800+ WPM    = Expert



