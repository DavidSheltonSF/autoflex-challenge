interface Props {
  label: string,
  value: any
}

export function LabelValue({label, value}: Props){
  return (
    <span className="flex gap-[8px]">
      <p className="font-bold">{label}:</p>
      <p>{value}</p>
    </span>
  );
}