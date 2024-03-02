// EditProductCard.js
import { useEffect, useCallback, useState } from "react";
import {
  Card,
  Input,
  Button,
  Dialog,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";

export default function TableEditCard({
  editProduct,
  setEditProduct,
  handleUpdate,
  inputList,
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen((cur) => !cur);
  const handleClose = () => {
    setOpen(false);
    setEditProduct(null);
  };

  useEffect(() => {
    if (editProduct) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [editProduct]);

  const handleInputChange = useCallback(
    (inputValue, e) => {
      if (editProduct) {
        setEditProduct({
          ...editProduct,
          [inputValue]: e.target.value,
        });
      }
    },
    [editProduct, setEditProduct]
  );

  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <Card className="p-4   rounded-xl">
          <h2>Изменить продукт</h2>
          <CardBody className="grid grid-cols-1 gap-4 p-4">
            {inputList.map(
              (
                input // вывод полей для редактирования
              ) => (
                <Input
                  type={input.type}
                  color="lightBlue"
                  // size="regular"
                  outline={true}
                  label={input.label}
                  value={editProduct[input.value]}
                  onChange={handleInputChange.bind(null, input.value)}
                />
              )
            )}
          </CardBody>
          <CardFooter className="flex">
            <Button
              className="m-2"
              color="blue"
              buttonType="filled"
              size="regular"
              ripple="light"
              onClick={() => handleUpdate(editProduct.id_product)} // применение редатирования
            >
              Сохранить изменения
            </Button>
            <Button
              className="m-2"
              color="red"
              buttonType="filled"
              size="regular"
              ripple="light"
              onClick={handleClose} // закрытие формы
            >
              Отменить
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}