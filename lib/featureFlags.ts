import { Connection, PublicKey } from "@solana/web3.js"
import { AnchorProvider, Program } from "@coral-xyz/anchor"
import idl from "../idl/deplite.json"

const PROGRAM_ID = new PublicKey("C8s478Z3a9BFHEbv5TvZ4iSzw98brqJppAcsYYdrzzDu")
const ADMIN = new PublicKey("GpaWtkxq65cWp3uB7xxFdS4pDVp52jNumJ58RnDiSvpQ")

const connection = new Connection("https://api.devnet.solana.com")

export async function getFlag(flagName: string) {
  const provider = new AnchorProvider(connection, {} as any, {})
  const program = new Program(idl as any , provider) as any 

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