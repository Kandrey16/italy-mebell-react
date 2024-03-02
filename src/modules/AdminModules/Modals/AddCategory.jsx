import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  Dialog,
  Input,
  Typography,
} from "@material-tailwind/react";

export default function CategoryAddForm({ show, onHide }) {
  return (
    <Dialog
      open={show}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <Card className="p-4 rounded-xl">
        <CardBody>
          <form>
            <div>
              <Typography>Категория</Typography>
              <Input size="lg"/>
            </div>
            <Button
              className="my-2"
              color="blue"
              size="md"
              type="submit"
              onClick={onHide}
            >
              Создать
            </Button>
            <Button
              className="my-2"
              variant="outlined"
              color="red"
              size="md"
              onClick={onHide}
            >
              Отмена
            </Button>
          </form>
        </CardBody>
      </Card>
    </Dialog>
  );
}
