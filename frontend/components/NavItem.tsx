interface Props {
  index: number;
  name: string;
  selectedSection: number;
  setSelectedSection: React.Dispatch<React.SetStateAction<number>>;
}

export function NavItem({ index, name, setSelectedSection }: Props) {
  return <li onClick={() => setSelectedSection(index)}>{name}</li>;
}
