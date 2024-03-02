import { Input } from "@material-tailwind/react";
import { useState } from "react";

export default function EditProduct({ product, handleUpdate, handleCancel }) {
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleChange = (e) => {
    setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(updatedProduct);
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.entries(product).map(([key, value]) => (
        <div key={key}>
          <label>{key}</label>
          <Input
            name={key}
            value={updatedProduct[key]}
            onChange={handleChange}
          />
        </div>
      ))}
      <button type="submit">Сохранить</button>
      <button type="button" onClick={handleCancel}>
        Отмена
      </button>
    </form>
  );
}
