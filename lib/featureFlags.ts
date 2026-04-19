import { Connection, PublicKey } from "@solana/web3.js"
import { AnchorProvider, Program } from "@coral-xyz/anchor"
import idl from "../idl/deplite.json"
import { Deplite } from "../idl/deplite"

const PROGRAM_ID = new PublicKey("C8s478Z3a9BFHEbv5TvZ4iSzw98brqJppAcsYYdrzzDu")
const ADMIN = new PublicKey("GpaWtkxq65cWp3uB7xxFdS4pDVp52jNumJ58RnDiSvpQ")

const connection = new Connection("https://devnet.helius-rpc.com/?api-key=521ac8a4-be7b-4f47-b49c-9cdfa9cb770f")

export async function getFlag(flagName: string): Promise<boolean> {
  const provider = new AnchorProvider(connection, null as any, {})
  const program = new Program<Deplite>(idl, provider) 

  const [pda] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("feature_flag"),
      ADMIN.toBuffer(),
      Buffer.from(flagName),
    ],
    PROGRAM_ID
  )

  try {
    const account = await program.account.flagAccount.fetch(pda)
    return account.enabled
  } catch {
    return false
  }
}