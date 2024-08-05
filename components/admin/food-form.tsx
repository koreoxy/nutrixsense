"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { addFood, updateFood } from "@/actions/admin/foods";
import { useFormState, useFormStatus } from "react-dom";
import { Food } from "@prisma/client";
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
import { useState } from "react";
import { Portion } from "@prisma/client";

export function FoodForm({ food }: { food?: Food | null }) {
  // @ts-ignore
  const [state, formAction] = useFormState(
    food == null ? addFood : updateFood.bind(null, food.id),
    {}
  );
  const { pending } = useFormStatus();

  const [selectedPortion, setSelectedPortion] = useState<Portion | undefined>(
    food?.portion as Portion | undefined
  );

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
        <div>
          <p
            aria-live="polite"
            aria-atomic="true"
            className="text-sm text-red-500 mt-2"
          >
            {state?.error?.name}
          </p>
        </div>
      </div>

      {/* PORSI */}
      <div className="space-y-2">
        <Label htmlFor="portion">Porsi</Label>
        <Select
          name="portion"
          value={selectedPortion}
          onValueChange={(value) => setSelectedPortion(value as Portion)}
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
        <div>
          <p
            aria-live="polite"
            aria-atomic="true"
            className="text-sm text-red-500 mt-2"
          >
            {state?.error?.description}
          </p>
        </div>
      </div>

      {/* KALORI DAN ENERGI */}
      <div className="space-y-2 ">
        <div className="flex flex-col">
          <Label htmlFor="calories" className="mb-2">
            Kalori
          </Label>
          <Input
            type="number"
            id="calories"
            name="calories"
            defaultValue={food?.calories || ""}
            className="mb-1"
          />
          <div>
            <p
              aria-live="polite"
              aria-atomic="true"
              className="text-sm text-red-500 mt-2"
            >
              {state?.error?.calories}
            </p>
          </div>
        </div>

        <div className="flex flex-row gap-2">
          <div className="flex flex-col">
            <Label htmlFor="carbohydrates" className="mb-2">
              Energi kkal
            </Label>
            <p className="text-xs text-muted-foreground mb-1">*Optional</p>
            <Input
              type="number"
              id="energiKl"
              name="energiKl"
              defaultValue={food?.energiKl || ""}
              pattern="^\d*\.?\d*$"
              title="Please enter a valid float number"
            />
            <div>
              <p
                aria-live="polite"
                aria-atomic="true"
                className="text-sm text-red-500 mt-2"
              >
                {state?.error?.energiKl}
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <Label htmlFor="carbohydrates" className="mb-2">
              Energi Kj
            </Label>
            <p className="text-xs text-muted-foreground mb-1">*Optional</p>
            <Input
              type="number"
              id="energiKj"
              name="energiKj"
              defaultValue={food?.energiKj || ""}
              pattern="^\d*\.?\d*$"
              title="Please enter a valid float number"
            />
            <div>
              <p
                aria-live="polite"
                aria-atomic="true"
                className="text-sm text-red-500 mt-2"
              >
                {state?.error?.energiKj}
              </p>
            </div>
          </div>
        </div>
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
        <div>
          <p
            aria-live="polite"
            aria-atomic="true"
            className="text-sm text-red-500 mt-2"
          >
            {state?.error?.protein}
          </p>
        </div>
      </div>

      {/* LEMAK DAN LEMAK JENUH*/}
      <div className="space-y-2">
        <div className="flex flex-col">
          <Label htmlFor="fat" className="mb-2">
            Lemak
          </Label>
          <Input
            type="text"
            id="fat"
            name="fat"
            defaultValue={food?.fat || ""}
            pattern="^\d*\.?\d*$"
            title="Please enter a valid float number"
          />
          <div>
            <p
              aria-live="polite"
              aria-atomic="true"
              className="text-sm text-red-500 mt-2"
            >
              {state?.error?.fat}
            </p>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-row gap-2 mt-2">
            <div className="flex flex-col">
              <Label htmlFor="lemakJenuh" className="mb-2">
                Lemak Jenuh
              </Label>
              <p className="text-xs text-muted-foreground mb-1">*Optional</p>
              <Input
                type="text"
                id="lemakJenuh"
                name="lemakJenuh"
                defaultValue={food?.lemakJenuh || ""}
                pattern="^\d*\.?\d*$"
                title="Please enter a valid float number"
              />
              <div>
                <p
                  aria-live="polite"
                  aria-atomic="true"
                  className="text-sm text-red-500 mt-2"
                >
                  {state?.error?.lemakJenuh}
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <Label htmlFor="lemakTakJenuhG" className="mb-2">
                Lemak tak Jenuh Ganda
              </Label>
              <p className="text-xs text-muted-foreground mb-1">*Optional</p>
              <Input
                type="text"
                id="lemakTakJenuhG"
                name="lemakTakJenuhG"
                defaultValue={food?.lemakTakJenuhG || ""}
                pattern="^\d*\.?\d*$"
                title="Please enter a valid float number"
              />
              <div>
                <p
                  aria-live="polite"
                  aria-atomic="true"
                  className="text-sm text-red-500 mt-2"
                >
                  {state?.error?.lemakTakJenuhG}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-2">
            <Label htmlFor="lemakTakJenuht" className="mb-2">
              Lemak tak Jenuh Tunggal
            </Label>
            <p className="text-xs text-muted-foreground mb-1">*Optional</p>
            <Input
              type="text"
              id="lemakTakJenuht"
              name="lemakTakJenuht"
              defaultValue={food?.lemakTakJenuhT || ""}
              pattern="^\d*\.?\d*$"
              title="Please enter a valid float number"
            />
            <div>
              <p
                aria-live="polite"
                aria-atomic="true"
                className="text-sm text-red-500 mt-2"
              >
                {state?.error?.lemakTakJenuhT}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* KARBOHIDRAT */}
      <div className="space-y-2">
        <div className="flex flex-col">
          <Label htmlFor="carbohydrates" className="mb-2">
            Karbohidrat
          </Label>
          <Input
            type="text"
            id="carbohydrates"
            name="carbohydrates"
            defaultValue={food?.carbohydrates || ""}
            pattern="^\d*\.?\d*$"
            title="Please enter a valid float number"
          />
          <div>
            <p
              aria-live="polite"
              aria-atomic="true"
              className="text-sm text-red-500 mt-2"
            >
              {state?.error?.carbohydrates}
            </p>
          </div>

          <div className="flex flex-row gap-2">
            <div className="flex flex-col mt-2">
              <Label htmlFor="serat" className="mb-2">
                Serat
              </Label>
              <p className="text-xs text-muted-foreground mb-1">*Optional</p>
              <Input
                type="text"
                id="serat"
                name="serat"
                defaultValue={food?.serat || ""}
                pattern="^\d*\.?\d*$"
                title="Please enter a valid float number"
              />
              <div>
                <p
                  aria-live="polite"
                  aria-atomic="true"
                  className="text-sm text-red-500 mt-2"
                >
                  {state?.error?.serat}
                </p>
              </div>
            </div>

            <div className="flex flex-col mt-2">
              <Label htmlFor="gula" className="mb-2">
                Gula
              </Label>
              <p className="text-xs text-muted-foreground mb-1">*Optional</p>
              <Input
                type="text"
                id="gula"
                name="gula"
                defaultValue={food?.gula || ""}
                pattern="^\d*\.?\d*$"
                title="Please enter a valid float number"
              />
              <div>
                <p
                  aria-live="polite"
                  aria-atomic="true"
                  className="text-sm text-red-500 mt-2"
                >
                  {state?.error?.gula}
                </p>
              </div>
            </div>
          </div>
        </div>
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
        <div>
          <p
            aria-live="polite"
            aria-atomic="true"
            className="text-sm text-red-500 mt-2"
          >
            {state?.error?.berat}
          </p>
        </div>
      </div>

      {/* SODIUM DAN KALIUM */}
      <div className="space-y-2">
        <div className="flex flex-row gap-2">
          <div className="flex flex-col">
            <Label htmlFor="sodium" className="mb-2">
              Sodium
            </Label>
            <p className="text-xs text-muted-foreground mb-1">*Optional</p>
            <Input
              type="number"
              id="sodium"
              name="sodium"
              defaultValue={food?.sodium || ""}
            />
            <div>
              <p
                aria-live="polite"
                aria-atomic="true"
                className="text-sm text-red-500 mt-2"
              >
                {state?.error?.sodium}
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <Label htmlFor="kalium" className="mb-2">
              Kalium
            </Label>
            <p className="text-xs text-muted-foreground mb-1">*Optional</p>
            <Input
              type="number"
              id="kalium"
              name="kalium"
              defaultValue={food?.kalium || ""}
            />
            <div>
              <p
                aria-live="polite"
                aria-atomic="true"
                className="text-sm text-red-500 mt-2"
              >
                {state?.error?.kalium}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* IMAGE */}
      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input type="file" id="image" name="image" required={food == null} />
        {food != null && (
          <Image
            src={food.imagePath}
            height="200"
            width="200"
            alt="food image"
          />
        )}
        <div>
          <p
            aria-live="polite"
            aria-atomic="true"
            className="text-sm text-red-500 mt-2"
          >
            {state?.error?.image}
          </p>
        </div>
      </div>

      <Button disabled={pending} className="w-full">
        {pending ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}
