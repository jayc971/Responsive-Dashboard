

import LineChart from "./../LineChart";
import TodoList from "./../TodoList";
import StaticImage from "./../StaticImage";

const originalItems = ["a", "b", "c"];

const initialLayouts = {
  lg: [
    { i: "a", x: 6, y: 1, w: 6, h: 8 },
    { i: "b", x: 0, y: 1, w: 3, h: 8 },
    { i: "c", x: 3, y: 0, w: 3, h: 9 }
  ]
};

const logo = "/logo.png";

const widgetNames = {
  a: 'Line Chart',
  b: 'Todo List',
  c: 'Static Image'
};

const staticImage = "/default.jpg";

const componentList = {
    a: { component: LineChart, onEdit: false },
    b: { component: TodoList, onEdit: false },
    c: { component: StaticImage, onEdit: false }
  };

export { originalItems,initialLayouts, logo, componentList, widgetNames, staticImage };