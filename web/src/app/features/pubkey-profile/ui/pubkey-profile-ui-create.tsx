import { Badge, Button } from '@mantine/core'
import { useWallet } from '@solana/wallet-adapter-react'
import { Keypair } from '@solana/web3.js'
import { useKeypair } from '../../keypair/data-access'
import { usePubkeyProfileProgram } from '../data-access'
import { sampleSundeep } from '../data-access/pubkey-profile.types'

export function PubkeyProfileUiCreate() {
  const { createProfile } = usePubkeyProfileProgram()
  const { keypair } = useKeypair()
  const { publicKey } = useWallet()

  if (!publicKey) {
    return (
      <Badge variant="outline" color="red">
        Connect Wallet
      </Badge>
    )
  }

  if (!keypair.solana) {
    return (
      <Badge variant="outline" color="red">
        Add Keypair
      </Badge>
    )
  }

  return (
    <Button
      loading={createProfile.isPending}
      variant="light"
      onClick={() =>
        createProfile.mutateAsync({
          authority: publicKey,
          feePayer: keypair.solana as Keypair,
          avatarUrl: sampleSundeep.avatarUrl,
          username: sampleSundeep.username,
        })
      }
    >
      Create
    </Button>
  )
}
