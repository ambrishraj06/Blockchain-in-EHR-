const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const SRC_DIR = path.join(__dirname, "..", "src");
const CONTRACTS_DIR = path.join(SRC_DIR, "build", "contracts");

// Check if contracts are already deployed by reading the artifact files
function areContractsDeployed() {
  const contractFiles = [
    "DoctorRegistration.json",
    "PatientRegistration.json",
    "DiagnosticRegistration.json",
    "UploadEhr.json",
  ];

  for (const file of contractFiles) {
    const filePath = path.join(CONTRACTS_DIR, file);
    if (!fs.existsSync(filePath)) return false;

    try {
      const artifact = JSON.parse(fs.readFileSync(filePath, "utf8"));
      // Check if contract has a deployment on network 5777
      if (!artifact.networks || !artifact.networks["5777"]) return false;
    } catch {
      return false;
    }
  }
  return true;
}

const forceReset = process.argv.includes("--reset");

if (!forceReset && areContractsDeployed()) {
  console.log("\n✅ Contracts already deployed! Skipping migration.");
  console.log("   (Use 'npm run deploy:reset' to force fresh deployment)\n");
  process.exit(0);
}

console.log("\n📦 Deploying smart contracts...\n");

try {
  const resetFlag = forceReset ? "--reset" : "";
  execSync(`truffle migrate ${resetFlag}`, {
    cwd: SRC_DIR,
    stdio: "inherit",
  });
  console.log("\n✅ All contracts deployed successfully!\n");
} catch (error) {
  console.error("\n❌ Contract deployment failed!");
  console.error("Make sure Ganache is running on port 7546.");
  process.exit(1);
}
