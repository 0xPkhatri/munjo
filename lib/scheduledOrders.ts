import {
  getSwapOrderData,
  getScheduledOrdersExecutor,
  getCreateScheduledOrderAction,
  getExecuteScheduledOrderAction,
} from "@rhinestone/module-sdk";

import { SafeSmartAccountClient } from "./permissionless";
import abi from "../abi/ScheduleOrderModule.json";

export interface ScheduledOrderDataInput {
  startDate: number;
  repeatEvery: number;
  numberOfRepeats: number;
  amount: number;
  buyToken: `0x${string}`;
  sellToken: `0x${string}`;
  recipient: `0x${string}`;
}

export const scheduledOrderModuleAddress =
  "0x5341B4E7B347b7dB9e124b15eBa10A5c236ec3bb";
const sepoliaUSDCTokenAddress = "0x94a9d9ac8a22534e3faca9f4e7f2e2cf85d5e4c8";

export const install7579Module = async (
  safe: SafeSmartAccountClient,
  scheduledOrderInput: ScheduledOrderDataInput
) => {
  const {
    startDate,
    repeatEvery,
    numberOfRepeats,
    amount,
    buyToken,
    sellToken,
    recipient,
  } = scheduledOrderInput;
  const scheduledOrder = {
    startDate,
    repeatEvery,
    numberOfRepeats,
    buyToken: {
      token_address: sepoliaUSDCTokenAddress as `0x${string}`,
      decimals: 6,
    },
    sellToken: {
      token_address: sepoliaUSDCTokenAddress as `0x${string}`,
      decimals: 6,
    },
    amount,
    recipient,
  };

  const executionData = getSwapOrderData({
    scheduledOrder,
  });

  const scheduledOrderModule = getScheduledOrdersExecutor({
    executeInterval: repeatEvery,
    numberOfExecutions: numberOfRepeats,
    startDate,
    executionData,
  });

  const txHash = await safe.installModule({
    type: "executor",
    address: scheduledOrderModuleAddress,
    context: scheduledOrderModule.initData as `0x${string}`,
  });

  console.log(
    "Scheduled transfers module is being installed: https://sepolia.etherscan.io/tx/" +
      txHash
  );

  return txHash;
};

export const scheduleOrder = async (
  safe: SafeSmartAccountClient,
  scheduledTransferInput: ScheduledOrderDataInput
) => {
  const {
    startDate,
    repeatEvery,
    numberOfRepeats,
    amount,
    buyToken,
    sellToken,
    recipient,
  } = scheduledTransferInput;
  const scheduledOrder = {
    startDate,
    repeatEvery,
    numberOfRepeats,
    buyToken: {
      token_address: sepoliaUSDCTokenAddress as `0x${string}`,
      decimals: 6,
    },
    sellToken: {
      token_address: sepoliaUSDCTokenAddress as `0x${string}`,
      decimals: 6,
    },
    amount,
    recipient,
  };

  const scheduledOrderData = getCreateScheduledOrderAction({
    scheduledOrder,
  });
  const txHash = await safe.sendTransaction({
    to: scheduledOrderData.target,
    value: scheduledOrderData.value as bigint,
    data: scheduledOrderData.callData,
  });

  console.log(
    "Transfer is being scheduled: https://sepolia.etherscan.io/tx/" + txHash
  );
  return txHash;
};

export const executeOrder = async (jobId: number) => {
  const executeTransfer = getExecuteScheduledOrderAction({ jobId });
  console.log(executeTransfer);
  return executeTransfer;
};
