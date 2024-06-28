// components/detect/button-save-food.tsx

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";

interface ButtonSaveProps {
  foodNames: string[];
  classCounts: Record<string, number>;
  totalNutrients: {
    calories: number;
    protein: number;
    fat: number;
    carbohydrates: number;
  };
}

const ButtonSaveFood: React.FC<ButtonSaveProps> = ({
  foodNames,
  classCounts,
  totalNutrients,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const user = useCurrentUser();

  const handleSaveFood = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/savefood", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          foodName: foodNames.join(", "), // Nama makanan
          classCounts: foodNames.reduce(
            (total, name) => total + classCounts[name],
            0
          ), // Total class
          calories: totalNutrients.calories,
          protein: totalNutrients.protein,
          fat: totalNutrients.fat,
          carbohydrates: totalNutrients.carbohydrates,
          userId: user?.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Error saving food");
      }

      const result = await response.json();
      setSuccess("Food saved successfully!");
    } catch (err) {
      setError("Food already exists");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSaveFood}>
      <Button className="w-full mt-5" type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Food"}
      </Button>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </form>
  );
};

export default ButtonSaveFood;
