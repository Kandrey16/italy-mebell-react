import {
  Card,
  CardBody,
  Input,
  Button,
  Select,
  Option,
  Radio,
} from "@material-tailwind/react";

export default function OrderForm({
  firstName,
  lastName,
  phoneNumber,
  setFirstName,
  setLastName,
  setPhoneNumber,

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

  orderDeliveries,
  selectedOrderDelivery,
  setSelectedOrderDelivery,
}) {
  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);

  const handleAddressChange = (e) => setAddress(e.target.value);
  const handleEntryChange = (e) => setEntry(e.target.value);
  const handleFloorChange = (e) => setFloor(e.target.value);
  const handleCodeChange = (e) => setCode(e.target.value);

  return (
    <Card>
      <CardBody>
        <form className="flex flex-col gap-4" onSubmit={submitOrder}>
          <h2 className="text-2xl py-5 font-medium">Ваши данные</h2>
          <Input
            size="md"
            label="Имя"
            value={firstName}
            onChange={handleFirstNameChange}
          />
          <Input
            size="md"
            label="Фамилия"
            value={lastName}
            onChange={handleLastNameChange}
          />
          <Input
            size="md"
            label="Номер телефона"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />

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
          <div>
            <span>Способ оплаты</span>
            <div>
              {paymentMethods.map((method) => (
                <Radio
                  key={method.id_payment_method}
                  name="paymentMethod"
                  color="blue"
                  label={method.name_payment_method}
                  value={method.id_payment_method}
                  checked={
                    selectedPaymentMethod
                      ? selectedPaymentMethod.id_payment_method ===
                        method.id_payment_method
                      : false
                  }
                  onChange={() => setSelectedPaymentMethod(method)}
                />
              ))}
            </div>
          </div>
          <div>
            <span>Способ доставки</span>
            <div className="flex flex-col">
              {orderDeliveries.map((delivery) => (
                <Radio
                  key={delivery.id_order_delivery}
                  name="orderDeliveries"
                  color="blue"
                  label={`${delivery.name_order_delivery} ${Number(delivery.price_order_delivery).toFixed(0)}₽`}
                  value={delivery.id_order_delivery}
                  checked={
                    selectedOrderDelivery
                      ? selectedOrderDelivery.id_order_delivery ===
                        delivery.id_order_delivery
                      : false
                  }
                  onChange={() => setSelectedOrderDelivery(delivery)}
                />
              ))}
            </div>
          </div>

          <Button color="blue" type="submit">
            Оформить заказ
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
