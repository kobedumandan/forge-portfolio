// Small colored letter-badge used as a tool icon (was `sq()` in the DC template).
function Badge({ color, label }) {
  return (
    <div
      style={{
        width: 28,
        height: 28,
        background: color,
        color: '#0e0c0b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 0.5,
      }}
    >
      {label}
    </div>
  );
}

export const techCategories = [
  {
    idx: '— 01',
    name: 'Frontend',
    count: '04',
    items: [
      { name: 'HTML', icon: <Badge color="#e34f26" label="H" /> },
      { name: 'CSS', icon: <Badge color="#2965f1" label="C" /> },
      { name: 'JS', icon: <Badge color="#f7df1e" label="JS" /> },
      { name: 'React', icon: <Badge color="#61dafb" label="⚛" /> },
    ],
  },
  {
    idx: '— 02',
    name: 'Backend',
    count: '05',
    items: [
      { name: 'Python', icon: <Badge color="#3776ab" label="Py" /> },
      { name: 'Java', icon: <Badge color="#ea2d2e" label="Jv" /> },
      { name: 'PHP', icon: <Badge color="#777bb3" label="P" /> },
      { name: 'FastAPI', icon: <Badge color="#009688" label="Fa" /> },
      { name: 'Django', icon: <Badge color="#0c4b33" label="Dj" /> },
      { name: 'Laravel', icon: <Badge color="#ff2d20" label="La" /> },
    ],
  },
  {
    idx: '— 03',
    name: 'Mobile',
    count: '03',
    items: [
      { name: 'Dart', icon: <Badge color="#0175c2" label="Dt" /> },
      { name: 'Flutter', icon: <Badge color="#02569b" label="Fl" /> },
      { name: 'React Native', icon: <Badge color="#61dafb" label="RN" /> },
    ],
  },
];
