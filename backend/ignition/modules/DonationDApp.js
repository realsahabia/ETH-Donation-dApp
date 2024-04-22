const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("DonationDApp", (m) => {

  const donation = m.contract("DonationDApp");

  return { donation };
});
