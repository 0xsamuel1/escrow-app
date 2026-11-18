import type { Page } from '@playwright/test';

/** Installs a deterministic Freighter-shaped provider for signed-flow tests. */
export async function installFakeWallet(page: Page, address = 'GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF') {
  await page.addInitScript(({ wallet }) => {
    const provider = {
      isConnected: async () => ({ isConnected: true }),
      requestAccess: async () => ({ address: wallet }),
      getNetworkDetails: async () => ({ network: 'TESTNET', networkPassphrase: 'Test SDF Network ; September 2015' }),
      signTransaction: async () => ({ signedTxXdr: 'fake-signed-xdr' }),
      signMessage: async () => ({ signedMessage: 'ZmFrZS1zaWduYXR1cmU=' }),
    };
    (window as unknown as { freighterApi: typeof provider }).freighterApi = provider;
  }, { wallet: address });
}
