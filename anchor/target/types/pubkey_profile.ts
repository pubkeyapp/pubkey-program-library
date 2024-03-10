export type PubkeyProfile = {
  "version": "0.1.0",
  "name": "pubkey_profile",
  "instructions": [
    {
      "name": "createProfile",
      "accounts": [
        {
          "name": "profile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "feePayer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "CreateProfileArgs"
          }
        }
      ]
    },
    {
      "name": "updateAvatarUrl",
      "accounts": [
        {
          "name": "profile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feePayer",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "UpdateAvatarUrlArgs"
          }
        }
      ]
    },
    {
      "name": "addAuthority",
      "accounts": [
        {
          "name": "profile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "feePayer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "AddAuthorityArgs"
          }
        }
      ]
    },
    {
      "name": "removeAuthority",
      "accounts": [
        {
          "name": "profile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "feePayer",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "RemoveAuthorityArgs"
          }
        }
      ]
    },
    {
      "name": "addIdentity",
      "accounts": [
        {
          "name": "profile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pointer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "feePayer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "AddIdentityArgs"
          }
        }
      ]
    },
    {
      "name": "removeIdentity",
      "accounts": [
        {
          "name": "profile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pointer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "feePayer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "RemoveIdentityArgs"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "pointer",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "providerName",
            "type": "string"
          },
          {
            "name": "providerId",
            "type": "string"
          },
          {
            "name": "profile",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "profile",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "username",
            "type": "string"
          },
          {
            "name": "avatarUrl",
            "type": "string"
          },
          {
            "name": "feePayer",
            "type": "publicKey"
          },
          {
            "name": "authorities",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "identities",
            "type": {
              "vec": {
                "defined": "Identity"
              }
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "AddIdentityArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "providerName",
            "type": "string"
          },
          {
            "name": "providerId",
            "type": "string"
          },
          {
            "name": "nickname",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "RemoveIdentityArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "providerId",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "AddAuthorityArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "newAuthority",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "CreateProfileArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "username",
            "type": "string"
          },
          {
            "name": "avatarUrl",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "RemoveAuthorityArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "UpdateAvatarUrlArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "newAvatarUrl",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "Identity",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "provider",
            "type": "string"
          },
          {
            "name": "providerId",
            "type": "string"
          },
          {
            "name": "name",
            "type": "string"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "UnAuthorized",
      "msg": "Account unauthorized to perform this action"
    },
    {
      "code": 6001,
      "name": "InvalidFeePayer",
      "msg": "Invalid Fee payer"
    },
    {
      "code": 6002,
      "name": "InvalidUsername",
      "msg": "Invalid Username"
    },
    {
      "code": 6003,
      "name": "InvalidAvatarURL",
      "msg": "Invalid Avatar Url"
    },
    {
      "code": 6004,
      "name": "InvalidProvider",
      "msg": "Invalid Provider"
    },
    {
      "code": 6005,
      "name": "InvalidProviderID",
      "msg": "Invalid Provider ID"
    },
    {
      "code": 6006,
      "name": "InvalidName",
      "msg": "Invalid Name"
    },
    {
      "code": 6007,
      "name": "InvalidAccountOwner",
      "msg": "Account not owned by program"
    },
    {
      "code": 6008,
      "name": "AuthorityAlreadyExists",
      "msg": "Authority already exists"
    },
    {
      "code": 6009,
      "name": "AuthorityNonExistant",
      "msg": "Authority does not exist"
    },
    {
      "code": 6010,
      "name": "CannotRemoveSoloAuthority",
      "msg": "Cannot remove last remaining authority"
    },
    {
      "code": 6011,
      "name": "MaxSizeReached",
      "msg": "Array reached max size"
    },
    {
      "code": 6012,
      "name": "IdentityAlreadyExists",
      "msg": "Identity already exists"
    },
    {
      "code": 6013,
      "name": "IdentityNonExistant",
      "msg": "Identity does not exist"
    }
  ]
};

export const IDL: PubkeyProfile = {
  "version": "0.1.0",
  "name": "pubkey_profile",
  "instructions": [
    {
      "name": "createProfile",
      "accounts": [
        {
          "name": "profile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "feePayer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "CreateProfileArgs"
          }
        }
      ]
    },
    {
      "name": "updateAvatarUrl",
      "accounts": [
        {
          "name": "profile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feePayer",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "UpdateAvatarUrlArgs"
          }
        }
      ]
    },
    {
      "name": "addAuthority",
      "accounts": [
        {
          "name": "profile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "feePayer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "AddAuthorityArgs"
          }
        }
      ]
    },
    {
      "name": "removeAuthority",
      "accounts": [
        {
          "name": "profile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "feePayer",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "RemoveAuthorityArgs"
          }
        }
      ]
    },
    {
      "name": "addIdentity",
      "accounts": [
        {
          "name": "profile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pointer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "feePayer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "AddIdentityArgs"
          }
        }
      ]
    },
    {
      "name": "removeIdentity",
      "accounts": [
        {
          "name": "profile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pointer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "feePayer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "RemoveIdentityArgs"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "pointer",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "providerName",
            "type": "string"
          },
          {
            "name": "providerId",
            "type": "string"
          },
          {
            "name": "profile",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "profile",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "username",
            "type": "string"
          },
          {
            "name": "avatarUrl",
            "type": "string"
          },
          {
            "name": "feePayer",
            "type": "publicKey"
          },
          {
            "name": "authorities",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "identities",
            "type": {
              "vec": {
                "defined": "Identity"
              }
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "AddIdentityArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "providerName",
            "type": "string"
          },
          {
            "name": "providerId",
            "type": "string"
          },
          {
            "name": "nickname",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "RemoveIdentityArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "providerId",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "AddAuthorityArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "newAuthority",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "CreateProfileArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "username",
            "type": "string"
          },
          {
            "name": "avatarUrl",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "RemoveAuthorityArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "UpdateAvatarUrlArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "newAvatarUrl",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "Identity",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "provider",
            "type": "string"
          },
          {
            "name": "providerId",
            "type": "string"
          },
          {
            "name": "name",
            "type": "string"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "UnAuthorized",
      "msg": "Account unauthorized to perform this action"
    },
    {
      "code": 6001,
      "name": "InvalidFeePayer",
      "msg": "Invalid Fee payer"
    },
    {
      "code": 6002,
      "name": "InvalidUsername",
      "msg": "Invalid Username"
    },
    {
      "code": 6003,
      "name": "InvalidAvatarURL",
      "msg": "Invalid Avatar Url"
    },
    {
      "code": 6004,
      "name": "InvalidProvider",
      "msg": "Invalid Provider"
    },
    {
      "code": 6005,
      "name": "InvalidProviderID",
      "msg": "Invalid Provider ID"
    },
    {
      "code": 6006,
      "name": "InvalidName",
      "msg": "Invalid Name"
    },
    {
      "code": 6007,
      "name": "InvalidAccountOwner",
      "msg": "Account not owned by program"
    },
    {
      "code": 6008,
      "name": "AuthorityAlreadyExists",
      "msg": "Authority already exists"
    },
    {
      "code": 6009,
      "name": "AuthorityNonExistant",
      "msg": "Authority does not exist"
    },
    {
      "code": 6010,
      "name": "CannotRemoveSoloAuthority",
      "msg": "Cannot remove last remaining authority"
    },
    {
      "code": 6011,
      "name": "MaxSizeReached",
      "msg": "Array reached max size"
    },
    {
      "code": 6012,
      "name": "IdentityAlreadyExists",
      "msg": "Identity already exists"
    },
    {
      "code": 6013,
      "name": "IdentityNonExistant",
      "msg": "Identity does not exist"
    }
  ]
};
