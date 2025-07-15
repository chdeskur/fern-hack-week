type CircularGaugeProps = {
  percentage: number;
  size?: number;
  strokeWidth?: number;
};

export default function CircularGauge({
  percentage,
  size = 100,
  strokeWidth = 10,
}: CircularGaugeProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className="relative inline-flex items-center justify-center"
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <svg width={size} height={size}>
        <defs>
          <radialGradient id="circleGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#37C414" />
            <stop offset="50%" stopColor="#B4FFA180" />
            <stop offset="100%" stopColor="#37C414" />
          </radialGradient>
        </defs>
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          transform={`rotate(90 ${size / 2} ${size / 2})`}
        />
        <circle
          stroke="url(#circleGradient)"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          transform={`rotate(90 ${size / 2} ${size / 2})`}
          className="transition-all duration-500"
        />
      </svg>
      <span className="text-radix-gray-9 absolute text-sm font-semibold">
        {percentage}%
      </span>
    </div>
  );
}
