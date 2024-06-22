import CreateForm from "@/components/admin/create-form";
import { Navbar } from "@/components/navbar";

const CreateFoodPage = () => {
  return (
    <>
      <Navbar title="Create New Food" />
      <div className="overflow-y-auto mb-16">
        <h1>Add New Foods</h1>
        <CreateForm />
      </div>
    </>
  );
};

export default CreateFoodPage;
