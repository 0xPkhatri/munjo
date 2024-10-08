"use client";

import { useEffect, useState } from "react";

import {
  getSmartAccountClient,
  publicClient,
  type SafeSmartAccountClient,
} from "../lib/permissionless";

import ScheduledTransferForm from "../components/ScheduledTransferForm";
import ScheduledOrderForm from "@/components/ScheduleOrderForm";

import abi from "../abi/ScheduleOrderModule.json";
// import { scheduledTransfersModuleAddress } from "@/lib/scheduledTransfers";
import { scheduledOrderModuleAddress } from "@/lib/scheduledOrders";
import ScheduledTransfers from "@/components/ScheduledTransfers";
import ProcessedTransfers from "@/components/ProcessedTransfers";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { gql, request } from "graphql-request";
// import Data from '@/components/Data.tsx'

const query = gql`
  {
    executionAddeds(first: 5) {
      id
      smartAccount
      jobId
      blockNumber
    }
    executionStatusUpdateds(first: 5) {
      id
      smartAccount
      jobId
      blockNumber
    }
  }
`;
const url =
  "https://api.studio.thegraph.com/query/89586/treasury-flow-subgraph/version/latest";

export default function Home() {
  const [safe, setSafe] = useState<SafeSmartAccountClient | undefined>();
  const [logs, setLogs] = useState<any[]>([]);

  const handleLoadSafe = async () => {
    const safe = await getSmartAccountClient();
    setSafe(safe);
  };

  useEffect(() => {
    const unwatch = publicClient.watchContractEvent({
      address: scheduledOrderModuleAddress,
      abi,
      // eventName: 'ExecutionAdded', // Optional
      // args: { smartAccount: safe?.account.address }, // Optional
      onLogs: (logs) => {
        setLogs((_logs) => [
          ..._logs,
          ...logs.filter(
            (log) =>
              !_logs.map((l) => l.transactionHash).includes(log.transactionHash)
          ),
        ]);
      },
    });
    return () => unwatch();
    // }, [safe]) // Optional
  }, []);

  return (
    <>
      {safe == null ? (
        <>
          <button onClick={handleLoadSafe} style={{ marginTop: "40px" }}>
            Start
          </button>
        </>
      ) : (
        <>
          <ScheduledTransferForm safe={safe} />

          <ScheduledOrderForm safe={safe} />
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ScheduledTransfers transfers={logs} />
            <ProcessedTransfers transfers={logs} />
          </div>
        </>
      )}
    </>
  );
}
