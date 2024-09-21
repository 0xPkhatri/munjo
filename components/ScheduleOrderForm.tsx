import { useState, useEffect } from "react";
import { SafeSmartAccountClient } from "@/lib/permissionless";
import {
  install7579Module,
  scheduleOrder,
  scheduledOrderModuleAddress,
} from "@/lib/scheduledOrders";

const ScheduledOrderForm: React.FC<{ safe: SafeSmartAccountClient }> = ({
  safe,
}) => {
  //   const [recipient, setRecipient] = useState("");
  const [buytokenAddress, setBuyTokenAddress] = useState("");
  const [selltokenAddress, setSelltokenAddress] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState(0);
  const [executionInterval, setExecutionInterval] = useState(0);
  const [numberOfExecution, setNumberOfExecution] = useState(0);
  const [date, setDate] = useState("");
  const [txHash, setTxHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [is7579Installed, setIs7579Installed] = useState(false);

  useEffect(() => {
    const init7579Module = async () => {
      const isModuleInstalled = await safe
        .isModuleInstalled({
          type: "executor",
          address: scheduledOrderModuleAddress,
          context: "0x",
        })
        .catch(() => false);
      if (isModuleInstalled) {
        setIs7579Installed(true);
      }
    };
    void init7579Module();
  }, [safe]);

  return (
    <>
      <div style={{ marginTop: "40px" }}>Your Safe: {safe.account.address}</div>
      <div style={{ marginTop: "10px" }}>
        ERC-7579 module installed:
        {is7579Installed
          ? "Yes ✅"
          : "No, schedule a transfer below to install it!"}
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        {/* Row 1 */}
        <div style={{ flexBasis: "50%" }}>
          <label htmlFor="buytokenAddress">buy Token:</label>
          <input
            style={{ marginLeft: "20px" }}
            id="buytokenAddress"
            placeholder="0x..."
            onChange={(e) => setBuyTokenAddress(e.target.value)}
            value={buytokenAddress}
          />
        </div>

        <div style={{ flexBasis: "50%" }}>
          <label htmlFor="selltokenAddress">sell token:</label>
          <input
            style={{ marginLeft: "20px" }}
            id="selltokenAddress"
            placeholder="0x..."
            onChange={(e) => setSelltokenAddress(e.target.value)}
            value={selltokenAddress}
          />
        </div>
        <div style={{ flexBasis: "50%" }}>
          <label htmlFor="recipientAddress">Recipient Address:</label>
          <input
            style={{ marginLeft: "20px" }}
            id="recipientAddress"
            placeholder="0x..."
            onChange={(e) => setRecipientAddress(e.target.value)}
            value={recipientAddress}
          />
        </div>

        {/* Row 2 */}
        <div style={{ flexBasis: "50%" }}>
          <label htmlFor="amount">Amount:</label>
          <input
            style={{ marginLeft: "20px" }}
            id="amount"
            type="number"
            placeholder="0.0"
            min="0"
            onChange={(e) => setAmount(Number(e.target.value))}
            value={amount}
          />
        </div>
        <div style={{ flexBasis: "50%" }}>
          <label htmlFor="executionInterval">Interval (days):</label>
          <input
            style={{ marginLeft: "20px" }}
            id="executionInterval"
            type="number"
            placeholder="1"
            min="0"
            onChange={(e) => setExecutionInterval(Number(e.target.value))}
            value={executionInterval}
          />
        </div>

        {/* Row 3 */}
        <div style={{ flexBasis: "50%" }}>
          <label htmlFor="numberOfExecution">Number of Executions:</label>
          <input
            style={{ marginLeft: "20px" }}
            id="numberOfExecution"
            type="number"
            placeholder="1"
            min="0"
            onChange={(e) => setNumberOfExecution(Number(e.target.value))}
            value={numberOfExecution}
          />
        </div>
        <div style={{ flexBasis: "50%" }}>
          <label htmlFor="date">Date/Time:</label>
          <input
            style={{ marginLeft: "20px" }}
            id="date"
            type="datetime-local"
            onChange={(e) => setDate(e.target.value)}
            value={date}
          />
        </div>
      </div>
      <button
        disabled={!amount || !date || loading}
        onClick={async () => {
          setLoading(true);
          setError(false);
          const startDate = new Date(date).getTime() / 1000;
          const orderInputData = {
            startDate,
            repeatEvery: executionInterval * 60 * 60 * 24, // Assuming interval is in days
            numberOfRepeats: numberOfExecution,
            amount,
            recipient: `0x${recipientAddress}`, // Corrected string literal
          };

          await (!is7579Installed ? install7579Module : scheduleOrder)(
            safe,
            orderInputData
          )
            .then((txHash: string) => {
              setTxHash(txHash);
              setLoading(false);
              setBuyTokenAddress("");
              setRecipientAddress("");
              setAmount(0);
              setExecutionInterval(0); // Reset on successful submission
              setNumberOfExecution(0); // Reset on successful submission
              setDate("");
              setIs7579Installed(true);
            })
            .catch((err) => {
              console.error(err);
              setLoading(false);
              setError(true);
            });
        }}
      >
        Schedule Order
      </button>
      <div>
        {loading ? <p>Processing, please wait...</p> : null}
        {error ? (
          <p>
            There was an error processing the transaction. Please try again.
          </p>
        ) : null}
        {txHash ? (
          <>
            <p>Success!</p>
            <a
              href={`https://sepolia.etherscan.io/tx/${txHash}`}
              target="_blank"
              rel="noreferrer"
              style={{
                textDecoration: "underline",
                fontSize: "14px",
              }}
            >
              View on Etherscan
            </a>
          </>
        ) : null}
      </div>
    </>
  );
};

export default ScheduledOrderForm;
