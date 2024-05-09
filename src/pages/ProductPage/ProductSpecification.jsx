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
      {attributes && specification.map((spec) => {
        const attribute = attributes.find(
          (attr) => attr.id_attribute === spec.id_attribute
        );
        return (
          <div className="grid grid-cols-2" key={spec.id_specification}>
            <p className="text-xl font-semibold text-black">
              {attribute.name_attribute}
            </p>
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
