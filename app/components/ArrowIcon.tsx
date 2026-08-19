export default function ArrowIcon({ diagonal = false, direction = "right" }: { diagonal?: boolean; direction?: "right" | "up" }) {
  if (direction === "up") return (
    <svg className="action-arrow action-arrow-up" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M10 16V4M5 9l5-5 5 5" />
    </svg>
  );
  return diagonal ? (
    <svg className="action-arrow action-arrow-diagonal" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M5 15 15 5M8 5h7v7" />
    </svg>
  ) : (
    <svg className="action-arrow" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h12M11 5l5 5-5 5" />
    </svg>
  );
}
