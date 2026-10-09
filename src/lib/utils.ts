// Zero-pads to at least two digits (wider if the total needs it): "No. 03 of 12".
export function pad(value: number, total: number) {
  return String(value).padStart(Math.max(2, String(total).length), "0")
}
