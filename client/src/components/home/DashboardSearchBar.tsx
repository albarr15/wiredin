import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxSearchInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

export function DashboardSearchBar() {
  const locations = [
    "Manila",
    "Pasig City",
    "Quezon City",
    "Cainta",
    "Pasay City",
  ];

  return (
    <Combobox items={locations}>
      <ComboboxSearchInput
        showTrigger={false}
        placeholder="Manila..."
        className="w-full h-12 pr-4 pl-1"
      />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
