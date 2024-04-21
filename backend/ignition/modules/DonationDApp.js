const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("DonationDAppModule", (m) => {

  const donation = m.contract("DonationDApp");

  return { donation };
});
