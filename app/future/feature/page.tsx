"use client";

import { Card } from "flowbite-react";
import React from "react";
import data from "./data.json";

const Page = () => {
  return (
    <div className="grid grid-cols-3 gap-4 my-4 mx-6">
      {data.map((d, i) => {
        return (
          <FeatureCard
            key={i}
            img={d.image}
            title={d.title}
            description={d.description}
            feature={d.features}
          />
        );
      })}
    </div>
  );
};

export default Page;

interface props {
  img: string;
  title: string;
  description: string;
  feature: {
    title: string;
    description: string;
  }[];
}

export function FeatureCard(props: props) {
  return (
    <Card className="h-auto" imgAlt={props.title} imgSrc={props.img}>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {props.title}
      </h5>
      {props.description.trim().length > 0 && (
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {props.description}
        </p>
      )}
      {props.feature.length > 0 && (
        <ul className="mt-4 space-y-2">
          {props.feature.map((f, i) => {
            return (
              <li key={i}>
                <h6 className="font-bold text-gray-900 dark:text-white">
                  {f.title}
                </h6>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {f.description}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}
