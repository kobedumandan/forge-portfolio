import '../styles/AmbientEmbers.css';

const EMBERS = [
  { left: '8%', drift: '18px', duration: '7s', delay: '0s' },
  { left: '22%', drift: '-22px', duration: '9s', delay: '2s' },
  { left: '38%', drift: '14px', duration: '8s', delay: '4s' },
  { left: '54%', drift: '-16px', duration: '10s', delay: '1s' },
  { left: '68%', drift: '20px', duration: '7.5s', delay: '3s' },
  { left: '82%', drift: '-12px', duration: '9.5s', delay: '5s' },
  { left: '92%', drift: '16px', duration: '8.5s', delay: '1.5s' },
  { left: '15%', drift: '-18px', duration: '11s', delay: '6s' },
  { left: '45%', drift: '22px', duration: '7.8s', delay: '2.5s' },
  { left: '75%', drift: '-14px', duration: '9.2s', delay: '4.5s' },
];

export default function AmbientEmbers() {
  return (
    <div aria-hidden="true" className="embers">
      {EMBERS.map((e, i) => (
        <div
          key={i}
          className="ember"
          style={{
            left: e.left,
            '--drift': e.drift,
            animationDuration: e.duration,
            animationDelay: e.delay,
          }}
        />
      ))}
    </div>
  );
}
