// India distribution network (Sections 2 and 8). Coordinates are [longitude, latitude].
// `label` places each city's map label so neighbours (Mumbai/Pune, Bengaluru/Chennai) don't collide.

export const wholesaleOutlets = [
  { id: 'mumbai', name: 'Mumbai', coordinates: [72.88, 19.08], label: { dx: -12, dy: 4, anchor: 'end' } },
  { id: 'chennai', name: 'Chennai', coordinates: [80.27, 13.08], label: { dx: 12, dy: 4, anchor: 'start' } },
  { id: 'delhi', name: 'Delhi', coordinates: [77.21, 28.61], label: { dx: 12, dy: 4, anchor: 'start' } },
  { id: 'bengaluru', name: 'Bengaluru', coordinates: [77.59, 12.97], label: { dx: -12, dy: 4, anchor: 'end' } },
]

export const customerCities = [
  { id: 'ahmedabad', name: 'Ahmedabad', coordinates: [72.57, 23.02], label: { dx: -11, dy: 4, anchor: 'end' } },
  { id: 'pune', name: 'Pune', coordinates: [73.86, 18.52], label: { dx: 11, dy: 10, anchor: 'start' } },
  { id: 'kochi', name: 'Kochi', coordinates: [76.27, 9.93], label: { dx: -11, dy: 4, anchor: 'end' } },
  { id: 'kolkata', name: 'Kolkata', coordinates: [88.36, 22.57], label: { dx: 11, dy: 4, anchor: 'start' } },
  { id: 'jaipur', name: 'Jaipur', coordinates: [75.79, 26.91], label: { dx: -11, dy: 4, anchor: 'end' } },
  // Added in change request round 2 (18 Nov 2026). Kochi was already listed.
  // Raipur and Lucknow sit their labels under the dot to clear Bhubaneswar, Patna and Delhi;
  // Madurai's label runs right so it never meets Kochi's, which runs left.
  { id: 'raipur', name: 'Raipur', coordinates: [81.63, 21.25], label: { dx: 0, dy: 19, anchor: 'middle' } },
  { id: 'bhubaneswar', name: 'Bhubaneswar', coordinates: [85.82, 20.3], label: { dx: 11, dy: 4, anchor: 'start' } },
  { id: 'indore', name: 'Indore', coordinates: [75.86, 22.72], label: { dx: 11, dy: 4, anchor: 'start' } },
  { id: 'madurai', name: 'Madurai', coordinates: [78.12, 9.93], label: { dx: 11, dy: 4, anchor: 'start' } },
  { id: 'patna', name: 'Patna', coordinates: [85.14, 25.59], label: { dx: 11, dy: 4, anchor: 'start' } },
  { id: 'lucknow', name: 'Lucknow', coordinates: [80.95, 26.85], label: { dx: 0, dy: 19, anchor: 'middle' } },
]

export const distributionCentres = '10+'
