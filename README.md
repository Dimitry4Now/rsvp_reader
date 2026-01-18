# RSVP Reader

A minimalist speed reading app using Rapid Serial Visual Presentation (RSVP) with Optimal Recognition Point (ORP) highlighting. Practice reading at 180-800 WPM with precise letter centering and punctuation-aware timing.

## Live Demo

https://dimitry4now.github.io/rsvp_reader/

## Features

- ORP Highlighting - Highlights optimal recognition point (~30% into each word)
- Precise Centering - Dynamically centers ORP letter using bounding rects
- WPM Control - 180-800 WPM with live slider feedback
- Progressive Mode - Ramps from 200 WPM to target (+25 WPM/5 words)
- Smart Timing - Periods (x1.6), commas (x1.3), normal words (1x)
- Dark/Light Themes - Toggle with sun/moon switch
- Progress Tracking - Current passage + word count
- Random Texts - Multiple reading passages
- Custom Text - Paste the wanted text in the text area and get it displayed
- Zero Dependencies - Pure vanilla JavaScript

## Usage

1. Adjust WPM (180-800) using slider
2. Toggle Progressive mode (gradual speedup)
3. Click Start - reads random passage if the text area is empty. Or the pasted text if there is any.
4. Pause/Stop anytime
5. Theme toggle top-right

## File Structure

- index.html     - Main app (HTML structure)
- app.js         - RSVP logic + ORP + timing
- texts.js       - Textual entries
- style.css      - Responsive design + themes
- README.md      - This file

## Performance

- <10KB total - Instant loading
- 60fps rendering - Smooth transitions
- Mobile-friendly - Touch controls
- No build step - Edit & deploy instantly

## Customization

Add your own reading passages in texts.js:

const texts = [
  { title: "Your Title", content: "Your text here..." },
  // Add more...
];

## Deployment

Already live on GitHub Pages!
1. Push changes: git add . && git commit -m "update" && git push
2. Auto-deploys to https://dimitry4now.github.io/rsvp_reader/

## Speed Reading Guide

180-250 WPM = Normal reading; 
300-400 WPM = Good speed; 
500-700 WPM = Advanced; 
800+ WPM    = Expert



