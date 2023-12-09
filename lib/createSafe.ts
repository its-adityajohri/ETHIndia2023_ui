import { BigNumberish } from "ethers";

import {
  EthersAdapter,
  SafeAccountConfig,
  SafeFactory,
} from "@safe-global/protocol-kit";

import { KycWallet__factory, Verifier__factory } from "../lib/typechain-types";
import * as kycData from "../lib/kycData.json";

async function createSafe(admin: any) {
  let verifier = await new Verifier__factory(admin).deploy();
  await verifier.deployed();

  console.log("verifier", verifier.address);
  let wallet = await new KycWallet__factory(admin).deploy(
    verifier.address,
    kycData.a as [BigNumberish, BigNumberish],
    kycData.b as [[BigNumberish, BigNumberish], [BigNumberish, BigNumberish]],
    kycData.c as [BigNumberish, BigNumberish],
    kycData.Input,
  );
  await wallet.deployed();
  console.log("kyc module",  wallet.address);
console.log(await admin.provider)
  const ethAdapterOwner1 = new EthersAdapter({
    ethers: await admin.provider,
    signerOrProvider: admin,
  });
console.log(ethAdapterOwner1)
console.log(admin.getAddress())
console.log(wallet.address)
  const safeAccountConfig: SafeAccountConfig = {
    owners: [await admin.getAddress(),  wallet.address],
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

  return {safeAddress, kycModule: wallet.address};
}

export default createSafe;