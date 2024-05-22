"use client";
import React, { useState } from "react";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

function Partition({
  id,
  layout,
  children,
  backgroundColor,
  onSplit,
  onRemove,
}) {
  return (
    <div
      className={`relative flex ${
        layout === "vertical"
          ? "flex-col"
          : layout === "horizontal"
          ? "flex-row"
          : ""
      } w-full h-full border`}
      style={{ backgroundColor }}
    >
      <div className="absolute top-0 right-0 text-[8px] flex m-2">
        <button
          onClick={() => onSplit(id, "vertical")}
          className="bg-white px-2 rounded-md border"
        >
          V
        </button>
        <button
          onClick={() => onSplit(id, "horizontal")}
          className="bg-white px-2 mx-1 rounded-md border"
        >
          H
        </button>
        <button
          onClick={() => onRemove(id)}
          className="bg-white px-2 rounded-md border"
        >
          -
        </button>
      </div>
      {children && children.length > 0 && (
        <div
          className={`flex ${
            layout === "vertical" ? "flex-col" : "flex-row"
          } w-full h-full`}
        >
          {children.map((child) => (
            <Partition
              key={child.id}
              {...child}
              onSplit={onSplit}
              onRemove={onRemove}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Box() {
  const [partitions, setPartitions] = useState([
    { id: 0, layout: "", children: [], backgroundColor: getRandomColor() },
  ]);

  const updatePartitions = (partitions, id, action) => {
    return partitions
      .map((partition) => {
        if (partition.id === id) {
          if (action.type === "split") {
            return {
              ...partition,
              layout: action.layout,
              children: [
                {
                  id: Date.now() + Math.random(),
                  layout: "",
                  children: [],
                  backgroundColor: getRandomColor(),
                },
                {
                  id: Date.now() + Math.random() + 1,
                  layout: "",
                  children: [],
                  backgroundColor: getRandomColor(),
                },
              ],
            };
          } else if (action.type === "remove") {
            return null;
          }
        } else if (partition.children.length > 0) {
          return {
            ...partition,
            children: updatePartitions(partition.children, id, action),
          };
        }
        return partition;
      })
      .filter(Boolean);
  };

  const handleSplit = (id, layout) => {
    setPartitions((prevPartitions) =>
      updatePartitions(prevPartitions, id, { type: "split", layout })
    );
  };

  const handleRemove = (id) => {
    setPartitions((prevPartitions) =>
      updatePartitions(prevPartitions, id, { type: "remove" })
    );
  };

  const renderPartitions = (partitions) => {
    return partitions.map((partition) => (
      <Partition
        key={partition.id}
        {...partition}
        onSplit={handleSplit}
        onRemove={handleRemove}
      />
    ));
  };

  return (
    <section className="container">
      <div className="flex justify-center md:mx-auto w-[500px] h-[500px] border rounded-md my-10">
        {renderPartitions(partitions)}
      </div>
    </section>
  );
}
