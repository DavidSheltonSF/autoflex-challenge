interface Props {
  index: number;
  selectedSection: number;
  title: string;
  children: React.ReactNode;
}

export function DynamicSection({ index, selectedSection, title, children }: Props) {
  const isSelected = index === selectedSection;
  return (
    isSelected && (
      <div className="flex flex-col size-full">
        <h1 className="text-3xl font-bold my-[16px]">{title}</h1>
        <div>
          {children}
        </div>
      </div>
    )
  );
}
