const ganache = require("ganache");

const PORT = 7546;
const NETWORK_ID = 5777;
const path = require("path");

// Persist blockchain data to a local folder
const DB_PATH = path.join(__dirname, "..", ".ganache-db");

const server = ganache.server({
  chain: {
    networkId: NETWORK_ID,
    chainId: NETWORK_ID,
  },
  database: {
    dbPath: DB_PATH,
  },
  wallet: {
    totalAccounts: 10,
    defaultBalance: 100,
    deterministic: true, // Same accounts every time
  },
  logging: {
    quiet: false,
  },
});

server.listen(PORT, "127.0.0.1", (err) => {
  if (err) {
    console.error("❌ Failed to start Ganache:", err);
    process.exit(1);
  }
  console.log(`\n🔗 Ganache running at http://127.0.0.1:${PORT}`);
  console.log(`📡 Network ID: ${NETWORK_ID}`);
  console.log(`💾 Data persisted at: ${DB_PATH}`);
  console.log(`💰 10 accounts with 100 ETH each\n`);

  const provider = server.provider;
  provider.request({ method: "eth_accounts" }).then((accounts) => {
    console.log("Available Accounts:");
    accounts.forEach((acc, i) => console.log(`  (${i}) ${acc}`));
    console.log("\n✅ Ganache is ready!\n");
  });
});

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("\n🛑 Shutting down Ganache (data is saved)...");
  await server.close();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await server.close();
  process.exit(0);
});
