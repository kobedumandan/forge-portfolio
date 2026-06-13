import '../styles/Divider.css';

export default function Divider() {
  return (
    <div className="divider">
      <div className="divider__line" />
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M10 2 L12 8 L18 10 L12 12 L10 18 L8 12 L2 10 L8 8 Z" fill="#e23b2e" />
      </svg>
      <div className="divider__line" />
    </div>
  );
}
