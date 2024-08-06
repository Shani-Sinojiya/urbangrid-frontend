"use client";
import React, { useEffect } from "react";
import { Card as FlowbiteCard, Spinner, Alert } from "flowbite-react";
import { toast } from "react-toastify";
import useSWR from "swr";
import { HiInformationCircle } from "react-icons/hi";

const fetcher = (url: string): Promise<ApiResponse | null> =>
  fetch(url).then((response) => response.json());

interface AccidentData {
  id: string;
  img: string;
  location: string;
}

interface ApiResponse {
  data: AccidentData[] | null;
  message: string;
  success: boolean;
}

const Page = () => {
  const { data, error, isLoading, mutate } = useSWR<ApiResponse | null>(
    "https://api.urbangrid.shanisinojiya.tech/accidents",
    fetcher
  );

  useEffect(() => {
    const websocs = new WebSocket(
      "wss://api.urbangrid.shanisinojiya.tech/ws/accident"
    );

    websocs.onopen = () => {
      console.log("WebSocket connection established");
    };

    websocs.onmessage = (event) => {
      mutate();
      toast.warning("Acceident Detected");
      console.log("WebSocket message received:", event.data);
    };

    websocs.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    websocs.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      websocs.close();
    };
  }, [toast, mutate]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <Spinner
          color="failure"
          aria-label="Extra large spinner example"
          size="xl"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <Alert color="failure" icon={HiInformationCircle}>
          <span className="font-medium">Info alert!</span> {error.message}
        </Alert>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center gap-6 mt-20">
      {data?.data == null && (
        <>
          <Alert color="success" icon={HiInformationCircle}>
            <span className="font-medium">Info alert!</span> No accidents
            detected
          </Alert>
        </>
      )}

      {data?.data?.map((accident) => (
        <Card
          key={accident.id}
          image={accident.img}
          location={accident.location}
        />
      ))}
    </div>
  );
};

export default Page;

export function Card(props: { image: string; location: string }) {
  return (
    <FlowbiteCard
      className="max-w-sm"
      imgAlt="Meaningful alt text for an image that is not purely decorative"
      imgSrc={props.image}
    >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Acciedent at
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {props.location}
      </p>
    </FlowbiteCard>
  );
}
