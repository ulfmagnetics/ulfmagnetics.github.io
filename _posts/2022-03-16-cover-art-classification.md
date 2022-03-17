# Cover Art Classification: Doom Metal vs. Classical

Continuing my journey through Chapter 2 of the fast.ai course (first mentioned
[here](/2022/03/06/bear-classification.html)), I decided to follow the example
of the bear classifier with my own, slightly different classifier -- one that
is trained to tell the difference between album covers in two *very* distinct
musical genres -- [doom metal](https://en.wikipedia.org/wiki/Doom_metal) and classical.

If you'd like to try it out for yourself, you can click this button to spin up a
Binder container that hosts the classifier as a Voila app:

[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/ulfmagnetics/cover-art-classifier/HEAD?urlpath=%2Fvoila%2Frender%2Fapp.ipynb)

The accuracy is actually pretty decent, reaching a success rate of about 93% after training
on a dataset of about 1100 images pulled via the [MusicBrainz API](https://musicbrainz.org/doc/MusicBrainz_API)
and its friend the [Cover Art Archive](https://coverartarchive.org/).

The full Github repo, including the notebook I used to download the album covers
and to train the network, is [here](https://github.com/ulfmagnetics/cover-art-classifier).
