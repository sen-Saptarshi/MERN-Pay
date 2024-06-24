export function Balance({ value }) {
  return (
    <div className="flex">
      <div className="font-bold text-lg">Your balance</div>
      <div className="ml-4 font-semibold text-lg">Rs {value}</div>
    </div>
  );
}
