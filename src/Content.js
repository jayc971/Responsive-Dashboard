import React, { useState, useEffect, createContext, useContext } from "react";
import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
import { withSize } from "react-sizeme";
import TopBar from "./TopBar";
import Widget from "./Widget";
import { originalItems, initialLayouts, componentList } from "./data/data";

// In Content.js
export const DashboardContext = createContext(); // Make sure this line exists

export function DashboardProvider({ children }) {
  const [items, setItems] = useState(getFromLS("items") || originalItems);
  const [layouts, setLayouts] = useState(getFromLS("layouts") || initialLayouts);

  const onLayoutChange = (_, allLayouts) => {
    setLayouts(allLayouts);
    saveToLS("layouts", allLayouts);
  };

  const onLayoutSave = () => {
    saveToLS("layouts", layouts);
    saveToLS("items", items);
  };

  const onRemoveItem = (itemId) => {
    const newItems = items.filter((i) => i !== itemId);
    const removedLayout = layouts.lg.find((layout) => layout.i === itemId);

    const savedLayouts = getFromLS("removedLayouts") || {};
    savedLayouts[itemId] = removedLayout;
    saveToLS("removedLayouts", savedLayouts);

    const newLayouts = {
      ...layouts,
      lg: layouts.lg.filter((layout) => layout.i !== itemId),
    };

    setItems(newItems);
    setLayouts(newLayouts);
    saveToLS("items", newItems);
    saveToLS("layouts", newLayouts);
  };

  const handleChange = (e) => {
    if (e.target.checked) {
      onAddItem(e.target.name);
    } else {
      onRemoveItem(e.target.name);
    }
  };

  const onAddItem = (itemId) => {
    const newItems = [...items, itemId];
    const maxY = layouts.lg.reduce((max, layout) => Math.max(max, layout.y + layout.h), 0);

    const removedLayouts = getFromLS("removedLayouts") || {};
    const restoredLayout = removedLayouts[itemId];

    const newLayouts = {
      ...layouts,
      lg: [
        ...layouts.lg,
        restoredLayout || { i: itemId, x: 0, y: maxY, w: 2, h: 3 },
      ],
    };

    if (restoredLayout) {
      delete removedLayouts[itemId];
      saveToLS("removedLayouts", removedLayouts);
    }

    setItems(newItems);
    setLayouts(newLayouts);
    saveToLS("items", newItems);
    saveToLS("layouts", newLayouts);
  };

  // const onRemoveItem = (itemId) => {
  //   const newItems = items.filter((i) => i !== itemId);
  //   const newLayouts = {
  //     ...layouts,
  //     lg: layouts.lg.filter((layout) => layout.i !== itemId),
  //   };

  //   setItems(newItems);
  //   setLayouts(newLayouts);
  //   saveToLS("items", newItems);
  //   saveToLS("layouts", newLayouts);
  // };

  // const onAddItem = (itemId) => {
  //   const newItems = [...items, itemId];
  //   const maxY = layouts.lg.reduce((max, layout) => Math.max(max, layout.y + layout.h), 0);

  //   const newLayouts = {
  //     ...layouts,
  //     lg: [...layouts.lg, { i: itemId, x: 0, y: maxY, w: 2, h: 3 }],
  //   };

  //   setItems(newItems);
  //   setLayouts(newLayouts);
  //   saveToLS("items", newItems);
  //   saveToLS("layouts", newLayouts);
  // };

  const contextValue = {
    items,
    layouts,
    onLayoutChange,
    onLayoutSave,
    onRemoveItem,
    onAddItem,
    originalItems,  // Added here
    initialLayouts, // Added here
    componentList
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
}

function Content({ size: { width } }) {
  const { items, layouts, onLayoutChange, onRemoveItem, onAddItem } = useContext(DashboardContext);
  const [componentsList, setComponentsList] = useState(componentList);

  const onEditItem = (key) => {
    setComponentsList((prevComponentsList) => ({
      ...prevComponentsList,
      [key]: {
        ...prevComponentsList[key],
        onEdit: !prevComponentsList[key].onEdit,
      },
    }));
  };
  useEffect(() => {
    saveToLS("componentsList", componentsList);
    console.log(componentsList); 
  }, [componentsList]);

  return (
    <>
      {/* <TopBar
        onLayoutSave={() => {}}
        items={items}
        onRemoveItem={onRemoveItem}
        onAddItem={onAddItem}
        originalItems={originalItems}
      /> */}
      <ResponsiveGridLayout
  className="layout"
  layouts={layouts}
  breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
  cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
  rowHeight={60}
  width={width}
  onLayoutChange={onLayoutChange}
  draggableCancel=".MuiIconButton-root, .todo-list, .image-placeholder-widget, .set-colors-of-chart"
  isDraggable={true}
  isResizable={true}
>
  {items.map((key) => {
    const layout = layouts.lg.find((layout) => layout.i === key) || {
      w: 4,  // minimum width in columns
      h: 3,  // minimum height in rows
      x: 10,
      y: 10,
    };
    return (
      <div
        key={key}
        className="widget"
        data-grid={{
          ...layout,
          minW: 2,  // minimum width (in columns)
          minH: 3,  // minimum height (in rows)
        }}
      >
        {componentsList[key] && (
          <Widget onEditItem={() => { onEditItem(key); }} id={key} component={componentsList[key].component} onRemoveItem={onRemoveItem} backgroundColor="#867ae9" />
        )}
      </div>
    );
  })}
</ResponsiveGridLayout>


    </>
  );
}

export default withSize({ refreshMode: "debounce", refreshRate: 60 })(Content);

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
    } catch (e) {}
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    const existingData = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
    existingData[key] = value;
    global.localStorage.setItem("rgl-8", JSON.stringify(existingData));
  }
}
