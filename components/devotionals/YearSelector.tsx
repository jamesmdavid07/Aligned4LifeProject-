export function YearSelector({ year }: { year: number }) {
  return (
    <p className="font-nunito text-2xl font-extrabold text-gold-200" aria-label={`Year ${year}`}>
      {year}
    </p>
  );
}
