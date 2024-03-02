import { Card, Typography, List } from "@material-tailwind/react";
import SidebarItem from "./SidebarItem/SidebarItemWithCheckBox";
import { SidebarItems } from "@/data/dataSidebar";
import styles from "./Sidebar.module.scss";

export default function SidebarFilter() {
  return (
    <>
      <Card className={styles.card}>
        <div className="mb-2 p-4">
          <Typography variant="h5" color="black">
            Фильтры
          </Typography>
        </div>
        <List className={styles.list}>
          {SidebarItems.map((item, index) => {
            return (
              <SidebarItem
                key={index}
                title={item.title}
                items={item.subItems}
              />
            );
          })}
        </List>
      </Card>
    </>
  );
}
