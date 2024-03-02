import { useState } from "react";
import styles from "./SidebarItem.module.scss";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionBody,
  AccordionHeader,
  Typography,
  List,
  Checkbox,
} from "@material-tailwind/react";

export default function SidebarItem({ title, items }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <Accordion
        open={open}
        icon={
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`mx-auto h-4 w-4 transition-transform  ${open ? "rotate-180" : ""}`}
          />
        }
      >
        <ListItem className={styles.listItem} selected={open}>
          <AccordionHeader
            onClick={handleOpen}
            className={styles.accordionHeader}
          >
            <Typography className={styles.typography}>{title}</Typography>
          </AccordionHeader>
        </ListItem>
        {items && (
          <AccordionBody className="py-1">
            <List className="p-0">
              {items.map((item, index) => (
                <ListItem key={index}>{item}</ListItem>
              ))}
            </List>
          </AccordionBody>
        )}
      </Accordion>
    </>
  );
}
