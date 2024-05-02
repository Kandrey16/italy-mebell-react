import React from "react";
import {
  Card,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

const ProductSpecification = ({ specification, attributes }) => {
  return (
    <div>
      {/* <Tabs>
        <TabsHeader>
          <Tab>Характеристики</Tab>
          <Tab>Описание</Tab>
        </TabsHeader>
        <TabsBody>
          <TabPanel>
            <ProductSpecification
              specification={productData.specification}
              attributes={productData.attributes}
            />
          </TabPanel>
          <TabPanel>12345</TabPanel>
        </TabsBody>
      </Tabs> */}
      {/* <p className="text-2xl font-semibold text-black py-3">Характеристики</p> */}
      {specification.map((spec) => {
        const attribute = attributes.find(
          (attr) => attr.id_attribute === spec.id_attribute
        );
        return (
          <div className="grid grid-cols-2" key={spec.id_specification}>
            <p className="text-2xl font-semibold">{attribute.name_attribute}</p>
            <span className="text-xl font-medium">
              {spec.value_specification}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default ProductSpecification;
