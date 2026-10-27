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
]

export const distributionCentres = '10+'
