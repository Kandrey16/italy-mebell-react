import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Input,
  Button,
} from "@material-tailwind/react";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
  MagnifyingGlassIcon,
  PresentationChartBarIcon,
} from "@heroicons/react/24/outline";

import SidebarItem from "../../ClientModules/Sidebar/SidebarItem/SidebarItem";
import { SidebarItems } from "@/data/dataSidebar";
import styles from "./Sidebar.module.scss";
import { NavLink, Route, Routes } from "react-router-dom";
import { useState } from "react";

export default function SidebarNavigation({ onMenuItemClick }) {
  // const [open, setOpen] = useState(0);
  // const [openAlert, setOpenAlert] = useState(true);

  // const handleOpen = (value) => {
  //   setOpen(open === value ? 0 : value);
  // };

  return (
    <>
      <Card className={styles.card}>
        <div className="mb-2 p-4">
          <Typography variant="h5" color="black">
            ItalyMebell
          </Typography>
        </div>
        <List>
          <ListItem onClick={() => onMenuItemClick("products")}>
            <Typography>Товары</Typography>
          </ListItem>
          <ListItem onClick={() => onMenuItemClick("categories")}>
            <Typography>Категории</Typography>
          </ListItem>
          <ListItem onClick={() => onMenuItemClick("groups")}>
            <Typography>Группы атрибутов</Typography>
          </ListItem>
          <ListItem onClick={() => onMenuItemClick("attributes")}>
            <Typography>Атрибуты</Typography>
          </ListItem>
          <ListItem onClick={() => onMenuItemClick("orders")}>
            <Typography>Заказы</Typography>
          </ListItem>
        </List>
      </Card>
    </>
  );
}

{
  /* <Accordion
            open={open === 1}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 1}>
              <AccordionHeader
                onClick={() => handleOpen(1)}
                className="border-b-0 p-3"
              >
                <ListItemPrefix>
                  <PresentationChartBarIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  Dashboard
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Аналитика
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Reporting
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Проекты
                </ListItem>
              </List>
            </AccordionBody>
          </Accordion> */
}
