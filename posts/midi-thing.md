---
title: "MIDI Thing"
date: 2026-03-24
hero: posts/midi-thing/hero.jpg
summary: "A simple breakout board that adds DIN MIDI and TRS Type A jacks to the Expert Sleepers Disting mk4."
featured: true
repo: https://github.com/ulfmagnetics/midi-thing
---

## 

I picked up an [Expert Sleepers Disting mk4](https://www.expert-sleepers.co.uk/disting.html) last month. It's a pretty amazing little module with an unbelievable number of functions! As I was looking through the manual I realized that it supports MIDI I/O via an onboard header, but you need to provide your own breakout board (with either MIDI or TRS jacks) to actually make use of it. The breakout is simple but seems to be sold out everywhere I looked online, and I was looking for a first PCB design project, so I decided to make one myself!

The MIDI Thing is a 4HP, fully passive module (no current draw) that connects to the Disting Mk4's GT2 header via a 4-wire ribbon cable and provides both 5-pin DIN and TRS-A jacks for MIDI I/O. 

If you're interested in making one for yourself, all the build files and instructions can be found in the [Github repo](https://github.com/ulfmagnetics/midi-thing), including:

- KiCAD Project (schematic + PCB)
- Gerber files (ready for upload to JLBPCB, OSH Park, etc)
- Faceplate SVG (ready for import into Lightburn for laser cutting)
- BOM CSV (ready for upload to Mouser)
- Parts list
- Build instructions

This is a beginner-friendly project. If you have a Disting Mk4 and want to unlock its MIDI I/O capabilities, give it a try! If you run into difficulties open up an issue on the Github repo and I'll see if I can help.