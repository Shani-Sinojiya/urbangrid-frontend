"use client";
import { Spinner, Alert } from "flowbite-react";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import { HiInformationCircle } from "react-icons/hi";
import { info } from "console";

interface SignalData {
  id: string;
  count: number;
  status: string | null | undefined;
}

interface ApiResponse {
  data: SignalData[];
  greentimer: number;
  message: string;
  success: boolean;
}
interface ApiResponse_emr {
  data: {
    [key: string]: boolean;
  };
  greentimer: number;
  message: string;
  success: boolean;
}

const fetcher = (url: string): Promise<any | null> =>
  fetch(url).then((response) => response.json());

const Page = () => {
  const { data, error, isLoading, mutate } = useSWR<ApiResponse | null>(
    "https://api.urbangrid.shanisinojiya.tech/signales",
    fetcher
  );

  const { data: emerg, mutate: EmrgMutuate } = useSWR<ApiResponse_emr | null>(
    "https://api.urbangrid.shanisinojiya.tech/emergency-vehicle",
    fetcher
  );

  useEffect(() => {
    const websocs = new WebSocket(
      "wss://api.urbangrid.shanisinojiya.tech/ws/signal"
    );

    websocs.onopen = () => {
      console.log("WebSocket connection established");
    };

    websocs.onmessage = (event) => {
      mutate();
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
  }, [mutate]);

  useEffect(() => {
    const websocs = new WebSocket(
      "wss://api.urbangrid.shanisinojiya.tech/ws/accident"
    );

    websocs.onopen = () => {
      console.log("WebSocket connection established");
    };

    websocs.onmessage = (event) => {
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
  }, [toast]);

  useEffect(() => {
    const websocs = new WebSocket(
      "wss://api.urbangrid.shanisinojiya.tech/ws/emergency"
    );

    websocs.onopen = () => {
      console.log("WebSocket connection established");
    };

    websocs.onmessage = (event) => {
      EmrgMutuate();
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
  }, [EmrgMutuate]);

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
    <div className="flex justify-center text-center gap-4 mt-20">
      {data?.data.map((s) => (
        <Signals
          key={s.id}
          id={s.id}
          count={s.count}
          status={s.status ?? ""}
          emergency={emerg?.data[s.id] ?? false}
        />
      ))}
    </div>
  );
};

export default Page;

interface SignalsProps {
  id: string;
  count: number;
  status: string;
  emergency: boolean;
}

const Signals: React.FC<SignalsProps> = ({ id, count, status, emergency }) => {
  if (id == undefined || id.trim().length == 0) return <></>;

  return (
    <div className="signals">
      <h2 className="aru">{id}</h2>
      <div className="traffic-light">
        <div className={`light ${status === "off" ? "red" : ""}`}></div>
        <div className={`light ${status === "yellow" ? "yellow" : ""}`}></div>
        <div className={`light ${status !== "off" ? "green" : ""}`}></div>
        <div className={`light ${emergency ? "emergency" : ""}`}></div>
      </div>
      <div className="signal-info">
        <div className="vehicle-count">
          <h2>Vehicle Count</h2>
          <p>Total Vehicles: {count}</p>
        </div>
      </div>
    </div>
  );
};
