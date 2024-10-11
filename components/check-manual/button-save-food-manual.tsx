import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";

interface ButtonSaveProps {
  foodNames: string[];
  totalNutrients: {
    calories: number;
    protein: number;
    fat: number;
    carbohydrates: number;
  };
  portion: string[];
  classMakanan: string[];
}

const ButtonSaveFoodManual: React.FC<ButtonSaveProps> = ({
  foodNames,
  totalNutrients,
  classMakanan,
  portion,
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

    const joinedFoodNames = foodNames.join(", ");
    //const joinedPortions = portion.join(", ");

    try {
      const response = await fetch("/api/savefood", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          foodName: joinedFoodNames,
          classMakanan: classMakanan,
          calories: totalNutrients.calories,
          protein: totalNutrients.protein,
          fat: totalNutrients.fat,
          carbohydrates: totalNutrients.carbohydrates,
          portion,
          userId: user?.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Error saving food");
      }

      const result = await response.json();
      console.log(result);
      setSuccess("Data makanan berhasil disimpan!");
    } catch (err) {
      setError("Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSaveFood}>
      <Button
        className="w-full mt-5 text-white"
        type="submit"
        disabled={loading}
      >
        {loading ? "Saving..." : "Simpan Nutrisi Makanan"}
      </Button>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </form>
  );
};

export default ButtonSaveFoodManual;
