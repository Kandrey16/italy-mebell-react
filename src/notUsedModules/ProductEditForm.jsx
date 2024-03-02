// // ProductEditForm.js
// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { editProduct } from "@/redux/actions/productActions";
// // import { editProduct } from "@/API/requests";
// import {
//   Button,
//   Card,
//   CardBody,
//   CardFooter,
//   Dialog,
//   Input,
// } from "@material-tailwind/react";

// ProductEditForm.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editProduct } from "@/redux/actions/productActions";
import {
  Button,
  Card,
  CardBody,
  Dialog,
  Input,
} from "@material-tailwind/react";

const INPUT_LIST = [
  { type: "text", label: "Артикул", value: "article_product" },
  { type: "text", label: "Название", value: "name_product" },
  { type: "text", label: "Описание", value: "description_product" },
  { type: "number", label: "Цена", value: "price_product" },
  { type: "number", label: "Количество", value: "count_product" },
];

const ProductEditForm = ({ product, onCancel, onSave }) => {
  const dispatch = useDispatch();
  const [editedProduct, setEditedProduct] = useState({ ...product });

  useEffect(() => {
    setEditedProduct({ ...product });
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editProduct(editedProduct));
    onSave(editedProduct);
  };

  return (
    <Dialog
      open={true}
      handler={onCancel}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <Card className="p-4 rounded-xl">
        <CardBody>
          <form onSubmit={handleSubmit}>
            {INPUT_LIST.map((input, index) => (
              <div key={index}>
                <label>{input.label}</label>
                <Input
                  type={input.type}
                  name={input.value}
                  value={editedProduct[input.value]}
                  onChange={handleChange}
                />
              </div>
            ))}
            <Button
              className="my-2 mr-2"
              color="blue"
              size="md"
              type="submit"
            >
              Сохранить
            </Button>
            <Button
              className="my-2"
              color="gray"
              size="md"
              onClick={onCancel}
            >
              Отмена
            </Button>
          </form>
        </CardBody>
      </Card>
    </Dialog>
  );
};

export default ProductEditForm;


// export default function ProductEditForm({
//   product,
//   onCancel,
//   onSave,
//   // onInputChange,
// }) {
//   const dispatch = useDispatch();
//   const [editedProduct, setEditedProduct] = useState(product);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedProduct((prevProduct) => ({
//       ...prevProduct,
//       [name]: value,
//     }));
//     // onInputChange(e); // Передаем изменения родительскому компоненту
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(editProduct(product.id, editedProduct));
//     onSave(); // Закрываем диалоговое окно после сохранения
//   };

//   return (
//     <Dialog
//       open={true}
//       //   handler={handleClose}
//       animate={{
//         mount: { scale: 1, y: 0 },
//         unmount: { scale: 0.9, y: -100 },
//       }}
//     >
//       <Card className="p-4 rounded-xl">
//         <CardBody>
//           <form onSubmit={handleSubmit}>
//             <label>Артикул</label>
//             <Input
//               type="text"
//               name="article_product"
//               value={editedProduct.article_product}
//               onChange={handleInputChange}
//             />
//             <label>Название</label>
//             <Input
//               type="text"
//               name="name_product"
//               value={editedProduct.name_product}
//               onChange={handleInputChange}
//             />
//             <label>Описание</label>
//             <Input
//               name="description_product"
//               value={editedProduct.description_product}
//               onChange={handleInputChange}
//             />
//             <label>Цена</label>
//             <Input
//               type="number"
//               name="price_product"
//               value={editedProduct.price_product}
//               onChange={handleInputChange}
//             />
//             <label>Количество</label>
//             <Input
//               type="number"
//               name="count_product"
//               value={editedProduct.count_product}
//               onChange={handleInputChange}
//             />
//           </form>
//         </CardBody>
//         <CardFooter className="flex">
//           <Button
//             className="mx-2"
//             color="blue"
//             buttonType="filled"
//             type="submit"
//             onClick={onSave}
//           >
//             Сохранить
//           </Button>
//           <Button
//             className=""
//             color="red"
//             buttonType="filled"
//             type="submit"
//             onClick={onCancel}
//           >
//             Отмена
//           </Button>
//         </CardFooter>
//       </Card>
//     </Dialog>
//   );
// }

// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { editProduct } from "@/redux/actions/productActions";
// import {
//   Button,
//   Card,
//   CardBody,
//   CardFooter,
//   Dialog,
//   Input,
// } from "@material-tailwind/react";

// export default function ProductEditForm({
//   product,
//   onCancel,
//   onSave,
//   onInputChange,
// }) {
//   const dispatch = useDispatch();
//   const [editedProduct, setEditedProduct] = useState(product);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedProduct((prevProduct) => ({
//       ...prevProduct,
//       [name]: value,
//     }));
//     onInputChange(e); // Передаем изменения родительскому компоненту
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(editProduct(editedProduct));
//     onSave(); // Закрываем диалоговое окно после сохранения
//   };

//   return (
//     <Dialog
//       open={true}
//       //   handler={handleClose}
//       animate={{
//         mount: { scale: 1, y: 0 },
//         unmount: { scale: 0.9, y: -100 },
//       }}
//     >
//       <Card className="p-4 rounded-xl">
//         <CardBody>
//           <form onSubmit={handleSubmit}>
//             <label>Артикул</label>
//             <Input
//               type="text"
//               name="article_product"
//               value={editedProduct.article_product}
//               onChange={handleInputChange}
//             />
//             <label>Название</label>
//             <Input
//               type="text"
//               name="name_product"
//               value={editedProduct.name_product}
//               onChange={handleInputChange}
//             />
//             <label>Описание</label>
//             <Input
//               name="description_product"
//               value={editedProduct.description_product}
//               onChange={handleInputChange}
//             />
//             <label>Цена</label>
//             <Input
//               type="number"
//               name="price_product"
//               value={editedProduct.price_product}
//               onChange={handleInputChange}
//             />
//             <label>Количество</label>
//             <Input
//               type="number"
//               name="count_product"
//               value={editedProduct.count_product}
//               onChange={handleInputChange}
//             />
//           </form>
//         </CardBody>
//         <CardFooter className="flex">
//           <Button
//             className="mx-2"
//             color="blue"
//             buttonType="filled"
//             size="regular"
//             ripple="light"
//             type="submit"
//             onClick={onSave}
//           >
//             Сохранить
//           </Button>
//           <Button
//             className=""
//             color="red"
//             buttonType="filled"
//             size="regular"
//             ripple="light"
//             type="submit"
//             onClick={onCancel}
//           >
//             Отмена
//           </Button>
//         </CardFooter>
//       </Card>
//     </Dialog>
//   );
// }
