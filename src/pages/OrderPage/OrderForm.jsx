import { Card, CardBody, Input, Button, Select, Option } from "@material-tailwind/react";

export default function OrderForm({
  address,
  setAddress,
  entry,
  setEntry,
  floor,
  setFloor,
  code,
  setCode,
  submitOrder,
  paymentMethods,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
}) {
  const handleAddressChange = (e) => setAddress(e.target.value);
  const handleEntryChange = (e) => setEntry(e.target.value);
  const handleFloorChange = (e) => setFloor(e.target.value);
  const handleCodeChange = (e) => setCode(e.target.value);

  return (
    <Card>
      <CardBody>
        <h2 className="text-2xl py-5 font-medium">Ваши данные</h2>
        <form className="flex flex-col gap-4" onSubmit={submitOrder}>
          <h2 className="pt-6 pb-2 text-2xl font-medium">Данные доставки</h2>
          <Input
            size="md"
            label="Адрес доставки"
            value={address}
            onChange={handleAddressChange}
          />
          <Input
            size="md"
            label="Подъезд"
            value={entry}
            onChange={handleEntryChange}
          />
          <Input
            size="md"
            label="Этаж"
            value={floor}
            onChange={handleFloorChange}
          />
          <Input
            size="md"
            label="Код"
            value={code}
            onChange={handleCodeChange}
          />
          <Select
            color="blue"
            label="Способ оплаты"
            value={
              selectedPaymentMethod
                ? selectedPaymentMethod.id_payment_method
                : ""
            }
            onChange={(event) => {
              const method = paymentMethods.find(
                (m) => m.id_payment_method.toString() === event.target.value
              );
              setSelectedPaymentMethod(method);
            }}
          >
            {paymentMethods.map((method) => (
              <Option
                key={method.id_payment_method}
                value={method.id_payment_method}
              >
                {method.name_payment_method}
              </Option>
            ))}
          </Select>
          <Button color="blue" type="submit">
            Оформить заказ
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
