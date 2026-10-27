// Flat produce illustrations (viewBox 120×120) used until real photography arrives.
// One per product slug, plus the export range (rice, mangoes, vegetables).

const BROWN = '#6B4423'
const LEAF = '#6BAA3C'

const Shadow = ({ rx = 32 }) => <ellipse cx="60" cy="106" rx={rx} ry="5" fill="#1E4D2B" opacity=".1" />
const Shine = (props) => <ellipse fill="#fff" opacity=".35" {...props} />

const ring = (count, radius, cx, cy) =>
  Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2
    return { x: cx + Math.cos(angle) * radius, y: cy + Math.sin(angle) * radius, deg: (angle * 180) / Math.PI }
  })

function Apples() {
  return (
    <>
      <Shadow />
      <path d="M60 40C49 31 27 33 27 60c0 23 15 42 28 42 3 0 4-1.6 5-1.6s2 1.6 5 1.6c13 0 28-19 28-42 0-27-22-29-33-20z" fill="#D7373F" />
      <path d="M60 40c11-9 33-7 33 20 0 23-15 42-28 42-3 0-4-1.6-5-1.6z" fill="#A8222B" opacity=".25" />
      <Shine cx="42" cy="58" rx="5" ry="11" transform="rotate(-18 42 58)" />
      <path d="M60 41c0-7 2-12 6-16" stroke={BROWN} strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M65 31c5-9 16-11 22-7-4 8-14 11-22 7z" fill={LEAF} />
    </>
  )
}

function Oranges() {
  return (
    <>
      <Shadow />
      <circle cx="54" cy="62" r="32" fill="#F28C28" />
      <path d="M54 30a32 32 0 0 1 0 64z" fill="#C8651A" opacity=".22" />
      <Shine cx="42" cy="50" rx="7" ry="10" transform="rotate(-30 42 50)" />
      {[[60, 70], [48, 78], [66, 56], [40, 66], [70, 80]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.1" fill="#B65A12" opacity=".35" />
      ))}
      <path d="M54 31c-1-5 1-9 4-11" stroke={BROWN} strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M57 25c6-7 17-6 21-1-6 6-15 6-21 1z" fill={LEAF} />
      <circle cx="86" cy="86" r="18" fill="#FDE3B8" />
      <circle cx="86" cy="86" r="15" fill="#F9A13A" />
      {ring(8, 14, 86, 86).map(({ x, y }, i) => (
        <line key={i} x1="86" y1="86" x2={x} y2={y} stroke="#FDE3B8" strokeWidth="1.5" />
      ))}
      <circle cx="86" cy="86" r="2.2" fill="#FDE3B8" />
    </>
  )
}

function Mandarins() {
  return (
    <>
      <Shadow rx={38} />
      <ellipse cx="44" cy="70" rx="25" ry="22" fill="#F7931E" />
      <path d="M44 48a25 22 0 0 1 0 44z" fill="#C8651A" opacity=".2" />
      <Shine cx="34" cy="62" rx="5" ry="8" transform="rotate(-30 34 62)" />
      <ellipse cx="80" cy="78" rx="23" ry="20" fill="#FBA035" />
      <path d="M80 58a23 20 0 0 1 0 40z" fill="#C8651A" opacity=".2" />
      <Shine cx="71" cy="71" rx="4.5" ry="7" transform="rotate(-30 71 71)" />
      <path d="M44 49c0-5 2-8 5-10" stroke={BROWN} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M48 40c5-7 15-7 19-2-5 6-14 6-19 2z" fill={LEAF} />
      <path d="M80 59c-1-4 0-7 3-9" stroke={BROWN} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M82 51c-6-5-15-3-17 3 6 4 13 3 17-3z" fill="#7CB342" />
    </>
  )
}

function Kiwi() {
  return (
    <>
      <Shadow />
      <ellipse cx="44" cy="62" rx="24" ry="30" fill="#8B6A3E" transform="rotate(-12 44 62)" />
      <ellipse cx="38" cy="52" rx="6" ry="11" fill="#fff" opacity=".15" transform="rotate(-12 38 52)" />
      <circle cx="74" cy="74" r="27" fill="#8B6A3E" />
      <circle cx="74" cy="74" r="24" fill="#7DB83A" />
      <circle cx="74" cy="74" r="17" fill="#9CCB55" />
      <circle cx="74" cy="74" r="7" fill="#F3F6D9" />
      {ring(14, 11, 74, 74).map(({ x, y, deg }, i) => (
        <ellipse key={i} cx={x} cy={y} rx="1.2" ry="2.4" fill="#2B2B1E" transform={`rotate(${deg + 90} ${x} ${y})`} />
      ))}
    </>
  )
}

function DragonFruit() {
  const side = (x, y, dir) =>
    dir === 'left' ? `M${x} ${y}c-8-3-14-1-18 3 6 3 13 3 18-3z` : `M${x} ${y}c8-3 14-1 18 3-6 3-13 3-18-3z`
  const up = (x, y) => `M${x} ${y}c-4-6-2-12 3-14 2 6 1 11-3 14z`
  return (
    <>
      <Shadow />
      <path d="M60 26c-5 6-5 12 0 17 5-5 5-11 0-17z" fill="#7CB342" />
      <path d={side(36, 50, 'left')} fill="#8BC34A" />
      <path d={side(84, 56, 'right')} fill="#8BC34A" />
      <ellipse cx="60" cy="66" rx="28" ry="34" fill="#E0457B" />
      <path d="M60 32a28 34 0 0 1 0 68z" fill="#A82A57" opacity=".25" />
      <path d={side(36, 78, 'left')} fill="#8BC34A" />
      <path d={side(84, 84, 'right')} fill="#8BC34A" />
      <path d={up(50, 62)} fill="#A5D45F" />
      <path d={up(68, 74)} fill="#A5D45F" />
      <path d={up(52, 90)} fill="#A5D45F" />
      <path d={up(70, 50)} fill="#A5D45F" />
      <Shine cx="46" cy="50" rx="4" ry="9" transform="rotate(-15 46 50)" />
    </>
  )
}

function Pears() {
  return (
    <>
      <Shadow rx={28} />
      <path d="M60 30c-6 0-8 9-10 19-2 9-14 15-14 31 0 14 11 22 24 22s24-8 24-22c0-16-12-22-14-31-2-10-4-19-10-19z" fill="#C5D84A" />
      <path d="M60 30c6 0 8 9 10 19 2 9 14 15 14 31 0 14-11 22-24 22z" fill="#8FA52B" opacity=".4" />
      <circle cx="70" cy="82" r="10" fill="#E8833A" opacity=".25" />
      <Shine cx="48" cy="74" rx="4" ry="10" />
      <path d="M60 31c0-6 1-10 4-13" stroke={BROWN} strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M63 22c4-8 14-10 19-6-4 7-12 9-19 6z" fill={LEAF} />
    </>
  )
}

function Cherries() {
  return (
    <>
      <Shadow rx={36} />
      <path d="M44 72C47 56 55 40 66 28" stroke="#5A7A2A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M78 74C78 58 73 42 66 28" stroke="#5A7A2A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M66 28c8-8 22-8 28-2-8 8-20 8-28 2z" fill={LEAF} />
      <circle cx="44" cy="86" r="16" fill="#B3122E" />
      <path d="M44 70a16 16 0 0 1 0 32z" fill="#7E0B20" opacity=".3" />
      <Shine cx="38" cy="80" rx="3.5" ry="5.5" opacity=".45" />
      <circle cx="78" cy="88" r="15" fill="#C41A37" />
      <path d="M78 73a15 15 0 0 1 0 30z" fill="#7E0B20" opacity=".3" />
      <Shine cx="72" cy="83" rx="3.2" ry="5" opacity=".45" />
    </>
  )
}

function Plums() {
  return (
    <>
      <Shadow rx={36} />
      <path d="M46 46c0-6 2-10 5-12" stroke={BROWN} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M50 36c6-7 16-6 20 0-6 5-15 5-20 0z" fill={LEAF} />
      <ellipse cx="46" cy="68" rx="22" ry="24" fill="#5B2A6E" />
      <path d="M46 46c-6 8-6 34 0 46" stroke="#3D1A4A" strokeWidth="2" fill="none" opacity=".35" />
      <Shine cx="36" cy="60" rx="4" ry="8" opacity=".25" />
      <ellipse cx="78" cy="78" rx="22" ry="23" fill="#6D3483" />
      <path d="M78 55c-6 8-6 32 0 46" stroke="#3D1A4A" strokeWidth="2" fill="none" opacity=".35" />
      <Shine cx="68" cy="70" rx="4" ry="8" opacity=".25" />
    </>
  )
}

function Nectarines() {
  return (
    <>
      <Shadow />
      <circle cx="58" cy="66" r="32" fill="#F6A33B" />
      <circle cx="52" cy="60" r="28" fill="#E04A2A" opacity=".85" />
      <path d="M58 35c-9 12-9 44 0 62" stroke="#A8321A" strokeWidth="2" fill="none" opacity=".35" />
      <Shine cx="44" cy="54" rx="6" ry="10" transform="rotate(-25 44 54)" opacity=".3" />
      <path d="M58 35c0-5 2-9 5-11" stroke={BROWN} strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M62 27c6-8 18-8 23-2-7 7-17 7-23 2z" fill={LEAF} />
    </>
  )
}

function Dates() {
  const dates = [
    [38, 72, -32],
    [55, 66, -10],
    [72, 68, 12],
    [88, 76, 34],
  ]
  return (
    <>
      <Shadow rx={40} />
      {dates.map(([x, y, a]) => (
        <g key={x} transform={`rotate(${a} ${x} ${y})`}>
          <ellipse cx={x} cy={y} rx="9.5" ry="21" fill="#7A3E1B" />
          <path d={`M${x - 3} ${y - 10}q-2 10 1 20`} stroke="#4E230C" strokeWidth="1.2" fill="none" opacity=".5" />
          <ellipse cx={x - 3} cy={y - 7} rx="2.5" ry="7" fill="#fff" opacity=".2" />
          <ellipse cx={x} cy={y - 20} rx="3.5" ry="1.8" fill="#C79A5B" />
        </g>
      ))}
    </>
  )
}

function Pistachios() {
  const nuts = [
    [40, 66, -20],
    [76, 60, 18],
    [52, 88, 10],
    [86, 86, -14],
  ]
  return (
    <>
      <Shadow rx={40} />
      {nuts.map(([x, y, a]) => (
        <g key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(${a})`}>
          <ellipse rx="16" ry="11.5" fill="#E9D6A7" />
          <ellipse cy="-3" rx="9.5" ry="5.5" fill="#93B84E" />
          <ellipse cx="-2" cy="-4" rx="4" ry="2" fill="#B5D26E" />
          <path d="M-13 -2Q0 -10 13 -2" stroke="#C7AD78" strokeWidth="1.5" fill="none" />
          <ellipse cx="-7" cy="4" rx="4" ry="2" fill="#fff" opacity=".35" />
        </g>
      ))}
    </>
  )
}

function Almonds() {
  const nuts = [
    [38, 72, -35],
    [60, 64, 0],
    [82, 72, 35],
  ]
  return (
    <>
      <Shadow rx={38} />
      {nuts.map(([x, y, a]) => (
        <g key={x} transform={`translate(${x} ${y}) rotate(${a})`}>
          <path d="M0-24C13-13 14 10 0 24-14 10-13-13 0-24z" fill="#B07A4A" />
          <path d="M0-24C13-13 14 10 0 24z" fill="#8A5A30" opacity=".3" />
          {[-10, -2, 6, 13].map((ty) => (
            <path key={ty} d={`M-5 ${ty}q2 -2 4 0`} stroke="#7A4C26" strokeWidth="1" fill="none" opacity=".5" />
          ))}
          <ellipse cx="-4" cy="-6" rx="2" ry="8" fill="#fff" opacity=".25" />
        </g>
      ))}
    </>
  )
}

function Walnuts() {
  return (
    <>
      <Shadow rx={38} />
      {[
        [44, 70, 22],
        [80, 64, 18],
      ].map(([x, y, r]) => (
        <g key={x}>
          <circle cx={x} cy={y} r={r} fill="#C29563" />
          <path d={`M${x} ${y - r}v${r * 2}`} stroke="#8F6638" strokeWidth="2" />
          <path
            d={`M${x - r * 0.6} ${y - r * 0.4}q6 4 0 9M${x + r * 0.55} ${y - r * 0.2}q-6 5 0 10M${x - r * 0.5} ${y + r * 0.45}q5-3 9 2`}
            stroke="#9C7244"
            strokeWidth="1.5"
            fill="none"
          />
          <ellipse cx={x - r * 0.45} cy={y - r * 0.5} rx={r * 0.2} ry={r * 0.35} fill="#fff" opacity=".2" />
        </g>
      ))}
      <path d="M58 92c0-10 10-12 14-5 4-7 14-5 14 5 0 8-8 12-14 7-6 5-14 1-14-7z" fill="#D9B07A" />
      <path d="M72 87v12M64 92q3 3 0 6M80 92q-3 3 0 6" stroke="#A97E48" strokeWidth="1.3" fill="none" />
    </>
  )
}

function Rice() {
  const grains = [
    [40, 60, -30], [50, 54, 10], [60, 51, -10], [70, 54, 25], [80, 60, -20],
    [46, 63, 40], [58, 58, 70], [66, 60, -50], [75, 63, 15], [54, 64, -15], [64, 65, 30],
  ]
  return (
    <>
      <Shadow rx={36} />
      <path d="M96 22c-5 12-9 26-10 42" stroke="#C9A43B" strokeWidth="2" fill="none" strokeLinecap="round" />
      {[[94, 28, 30], [91, 36, 30], [89, 44, 25], [98, 33, -30], [95, 41, -30]].map(([x, y, a]) => (
        <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="2" ry="4" fill="#E2BE52" transform={`rotate(${a} ${x} ${y})`} />
      ))}
      <path d="M24 66C28 44 92 44 96 66z" fill="#FBF6E6" />
      {grains.map(([x, y, a]) => (
        <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="1.5" ry="3.4" fill="#E6DCC0" transform={`rotate(${a} ${x} ${y})`} />
      ))}
      <path d="M20 64h80c0 22-18 36-40 36S20 86 20 64z" fill="#1E4D2B" />
      <path d="M23 74h74" stroke="#F5B83D" strokeWidth="3" />
      <path d="M30 70c2 10 10 20 22 24" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity=".18" />
    </>
  )
}

function Mangoes() {
  return (
    <>
      <Shadow />
      <path d="M34 70C30 46 50 28 72 32c18 3 26 20 22 38-4 20-22 32-40 30-12-1-18-14-20-30z" fill="#F7B733" />
      <ellipse cx="76" cy="50" rx="14" ry="12" fill="#F07A2E" opacity=".6" />
      <ellipse cx="80" cy="47" rx="7" ry="6" fill="#E8562A" opacity=".45" />
      <path d="M94 70c-4 20-22 32-40 30-6 0-11-4-14-10 16 6 40 0 54-20z" fill="#D98E1C" opacity=".3" />
      <Shine cx="48" cy="58" rx="5" ry="12" transform="rotate(20 48 58)" opacity=".3" />
      <path d="M72 33c1-5 3-8 7-10" stroke={BROWN} strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M78 24c7-9 21-9 26-2-8 8-19 8-26 2z" fill={LEAF} />
    </>
  )
}

function Vegetables() {
  return (
    <>
      <Shadow rx={40} />
      <path d="M66 38c-2-10 2-18 8-22-1 8 0 15-8 22zM66 38c-8-6-10-14-8-22 5 6 8 13 8 22zM66 38c6-6 14-8 22-6-6 5-13 8-22 6z" fill="#5DA035" />
      <path d="M28 94L58 42c4-6 14-3 12 5z" fill="#F28C28" />
      <path d="M40 76l6 2M47 64l6 2M54 52l5 2" stroke="#C8651A" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M84 104c1-10 1-18 0-26h7c-1 8-1 16 0 26z" fill="#9CCB55" />
      <circle cx="78" cy="70" r="10" fill="#4C8C2B" />
      <circle cx="96" cy="70" r="10" fill="#4C8C2B" />
      <circle cx="87" cy="60" r="11" fill="#5DA035" />
      <circle cx="87" cy="74" r="9" fill="#5DA035" />
      <circle cx="58" cy="90" r="16" fill="#E03B2F" />
      <path d="M58 74a16 16 0 0 1 0 32z" fill="#A82418" opacity=".25" />
      <path d="M58 76l3-4 1 5 5-1-4 4 3 3-5-1-3 4-1-5-5 1 4-4-3-3 5 1z" fill="#4C8C2B" />
      <Shine cx="51" cy="86" rx="3" ry="5" opacity=".4" />
    </>
  )
}

const arts = {
  apples: Apples,
  oranges: Oranges,
  mandarins: Mandarins,
  kiwi: Kiwi,
  'dragon-fruit': DragonFruit,
  pears: Pears,
  cherries: Cherries,
  plums: Plums,
  nectarines: Nectarines,
  dates: Dates,
  pistachios: Pistachios,
  almonds: Almonds,
  walnuts: Walnuts,
  rice: Rice,
  mangoes: Mangoes,
  vegetables: Vegetables,
}

export default function ProduceArt({ type, title, className }) {
  const Art = arts[type]
  if (!Art) return null

  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <Art />
    </svg>
  )
}
