// Daily guidance for Pisces (Meena rashi) — deterministic per date so the same day always shows the same card.
window.GATE_DATA = window.GATE_DATA || {};
(function () {
  var colors = ['Sea green', 'Aqua blue', 'White', 'Lavender', 'Silver grey', 'Light yellow', 'Turquoise'];
  var numbers = [3, 7, 12, 9, 21, 34, 43];
  var times = ['6:30–8:00 am', '9:00–10:30 am', '4:30–6:00 pm', '7:30–9:00 pm', '5:00–6:30 am'];
  var mantras = [
    'Om Namo Narayanaya — 11 times before the first study block settles a restless Pisces mind.',
    'Aum Hreem Kleem — a short round while breathing slowly resets focus between blocks.',
    'Om Gan Ganpataye Namah — invoked before a mock test, the remover of obstacles.',
    'Gayatri mantra at sunrise — Jupiter, lord of Meena rashi, is strongest in the morning.',
    'Om Brim Brihaspataye Namah — Thursday especially, strengthens Jupiter, your ruling planet.'
  ];
  var rituals = [
    'Keep a small glass of water on your desk and change it each morning — flowing water steadies Pisces energy.',
    'Face east for your first study block; Jupiter\'s direction favours absorption of new knowledge.',
    'Light a diya or candle for 2 minutes before evening revision to mark the shift into deep focus.',
    'Feed birds or any small act of daily kindness — Pisces concentration grows from a calm heart.',
    'Touch the feet of elders or mentally thank your teachers before a mock — humility sharpens Meena intuition.',
    'Wear or keep something yellow on Thursdays — Jupiter\'s day and colour, your strongest study day.',
    'Ten slow breaths with eyes closed before opening the question bank — Pisces rules the feet: sit grounded, both feet flat.'
  ];
  var focusLines = [
    'Your intuition is sharp today — trust your first instinct on 1-mark questions, verify on 2-mark ones.',
    'A dreamy day for Pisces — anchor yourself with written targets or the hours will dissolve. Check off every task.',
    'Jupiter favours deep study today — schedule your hardest topic in the morning block.',
    'Emotional tides run high — if frustration rises during practice, walk 5 minutes, then return. Do not quit the block.',
    'Strong memory day — put revision and formula recall in the evening slot.',
    'Ketu may scatter attention today — use shorter 45-minute sprints instead of 90-minute blocks.',
    'A good day to attempt a mock — your calm is deeper than usual. Simulate real exam pressure.'
  ];
  window.GATE_DATA.astroFor = function (date) {
    var d = date || new Date();
    var seed = d.getFullYear() * 372 + (d.getMonth() + 1) * 31 + d.getDate();
    function pick(arr, salt) { return arr[(seed + salt) % arr.length]; }
    return {
      color: pick(colors, 1),
      number: pick(numbers, 2),
      time: pick(times, 3),
      mantra: pick(mantras, 4),
      ritual: pick(rituals, 5),
      focus: pick(focusLines, 6)
    };
  };
})();
