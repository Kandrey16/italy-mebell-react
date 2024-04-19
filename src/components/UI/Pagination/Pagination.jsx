import { useContext, useState } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { observer } from "mobx-react";
import { Context } from "@/main";

const Pagination = observer(() => {
  const { product } = useContext(Context);
  const [active, setActive] = useState(1);
  const pageCount = Math.ceil(product.totalCount / product.limit);
  const pages = [];

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }

  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: active === index ? "blue" : "gray",
    onClick: () => {
      product.setPage(index);
      setActive(index);
    },
    className:
      active === index
        ? `bg-colorPrimary text-white`
        : `bg-white text-gray-700`,
  });

  const next = () => {
    if (active === pageCount) return;

    setActive(active + 1);
    product.setPage(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
    product.setPage(active - 1);
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2 text-colorPrimary"
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Назад
      </Button>
      <div className="flex items-center gap-2">
        {pages.map((page) => (
          <IconButton
            key={page}
            active={product.page === page ? "true" : "false"}
            {...getItemProps(page)}
          >
            {page}
          </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2 text-colorPrimary"
        onClick={next}
        disabled={active === 5}
      >
        Далее
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
});

export default Pagination;
