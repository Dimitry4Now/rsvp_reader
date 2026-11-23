# RSVP Reader

A small speed-reading page I made to try out Rapid Serial Visual Presentation. Instead of your eyes moving along a line, the words come to you: one at a time, always in the same spot.

Try it at https://dimitry4now.github.io/rsvp_reader/

Each word is lined up on its optimal recognition point, the letter about a third of the way in where your eye naturally lands. That letter is coloured and held between two focus lines, so long and short words don't jump around and you can keep your eyes still and just read.

## Using it

Paste your own text into the box, or leave it empty to get one of the built-in passages. Pick a speed between 180 and 800 words per minute and press Start. You can change the speed while it's reading.

With Progressive on, it starts at 200 WPM and speeds up by 25 every five words until it reaches your speed, which makes the faster settings easier to settle into. You can also show three or five words at a time instead of one.

Words that end a sentence stay up a little longer (1.6 times), and so do words before a comma or a colon (1.3 times), so the rhythm still follows the text.

Pause stops on the current word and Resume carries on from there; Space does the same. The switch in the corner flips between dark and light and remembers your choice.

For a rough idea: 200 to 250 WPM is normal reading, 300 to 400 is quick, and past 500 takes practice.

## Running it locally

There's nothing to install or build. Open `index.html` in a browser. To add your own passages, edit `texts.js`:

```js
const texts = [
  { title: "Your title", content: "Your text here..." },
];
```

It's plain HTML, CSS and JavaScript: `app.js` has the reading loop and the timing, `style.css` the layout and both themes. GitHub Pages serves the `master` branch, so a change is live a minute after it's merged.
