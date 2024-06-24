"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { addFood, updateFood } from "@/actions/admin/foods";
import { useFormState, useFormStatus } from "react-dom";
import { Food } from "@prisma/client";
import Image from "next/image";

export function FoodForm({ food }: { food?: Food | null }) {
  const [state, formAction] = useFormState(
    food == null ? addFood : updateFood.bind(null, food.id),
    {}
  );
  // const [calories, setCalories] = useState<number | undefined>(food?.calories);
  const { pending } = useFormStatus();

  return (
    <form className="space-y-8" action={formAction}>
      <div className="space-y-2">
        <Label htmlFor="name">Food Name</Label>
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

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
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

      <div className="space-y-2">
        <Label htmlFor="calories">Calories</Label>
        <Input
          type="number"
          id="calories"
          name="calories"
          defaultValue={food?.calories || ""}
          // value={calories}
          // onChange={(e) => setCalories(Number(e.target.value) || undefined)}
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

      <div className="space-y-2">
        <Label htmlFor="protein">Protein</Label>
        <Input
          type="number"
          id="protein"
          name="protein"
          defaultValue={food?.protein || ""}
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

      <div className="space-y-2">
        <Label htmlFor="fat">Fat</Label>
        <Input
          type="number"
          id="fat"
          name="fat"
          defaultValue={food?.fat || ""}
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

      <div className="space-y-2">
        <Label htmlFor="carbohydrates">Carbohydrates</Label>
        <Input
          type="number"
          id="carbohydrates"
          name="carbohydrates"
          defaultValue={food?.carbohydrates || ""}
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
      </div>

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

      <Button disabled={pending}>{pending ? "Saving..." : "Save"}</Button>
    </form>
  );
}
