export const weekNumber = Array.from({length: 42}, (_, i) =>
  (++i).toString().padStart(2, '0'),
)
