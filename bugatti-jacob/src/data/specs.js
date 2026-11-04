/**
 * Technical specifications — edit freely.
 *
 * status:
 *   'verified' → matches published figures for the Jacob & Co. Bugatti Chiron Tourbillon
 *                (JCAM37 caliber; sources listed in README.md).
 *   'confirm'  → varies between case variants, or could not be matched to your exact
 *                reference. Shown with a visible "Confirm" tag until you edit it.
 * counters: only verified numeric values are animated.
 */
export const SPECS = [
  {
    id: 'movement', icon: 'Cog', label: 'Movement',
    value: 'JCAM37, manual winding',
    note: 'In-house Jacob & Co. caliber, Swiss made.',
    counters: [{ to: 578, label: 'components' }, { to: 51, label: 'jewels' }],
    status: 'verified',
  },
  {
    id: 'power', icon: 'BatteryCharging', label: 'Power reserve',
    counters: [{ to: 60, suffix: ' h', label: 'timekeeping' }],
    note: 'The engine animation has its own separate reserve.',
    status: 'verified',
  },
  {
    id: 'case', icon: 'Gem', label: 'Case material',
    value: 'Sapphire crystal, polished',
    note: 'Blue sapphire variant. Edit if your reference differs (e.g. titanium or steel bezel).',
    status: 'confirm',
  },
  {
    id: 'size', icon: 'Ruler', label: 'Case dimensions',
    value: '55 × 44 mm tonneau',
    note: 'Listed thickness for the blue sapphire variant: 21.5 mm.',
    status: 'confirm',
  },
  {
    id: 'water', icon: 'Droplets', label: 'Water resistance',
    counters: [{ to: 30, suffix: ' m', label: '3 atm' }],
    note: 'Not intended for swimming.',
    status: 'verified',
  },
  {
    id: 'strap', icon: 'Watch', label: 'Strap',
    value: 'Rubber, titanium deployment buckle',
    note: 'Blue rubber in this colourway.',
    status: 'verified',
  },
  {
    id: 'complications', icon: 'Timer', label: 'Complications',
    value: 'Hours, minutes, power reserve, flying tourbillon',
    note: 'One-minute tourbillon cage inclined at 30°.',
    status: 'verified',
  },
  {
    id: 'mech', icon: 'Settings2', label: 'Mechanical features',
    value: 'W16 engine with 16 pistons, animated on demand',
    note: 'Movement floats on four shock absorbers. Incabloc protection, 21,600 vph (3 Hz).',
    status: 'verified',
  },
]

/** Hotspots on the front image. x / y are percentages of the image box. */
export const HOTSPOTS = [
  { id: 'mech', x: 46, y: 34, title: 'W16 engine block', text: 'Sixteen pistons driven by the same movement that keeps time.' },
  { id: 'complications', x: 43, y: 60, title: 'Flying tourbillon', text: 'A one-minute cage, inclined at 30°.' },
  { id: 'case', x: 8, y: 40, title: 'Sapphire architecture', text: 'A case cut to show every component.' },
  { id: 'movement', x: 92, y: 45, title: 'Crowns', text: 'Time setting, winding and engine animation sit at the base of the case.' },
  { id: 'strap', x: 43, y: 86, title: 'Rubber strap', text: 'Blue rubber with the Bugatti monogram.' },
]
