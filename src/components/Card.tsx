type CardProps = {
  title: string;
  value: number;
  color: "red" | "orange" | "green" | "purple";
};

//mapeando as props de cor para as classes de tailwind
const colorClasses = {
  red: "bg-red-color",
  orange: "bg-orange-color",
  green: "bg-green-color",
  purple: "bg-purple-color",
};

export default function Card({ title, value, color }: CardProps) {
  return (
    <div
      className={`p-6 ${colorClasses[color]} text-white rounded-lg shadow-md flex items-center justify-between`}
    >
      <div>
        <h2 className="text-4xl font-bold">{value}</h2>
        <p className="text-sm font-medium uppercase tracking-wider">{title}</p>
      </div>
    </div>
  );
}
