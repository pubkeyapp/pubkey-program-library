import { AnchorProvider, Program } from '@coral-xyz/anchor'
import {
  getPubKeyPointerPda,
  getPubKeyProfilePda,
  getPubkeyProfileProgram,
  PUBKEY_PROFILE_PROGRAM_ID,
  PubKeyIdentityProvider,
  PubKeyPointer,
  PubkeyProfile,
  PubKeyProfile,
} from '@pubkey-program-library/anchor'
import {
  AccountInfo,
  Connection,
  ParsedAccountData,
  PublicKey,
  SystemProgram,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js'

export interface PubKeyProfileSdkOptions {
  readonly connection: Connection
  readonly programId?: PublicKey
  readonly provider: AnchorProvider
}

export interface GetPointerPdaOptions {
  provider: PubKeyIdentityProvider
  providerId: string
}

export interface GetProfilePdaOptions {
  username: string
}

export interface GetProfileByProvider {
  provider: PubKeyIdentityProvider
  providerId: string
}

export interface GetProfileByUsername {
  username: string
}

export interface AddIdentityOptions {
  authority: PublicKey
  feePayer: PublicKey
  username: string
  providerId: string
  provider: PubKeyIdentityProvider
  nickname: string
}

export interface RemoveIdentityOptions {
  authority: PublicKey
  feePayer: PublicKey
  username: string
  providerId: string
  provider: PubKeyIdentityProvider
}

export interface RemoveAuthorityOptions {
  authorityToRemove: PublicKey
  authority: PublicKey
  feePayer: PublicKey
  username: string
}

export interface AddAuthorityOptions {
  newAuthority: PublicKey
  authority: PublicKey
  feePayer: PublicKey
  username: string
}

export interface CreateProfileOptions {
  avatarUrl: string
  authority: PublicKey
  feePayer: PublicKey
  name: string
  username: string
}

export interface UpdateAvatarUrlOptions {
  avatarUrl: string
  authority: PublicKey
  feePayer: PublicKey
  name: string
  username: string
}

export class PubKeyProfileSdk {
  private readonly connection: Connection
  private readonly program: Program<PubkeyProfile>
  private readonly provider: AnchorProvider
  readonly programId: PublicKey

  constructor(options: PubKeyProfileSdkOptions) {
    this.connection = options.connection
    this.provider = options.provider
    this.programId = options.programId || PUBKEY_PROFILE_PROGRAM_ID
    this.program = getPubkeyProfileProgram(this.provider)
  }

  async addProfileAuthority({ newAuthority, authority, feePayer, username }: AddAuthorityOptions) {
    const [profile] = this.getProfilePda({ username })

    const ix = await this.program.methods
      .addProfileAuthority({ newAuthority })
      .accountsStrict({
        authority,
        feePayer,
        profile,
        systemProgram: SystemProgram.programId,
      })
      .instruction()

    return this.createTransaction({ ix, feePayer })
  }

  async addIdentity({ authority, feePayer, username, providerId, provider, nickname }: AddIdentityOptions) {
    const [profile] = this.getProfilePda({ username })
    const [pointer] = this.getPointerPda({ providerId, provider })

    const ix = await this.program.methods
      .addIdentity({
        nickname,
        provider: convertFromIdentityProvider(provider),
        providerId,
      })
      .accountsStrict({
        authority,
        feePayer,
        profile,
        pointer,
        systemProgram: SystemProgram.programId,
      })
      .instruction()

    return this.createTransaction({ ix, feePayer })
  }

  async createProfile({ authority, avatarUrl, feePayer, name, username }: CreateProfileOptions) {
    const [profile] = this.getProfilePda({ username })
    const [pointer] = this.getPointerPda({ provider: PubKeyIdentityProvider.Solana, providerId: authority.toString() })
    const ix = await this.program.methods
      .createProfile({ avatarUrl, name, username })
      .accountsStrict({
        authority,
        feePayer,
        pointer,
        profile,
        systemProgram: SystemProgram.programId,
      })
      .instruction()

    return this.createTransaction({ ix, feePayer })
  }

  async getProfiles(): Promise<PubKeyProfile[]> {
    return this.program.account.profile.all().then((accounts) =>
      accounts.map(({ account, publicKey }) => ({
        publicKey,
        authorities: account.authorities,
        avatarUrl: account.avatarUrl,
        bump: account.bump,
        identities: account.identities.map((identity) => ({
          ...identity,
          provider: convertToIdentityProvider(identity.provider as unknown as { [key: string]: object }),
        })),
        feePayer: account.feePayer,
        name: account.name,
        username: account.username,
      })),
    )
  }

  async getPointers(): Promise<PubKeyPointer[]> {
    return this.program.account.pointer.all().then((accounts) =>
      accounts.map(({ account, publicKey }) => ({
        publicKey,
        provider: convertToIdentityProvider(account.provider as unknown as { [key: string]: object }),
        providerId: account.providerId,
        bump: account.bump,
        profile: account.profile,
      })),
    )
  }

  async getProfileByProvider({ provider, providerId }: GetProfileByProvider): Promise<PubKeyProfile> {
    const [pointerPda] = this.getPointerPda({ provider, providerId })

    const { profile } = await this.getPointer({ pointerPda })

    return this.getProfile({ profilePda: profile })
  }

  async getProfileByProviderNullable({ provider, providerId }: GetProfileByProvider): Promise<PubKeyProfile | null> {
    const [pointerPda] = this.getPointerPda({ provider, providerId })

    const { profile } = await this.getPointer({ pointerPda })

    return this.getProfileNullable({ profilePda: profile })
  }

  async getProfileByUsername({ username }: GetProfileByUsername): Promise<PubKeyProfile> {
    const [profilePda] = this.getProfilePda({ username })

    return this.getProfile({ profilePda })
  }

  async getProfileByUsernameNullable({ username }: GetProfileByUsername): Promise<PubKeyProfile | null> {
    const [profilePda] = this.getProfilePda({ username })

    return this.getProfileNullable({ profilePda })
  }

  async getProfile({ profilePda }: { profilePda: PublicKey }): Promise<PubKeyProfile> {
    return this.program.account.profile.fetch(profilePda).then((res) => {
      const identities = res.identities.map((identity) => ({
        ...identity,
        provider: convertToIdentityProvider(identity.provider as unknown as { [key: string]: never }),
      }))

      return {
        ...res,
        publicKey: profilePda,
        identities,
      }
    })
  }

  async getProfileNullable({ profilePda }: { profilePda: PublicKey }): Promise<PubKeyProfile | null> {
    return this.program.account.profile.fetchNullable(profilePda).then((res) => {
      if (!res) {
        return null
      }
      const identities = res.identities.map((identity) => ({
        ...identity,
        provider: convertToIdentityProvider(identity.provider as unknown as { [key: string]: never }),
      }))

      return {
        ...res,
        publicKey: profilePda,
        identities,
      }
    })
  }

  async getPointer({ pointerPda }: { pointerPda: PublicKey }) {
    return this.program.account.pointer.fetch(pointerPda)
  }

  async getPointerNullable({ pointerPda }: { pointerPda: PublicKey }) {
    return this.program.account.pointer.fetchNullable(pointerPda)
  }

  async getProgramAccount(): Promise<AccountInfo<ParsedAccountData>> {
    return this.connection
      .getParsedAccountInfo(this.programId)
      .then((res) => res.value as AccountInfo<ParsedAccountData>)
  }

  getProfilePda({ username }: GetProfilePdaOptions): [PublicKey, number] {
    return getPubKeyProfilePda({ programId: this.programId, username })
  }

  getPointerPda({ provider, providerId }: GetPointerPdaOptions): [PublicKey, number] {
    return getPubKeyPointerPda({ programId: this.programId, providerId, provider })
  }

  async removeAuthority({ authorityToRemove, authority, feePayer, username }: RemoveAuthorityOptions) {
    const [profile] = this.getProfilePda({ username })

    const ix = await this.program.methods
      .removeAuthority({ authorityToRemove })
      .accountsStrict({ authority, feePayer, profile })
      .instruction()

    return this.createTransaction({ ix, feePayer })
  }

  async removeIdentity({ authority, feePayer, username, providerId, provider }: RemoveIdentityOptions) {
    const [profile] = this.getProfilePda({ username })
    const [pointer] = this.getPointerPda({ providerId, provider })
    const ix = await this.program.methods
      .removeIdentity({ providerId })
      .accountsStrict({
        authority,
        feePayer,
        pointer,
        profile,
        systemProgram: SystemProgram.programId,
      })
      .instruction()

    return this.createTransaction({ ix, feePayer })
  }

  async updateProfileDetails({ avatarUrl, authority, feePayer, name: newName, username }: UpdateAvatarUrlOptions) {
    const [profile] = this.getProfilePda({ username })

    const ix = await this.program.methods
      .updateProfileDetails({ newAvatarUrl: avatarUrl, newName, authority })
      .accounts({ feePayer, profile })
      .instruction()

    return this.createTransaction({ ix, feePayer })
  }

  private async createTransaction({ ix, feePayer: payerKey }: { ix: TransactionInstruction; feePayer: PublicKey }) {
    const { blockhash: recentBlockhash } = await this.connection.getLatestBlockhash()

    return new VersionedTransaction(
      new TransactionMessage({
        instructions: [ix],
        payerKey,
        recentBlockhash,
      }).compileToV0Message(),
    )
  }
}

export const enumMap = {
  [PubKeyIdentityProvider.Discord]: { discord: {} },
  [PubKeyIdentityProvider.Github]: { github: {} },
  [PubKeyIdentityProvider.Google]: { google: {} },
  [PubKeyIdentityProvider.Solana]: { solana: {} },
  [PubKeyIdentityProvider.X]: { x: {} },
} as const

export function convertFromIdentityProvider(provider: PubKeyIdentityProvider) {
  if (!enumMap[provider]) {
    throw new Error(`Unknown provider: ${provider}`)
  }
  return enumMap[provider]
}

export function convertToIdentityProvider(provider: { [key: string]: object }): PubKeyIdentityProvider {
  const key = Object.keys(provider)[0]

  const found: string | undefined = Object.keys(PubKeyIdentityProvider).find(
    (provider) => provider.toLowerCase() === key,
  )

  if (!found) {
    throw new Error(`Unknown provider: ${key}`)
  }

  return PubKeyIdentityProvider[found as keyof typeof PubKeyIdentityProvider]
}
