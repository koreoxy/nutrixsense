import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Portion } from "@prisma/client";

type SelectPorsiProps = {
  portion: Portion | null;
  onChange: (portion: Portion) => void;
};

const SelectPorsi: React.FC<SelectPorsiProps> = ({ portion, onChange }) => {
  return (
    <Select
      name="Porsi"
      value={portion ?? ""}
      onValueChange={(value) => onChange(value as Portion)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Pilih porsi" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Porsi</SelectLabel>
          <SelectItem value={Portion.SATU_BESAR}>1 Besar</SelectItem>
          <SelectItem value={Portion.SATU_SDM}>1 sdm</SelectItem>
          <SelectItem value={Portion.SERATUS_GRAM}>100 gram</SelectItem>
          <SelectItem value={Portion.SATU_BUAH}>1 buah</SelectItem>
          <SelectItem value={Portion.SATU_PORSI}>1 porsi</SelectItem>
          <SelectItem value={Portion.SATU_MANGKOK}>1 mangkok</SelectItem>
          <SelectItem value={Portion.SATU_SEDANG}>1 sedang</SelectItem>
          <SelectItem value={Portion.SATU_KECIL}>1 kecil</SelectItem>
          <SelectItem value={Portion.SATU_BUNGKUS}>1 bungkus</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectPorsi;
