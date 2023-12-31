/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  BigNumberish,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../common";
import type { KycWallet, KycWalletInterface } from "../../contracts/KycWallet";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract Verifier",
        name: "_verifier",
        type: "address",
      },
      {
        internalType: "uint256[2]",
        name: "_pA",
        type: "uint256[2]",
      },
      {
        internalType: "uint256[2][2]",
        name: "_pB",
        type: "uint256[2][2]",
      },
      {
        internalType: "uint256[2]",
        name: "_pC",
        type: "uint256[2]",
      },
      {
        internalType: "uint256[34]",
        name: "_pubSignals",
        type: "uint256[34]",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "operator",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "verifier",
    outputs: [
      {
        internalType: "contract Verifier",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161047738038061047783398101604081905261002f91610205565b604051638525a61d60e01b81526001600160a01b03861690638525a61d906100619087908790879087906004016102ec565b602060405180830381865afa15801561007e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906100a29190610393565b6100e25760405162461bcd60e51b815260206004820152600d60248201526c24b73b30b634b210283937b7b360991b604482015260640160405180910390fd5b5050600180546001600160a01b031981166001600160a01b03909116179055506103bc915050565b634e487b7160e01b600052604160045260246000fd5b604080519081016001600160401b03811182821017156101425761014261010a565b60405290565b600082601f83011261015957600080fd5b610161610120565b80604084018581111561017357600080fd5b845b8181101561018d578051845260209384019301610175565b509095945050505050565b600082601f8301126101a957600080fd5b6040516104408082016001600160401b03811183821017156101cd576101cd61010a565b604052830181858211156101e057600080fd5b845b828110156101fa5780518252602091820191016101e2565b509195945050505050565b6000806000806000610560868803121561021e57600080fd5b85516001600160a01b038116811461023557600080fd5b9450602061024588888301610148565b945087607f88011261025657600080fd5b61025e610120565b8060e089018a81111561027057600080fd5b60608a015b81811015610295576102878c82610148565b845292840192604001610275565b508196506102a38b82610148565b9550505050506102b7876101208801610198565b90509295509295909350565b8060005b60028110156102e65781518452602093840193909101906001016102c7565b50505050565b61054081016102fb82876102c3565b60408083018660005b6002808210610313575061034e565b82518460005b83811015610337578251825260209283019290910190600101610319565b505050928401925060209190910190600101610304565b5050505061035f60c08301856102c3565b61010082018360005b6022811015610387578151835260209283019290910190600101610368565b50505095945050505050565b6000602082840312156103a557600080fd5b815180151581146103b557600080fd5b9392505050565b60ad806103ca6000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c80632b7ac3f3146037578063570ca735146065575b600080fd5b6001546049906001600160a01b031681565b6040516001600160a01b03909116815260200160405180910390f35b6000546049906001600160a01b03168156fea264697066735822122073e8bb5b67d4c741423e9687ffc9d2d70f9168e5fcdbc233c07a7da63cf599ed64736f6c63430008130033";

type KycWalletConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: KycWalletConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class KycWallet__factory extends ContractFactory {
  constructor(...args: KycWalletConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _verifier: AddressLike,
    _pA: [BigNumberish, BigNumberish],
    _pB: [[BigNumberish, BigNumberish], [BigNumberish, BigNumberish]],
    _pC: [BigNumberish, BigNumberish],
    _pubSignals: BigNumberish[],
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      _verifier,
      _pA,
      _pB,
      _pC,
      _pubSignals,
      overrides || {}
    );
  }
  override deploy(
    _verifier: AddressLike,
    _pA: [BigNumberish, BigNumberish],
    _pB: [[BigNumberish, BigNumberish], [BigNumberish, BigNumberish]],
    _pC: [BigNumberish, BigNumberish],
    _pubSignals: BigNumberish[],
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(
      _verifier,
      _pA,
      _pB,
      _pC,
      _pubSignals,
      overrides || {}
    ) as Promise<
      KycWallet & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): KycWallet__factory {
    return super.connect(runner) as KycWallet__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): KycWalletInterface {
    return new Interface(_abi) as KycWalletInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): KycWallet {
    return new Contract(address, _abi, runner) as unknown as KycWallet;
  }
}
