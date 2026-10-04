export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 34 42"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <g strokeWidth="1.275" className="stroke-terra-500">
        <path
          className="fill-accent"
          d="M17 26.95a5.95 5.95 0 1 0 0-11.9 5.95 5.95 0 0 0 0 11.9Z"
        />
        <path
          strokeLinecap="round"
          d="M26.35 21h4.25m-6.989 6.611 3.006 3.006M17 30.35v4.25m-6.611-6.989-3.006 3.006M7.65 21H3.4m6.989-6.611-3.006-3.006M17 11.65V7.4m6.611 6.989 3.006-3.006"
        />
      </g>
    </svg>
  )
}
