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
