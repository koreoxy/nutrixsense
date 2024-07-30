"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { addFood, updateFood } from "@/actions/admin/foods";
import { useFormState, useFormStatus } from "react-dom";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState, useEffect } from "react";

const FoodForm = ({ food = any }) => {
  const [state, formAction] = useFormState(
    food == null ? addFood : updateFood.bind(null, food.id),
    {}
  );
  const { pending } = useFormStatus();

  const [selectedPortion, setSelectedPortion] = useState(food?.portion);

  useEffect(() => {
    setSelectedPortion(food?.portion);
  }, [food]);

  return (
    <form className="space-y-6" action={formAction}>
      {/* NAMA MAKANAN */}
      <div className="space-y-2">
        <Label htmlFor="name">Nama Makanan</Label>
        <Input
          type="text"
          id="name"
          name="name"
          defaultValue={food?.name || ""}
        />
        {state?.error?.name && (
          <p className="text-sm text-red-500 mt-2">{state.error.name}</p>
        )}
      </div>

      {/* PORSI */}
      <div className="space-y-2">
        <Label htmlFor="portion">Porsi</Label>
        <Select
          name="portion"
          value={selectedPortion}
          onValueChange={(value) => setSelectedPortion(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Pilih porsi" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Porsi</SelectLabel>
              <SelectItem value="SATU_BESAR">1 Besar</SelectItem>
              <SelectItem value="SATU_SDM">1 sdm</SelectItem>
              <SelectItem value="SERATUS_GRAM">100 gram</SelectItem>
              <SelectItem value="SATU_BUAH">1 buah</SelectItem>
              <SelectItem value="SATU_PORSI">1 porsi</SelectItem>
              <SelectItem value="SATU_MANGKOK">1 mangkok</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* DESKRIPSI */}
      <div className="space-y-2">
        <Label htmlFor="description">Deskripsi</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={food?.description || ""}
        />
        {state?.error?.description && (
          <p className="text-sm text-red-500 mt-2">{state.error.description}</p>
        )}
      </div>

      {/* KALORI DAN ENERGI */}
      <div className="space-y-2">
        <Label htmlFor="calories">Kalori</Label>
        <Input
          type="number"
          id="calories"
          name="calories"
          defaultValue={food?.calories || ""}
        />
        {state?.error?.calories && (
          <p className="text-sm text-red-500 mt-2">{state.error.calories}</p>
        )}
      </div>

      {/* ENERGI */}
      <div className="space-y-2">
        <Label htmlFor="energiKl">Energi kkal</Label>
        <p className="text-xs text-muted-foreground mb-1">*Optional</p>
        <Input
          type="number"
          id="energiKl"
          name="energiKl"
          defaultValue={food?.energiKl || ""}
          pattern="^\d*\.?\d*$"
          title="Please enter a valid float number"
        />
        {state?.error?.energiKl && (
          <p className="text-sm text-red-500 mt-2">{state.error.energiKl}</p>
        )}

        <Label htmlFor="energiKj">Energi Kj</Label>
        <p className="text-xs text-muted-foreground mb-1">*Optional</p>
        <Input
          type="number"
          id="energiKj"
          name="energiKj"
          defaultValue={food?.energiKj || ""}
          pattern="^\d*\.?\d*$"
          title="Please enter a valid float number"
        />
        {state?.error?.energiKj && (
          <p className="text-sm text-red-500 mt-2">{state.error.energiKj}</p>
        )}
      </div>

      {/* PROTEIN */}
      <div className="space-y-2">
        <Label htmlFor="protein">Protein</Label>
        <Input
          type="text"
          id="protein"
          name="protein"
          defaultValue={food?.protein || ""}
          pattern="^\d*\.?\d*$"
          title="Please enter a valid float number"
        />
        {state?.error?.protein && (
          <p className="text-sm text-red-500 mt-2">{state.error.protein}</p>
        )}
      </div>

      {/* LEMAK DAN LEMAK JENUH */}
      <div className="space-y-2">
        <Label htmlFor="fat">Lemak</Label>
        <Input
          type="text"
          id="fat"
          name="fat"
          defaultValue={food?.fat || ""}
          pattern="^\d*\.?\d*$"
          title="Please enter a valid float number"
        />
        {state?.error?.fat && (
          <p className="text-sm text-red-500 mt-2">{state.error.fat}</p>
        )}

        <Label htmlFor="lemakJenuh">Lemak Jenuh</Label>
        <p className="text-xs text-muted-foreground mb-1">*Optional</p>
        <Input
          type="text"
          id="lemakJenuh"
          name="lemakJenuh"
          defaultValue={food?.lemakJenuh || ""}
          pattern="^\d*\.?\d*$"
          title="Please enter a valid float number"
        />
        {state?.error?.lemakJenuh && (
          <p className="text-sm text-red-500 mt-2">{state.error.lemakJenuh}</p>
        )}

        <Label htmlFor="lemakTakJenuhG">Lemak tak Jenuh Ganda</Label>
        <p className="text-xs text-muted-foreground mb-1">*Optional</p>
        <Input
          type="text"
          id="lemakTakJenuhG"
          name="lemakTakJenuhG"
          defaultValue={food?.lemakTakJenuhG || ""}
          pattern="^\d*\.?\d*$"
          title="Please enter a valid float number"
        />
        {state?.error?.lemakTakJenuhG && (
          <p className="text-sm text-red-500 mt-2">
            {state.error.lemakTakJenuhG}
          </p>
        )}

        <Label htmlFor="lemakTakJenuhT">Lemak tak Jenuh Tunggal</Label>
        <p className="text-xs text-muted-foreground mb-1">*Optional</p>
        <Input
          type="text"
          id="lemakTakJenuhT"
          name="lemakTakJenuhT"
          defaultValue={food?.lemakTakJenuhT || ""}
          pattern="^\d*\.?\d*$"
          title="Please enter a valid float number"
        />
        {state?.error?.lemakTakJenuhT && (
          <p className="text-sm text-red-500 mt-2">
            {state.error.lemakTakJenuhT}
          </p>
        )}
      </div>

      {/* KARBOHIDRAT */}
      <div className="space-y-2">
        <Label htmlFor="carbohydrates">Karbohidrat</Label>
        <Input
          type="text"
          id="carbohydrates"
          name="carbohydrates"
          defaultValue={food?.carbohydrates || ""}
          pattern="^\d*\.?\d*$"
          title="Please enter a valid float number"
        />
        {state?.error?.carbohydrates && (
          <p className="text-sm text-red-500 mt-2">
            {state.error.carbohydrates}
          </p>
        )}

        <Label htmlFor="serat">Serat</Label>
        <p className="text-xs text-muted-foreground mb-1">*Optional</p>
        <Input
          type="text"
          id="serat"
          name="serat"
          defaultValue={food?.serat || ""}
          pattern="^\d*\.?\d*$"
          title="Please enter a valid float number"
        />
        {state?.error?.serat && (
          <p className="text-sm text-red-500 mt-2">{state.error.serat}</p>
        )}

        <Label htmlFor="gula">Gula</Label>
        <p className="text-xs text-muted-foreground mb-1">*Optional</p>
        <Input
          type="text"
          id="gula"
          name="gula"
          defaultValue={food?.gula || ""}
          pattern="^\d*\.?\d*$"
          title="Please enter a valid float number"
        />
        {state?.error?.gula && (
          <p className="text-sm text-red-500 mt-2">{state.error.gula}</p>
        )}
      </div>

      {/* BERAT */}
      <div className="space-y-2">
        <Label htmlFor="berat">Berat</Label>
        <p className="text-xs text-muted-foreground mb-1">*Optional</p>
        <Input
          type="text"
          id="berat"
          name="berat"
          defaultValue={food?.berat || ""}
        />
        {state?.error?.berat && (
          <p className="text-sm text-red-500 mt-2">{state.error.berat}</p>
        )}
      </div>

      {/* SODIUM DAN KALIUM */}
      <div className="space-y-2">
        <Label htmlFor="sodium">Sodium</Label>
        <p className="text-xs text-muted-foreground mb-1">*Optional</p>
        <Input
          type="number"
          id="sodium"
          name="sodium"
          defaultValue={food?.sodium || ""}
        />
        {state?.error?.sodium && (
          <p className="text-sm text-red-500 mt-2">{state.error.sodium}</p>
        )}

        <Label htmlFor="kalium">Kalium</Label>
        <p className="text-xs text-muted-foreground mb-1">*Optional</p>
        <Input
          type="number"
          id="kalium"
          name="kalium"
          defaultValue={food?.kalium || ""}
        />
        {state?.error?.kalium && (
          <p className="text-sm text-red-500 mt-2">{state.error.kalium}</p>
        )}
      </div>

      {/* IMAGE */}
      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input type="file" id="image" name="image" required={food == null} />
        {food && (
          <Image
            src={food.imagePath}
            height="200"
            width="200"
            alt="food image"
          />
        )}
        {state?.error?.image && (
          <p className="text-sm text-red-500 mt-2">{state.error.image}</p>
        )}
      </div>

      <Button disabled={pending} className="w-full">
        {pending ? "Saving..." : "Save"}
      </Button>
    </form>
  );
};

export default FoodForm;
