interface Props {
  index: number;
  name: string;
  selectedSection: number;
  setSelectedSection: React.Dispatch<React.SetStateAction<number>>;
}

export function NavItem({ index, name, selectedSection, setSelectedSection }: Props) {
  const isSelected = index === selectedSection;
  return (
    <li
      className={`transition-[color] duration-300 ${isSelected && 'text-yellow-300'}`}
      onClick={() => setSelectedSection(index)}
    >
      {name}
    </li>
  );
}
