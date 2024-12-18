import Button from "../../ui/Button";
import CreateFoodForm from "./CreateFoodForm";
import Modal from "../../ui/Modal";

const AddFood = () => {
  return (
    <div>
      <Modal>
        <Modal.Open opens="food-form">
          <Button>Thêm món</Button>
        </Modal.Open>
        <Modal.Window name="food-form">
          <CreateFoodForm />
        </Modal.Window>
      </Modal>
    </div>
  );
};

export default AddFood;
