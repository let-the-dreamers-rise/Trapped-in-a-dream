# Real GATE past-year papers

Files here hold ACTUAL past-year questions transcribed from official GATE papers,
kept separate from the practice bank so their provenance is never ambiguous.

Each file registers one paper:

```js
window.GATE_DATA = window.GATE_DATA || {};
window.GATE_DATA.pyq = window.GATE_DATA.pyq || [];
window.GATE_DATA.pyq.push({
  year: 2023,
  paper: 'CS',
  source: 'Official question paper, IIT Kanpur',
  questions: [
    { id: 'gate2023-cs-q1', n: 1, q: '...', options: ['...','...','...','...'],
      answer: 2, marks: 1, section: 'GA', topic: 'apti-verbal',
      explanation: '...' }
    // NAT: options: [], answer: <number>, kind: 'nat'
    // MSQ: answers: [indices]
  ]
});
```

Rules for anything added here:
- Only questions transcribed from a real paper. No generated lookalikes.
- `year` must be the paper's actual year. If the year is unknown, the question does
  not belong in this directory — put it in the practice bank instead.
- `answer` must match the official answer key, not a guess.

## Questions deliberately left out

Most gaps are now closed by reading the rendered page rather than the extracted
text. A few questions are still excluded on purpose, and it is worth recording why
so nobody "fixes" them back in:

- **The official key accepts two answers.** GATE 2019 CS 12 (`C OR D`) and CS 42
  (`3.7 to 3.8 OR 4.0 to 4.1`), GATE 2023 CS 17 and CS 30. A question with no
  single correct answer would be scored wrong half the time by a learner who
  reasoned correctly.
- **The key marks the question dropped.** GATE 2023 GA 2, `MTA` — marks to all.
- **The diagram cannot be reproduced faithfully.** GATE 2022 CS 50 (the Petersen
  graph, whose option C embeds a second graph that has to be judged isomorphic to
  the first) and GATE 2025 Set 1 GA 9 (a paper-folding puzzle whose four options
  each carry eight small corner marks that are the entire content). An approximate
  redraw of either would misrepresent the question rather than illustrate it.
- **GATE 2024 Set 1 GA 10** — the line-of-symmetry question. The printed figure
  has one square above the line AB and six below it (four in the first row, two in
  the second). Mirroring the six below needs three additions in the first row above
  and two in the second: five. The official key says six. Two independent readings
  and a check against the page at 6x magnification all give five, and the redrawn
  figure reproduces the printed one exactly — so the disagreement is between the
  published key and the published figure, not an error in transcription. Since the
  app marks answers right or wrong, keeping it would mark a correct count as wrong.

- **GATE 2014 Set 2 CS 25** — the TTL question. The diagram shows five router
  squares along the path from S to R, which gives 32 − 5 = 27, but the official key
  says 26. The count could not be reconciled against the scan at 4× magnification.
  Rather than ship a figure that visibly contradicts its own answer, the question
  is left out. If someone can establish the true router count, it can come back.

The rule throughout: a question that teaches something false is worse than a
question that is not there.
