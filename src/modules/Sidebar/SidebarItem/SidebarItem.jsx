import { useState } from "react";
import styles from "./SidebarItem.module.scss";

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
import { ChevronDownIcon } from "@heroicons/react/24/outline";

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
            <Typography className={styles.typography}>
              {title}
            </Typography>
          </AccordionHeader>
        </ListItem>
        {items && (
          <AccordionBody className="py-1">
            <List className="p-0">
              {items.map((item, index) => (
                <ListItem key={index}>
                  <ListItemPrefix>
                    <Checkbox
                      color="blue"
                      id="vertical-list-react"
                      ripple={false}
                      className="hover:before:opacity-0"
                      containerProps={{
                        className: "p-0",
                      }}
                    />
                  </ListItemPrefix>
                  {item}
                </ListItem>
              ))}
            </List>
          </AccordionBody>
        )}
      </Accordion>
    </>
  );
}
