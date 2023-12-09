import { BigNumberish } from "ethers";

import {
  EthersAdapter,
  SafeAccountConfig,
  SafeFactory,
} from "@safe-global/protocol-kit";

import { KycWallet__factory, Verifier__factory } from "../lib/typechain-types";
// import * as kycData from "../lib/kycData.json";

async function createSafe(admin: any, a: any, b: any, c: any, input: any)  {
  let verifier = await new Verifier__factory(admin).deploy();
  await verifier.waitForDeployment();

  console.log("verifier", await verifier.getAddress());
  let wallet = await new KycWallet__factory(admin).deploy(
    await verifier.getAddress(),
    a as [BigNumberish, BigNumberish],
    b as [[BigNumberish, BigNumberish], [BigNumberish, BigNumberish]],
    c as [BigNumberish, BigNumberish],
    input,
  );
  await wallet.waitForDeployment();
  console.log("kyc module",  await wallet.getAddress());
console.log( admin.provider)
  const ethAdapterOwner1 = new EthersAdapter({
    ethers: admin.provider,
    signerOrProvider: admin,
  });
console.log(ethAdapterOwner1)
console.log(admin.getAddress())
console.log(await wallet.getAddress())
  const safeAccountConfig: SafeAccountConfig = {
    owners: [await admin.getAddress(),  await wallet.getAddress()],
    threshold: 1,
  };
console.log(safeAccountConfig)
  const safeFactory = await SafeFactory.create({
    ethAdapter: ethAdapterOwner1,
  });
console.log(safeFactory)
  const safeSdkOwner1 = await safeFactory.deploySafe({ safeAccountConfig });

console.log(safeSdkOwner1)
  const safeAddress = await safeSdkOwner1.getAddress();
console.log(safeAddress)
  console.log("Your Safe has been deployed:");
  console.log(`${safeAddress}`);

  return {safeAddress, kycModule: await wallet.getAddress()};
}

export default createSafe;