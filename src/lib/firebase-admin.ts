import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const app =
  getApps()[0] ??
  initializeApp({
    credential: cert({
      projectId: "vitalcare-5adc5",
      clientEmail: "firebase-adminsdk-fbsvc@vitalcare-5adc5.iam.gserviceaccount.com",
      privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCg/G6sIhCa0Ttw\nZPegyKkQszh3AfhMeFYn6NFIEveorhHHJaoDJ8eu4kMvaMlw/TIZBMya10Oavn9E\ndhukx2jZC4s/xXaev4t6g1lm27LVCJZ/wfPcEzNz18YeOPNi6mDBDiLaHO0bXi1b\nQO4Nue2CNcXckUnpeDvTkutaDdcoKn6vpLgGKmOJts/6mbbAO4rUpWay4XbxHXnm\nJQtBnnB3gpI1UvwDW32H3c5z9BmmcmXBY+vasr8UORP15PjygCItLJs49frE9uB5\nOlCY0UGM+6kW+y57CuPL+d43fsP9Bk7HcJFLHwVWN+Vdsw6E/rhfR/DaN2dEE70x\nMv8Z0HvPAgMBAAECggEAEGRecTOPb5wyH7SANxnHhpZL1ROucJGTlZZnckh6zu0D\n4rx148KyBUovtMzy2gjwsssiJFAap6U8Y0BdeeP+IT+Y1bepvOoHGJn1nqYXPwmT\n/X1Gc0MXQEqZIexYSAWn2sXcNvZZZFSCF3fJ5ZGS2r6BSlTBlb7IOg0MiYu9kUQd\nCx3UodpHoZ7ewp2axC1eAkHQ2CSZRJ8/gE4DULj/bKcNq96hsxkOVsTluHUOgk07\nNh/t1io/m/2x1gktgG83K9ftJY6AYBPOdrQ5kfQ5LJkBttUCeU4dXtdG/0FbU5oX\ncW6PQxjVVCRUeBzsSqg3mbl+/OpR7ePYBh8bhVMpHQKBgQDWpIX8P13wGQYoHeL4\ngCgggs+N+LbMTC6iVfjaMKsiJfIOkVSkSaF19YNMwoCyKSGDectkQlasb7iQbV3u\njtGNoKFTrvoBOpp8E1byiFQnQrGlgvyPb4/Hi5Mr8yAH/7QdBKazV9C+LbZMhsR0\nIRm+cbqhN5cCgTfUSYvN+L6o/QKBgQDAAT14uXiUAEZZ5AbwNO7Kg/gdAF2y2g7j\nptnMB36r7iycqzNRmrAb30l8n0GcY/zHoSxpnhkWbMZqxjHhbTaPD5ZCBzngHARH\nMoAoWzbS6sQFSPfM2Bc+65aszJUCBAF1ZKwVct04R+gFWbHxVF66siGK2fCiit8B\n9qDu7+anuwKBgBY+psQlrQ6dCU5PCp7GaWI1LF2CUS+LFaotTsUOFi5L0HJCDYuZ\nNeqLrzfdUIkmShreHH4fgewNCAuvyfRXSNBsvUt27uIBuNDzECfCiTYoa1DD6njT\nDwuXI4GCiOdLUNdRDBW6HCAZjLMRpHqEk65xCu56XGQeEDMoDB0kkl3hAoGAY50B\nGG4ZKafO1/oew2ai8Lxw8BLticnp6Z/55QmKZYbG7G1BzbeUYJGCnb4+GvYhAi0T\nTqRwXZsHggPbgxnXMXejvBPlqei/K3T+2nEgS2LzWc6WiVcfEEzHulTVhdswKoiV\nYvdZ4EYmEQiM8iiUkQWzs0cIujuUIX+j1PLv1tsCgYApp2eWzOFgijQH1ybuJ8sE\nPIJimu8focR7icoHvje0Z8SfVeATNs1hArEbSTZ8Z2GYODRVCF0n2bUNyHDlBw00\nMwxkvX7Jz6MIX2gfp9dTL8IudrGfAqixOno30rqSqj6eqqxD9/xy7DSLpXxsqUx1\nERbpsaPxDJuprcJO3XzKdQ==\n-----END PRIVATE KEY-----\n",
    }),
  });

export const db = getFirestore(app);