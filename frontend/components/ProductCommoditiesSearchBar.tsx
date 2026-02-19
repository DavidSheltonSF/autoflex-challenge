import { fetchCommodities } from '@/services/fetchCommodities';
import { Commodity } from '@/types/Commodity';
import { WithId } from '@/types/WithId';
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

interface Props {
  setCommodityId: Dispatch<SetStateAction<string | null>>;
}

export function ProductCommoditiesSearchBar({ setCommodityId }: Props) {
  const [searchText, setSearchText] = useState('');
  const [searchContainerIsOpen, setSearchContainerIsOpen] = useState(false);
  const [commodities, setCommodities] = useState<WithId<Commodity>[]>([]);
  const searchBarRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadCommodities() {
      try {
        const result = await fetchCommodities();
        const filteredResult = result.filter((commodity) => commodity.name.startsWith(searchText));
        setCommodities(filteredResult);
      } catch (error) {
        console.log(error);
      }
    }

    function handleClickOut(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)){
        setSearchContainerIsOpen(false);
      }
    }

    document.addEventListener('click', handleClickOut);

    loadCommodities();

    return () => {
      document.removeEventListener('click', handleClickOut);
    };
  }, [searchText]);

  const renderCommodities = commodities.map((commodity, index) => {
    return (
      <ul
        key={index}
        className="cursor-pointer bg-color-white hover:brightness-90"
        onClick={() => {
          setCommodityId(commodity.id);
          setSearchText(commodity.name);
          searchBarRef.current!.value = commodity.name;
          setSearchContainerIsOpen(false);
        }}
      >
        {commodity.name}
      </ul>
    );
  });
  return (
    <div ref={containerRef} className="relative h-[30px] w-[60%]">
      <input
        ref={searchBarRef}
        onChange={(e) => setSearchText(e.target.value)}
        onFocus={() => setSearchContainerIsOpen(true)}
        className="w-full border rounded-md"
        type="text"
      />
      <div
        className={`absolute bg-color-white top-full right-0 w-full rounded-md overflow-hidden ${
          searchContainerIsOpen ? 'h-auto' : 'h-0'
        }`}
      >
        <ul className="flex flex-col flex flex-col p-[8px] gap-[4px]">{renderCommodities}</ul>
      </div>
    </div>
  );
}
