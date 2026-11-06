import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ValidateKeyVault action
 */
export interface msdyn_ValidateKeyVaultResponse {
  Result: string;
}

/**
 * msdyn_ValidateKeyVault action
 *
 * Unbound action
 */
export class msdyn_ValidateKeyVaultAction implements Executable<msdyn_ValidateKeyVaultResponse> {
  constructor(
    public readonly keyVaultUri?: string,
    public readonly platformType?: string,
    public readonly isAppSigningEnabled?: boolean,
    public readonly bundleIdentifier?: string,
    public readonly storageTypeForUpload?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ValidateKeyVault`;

    const body: Record<string, unknown> = {
      KeyVaultUri: this.keyVaultUri,
      PlatformType: this.platformType,
      IsAppSigningEnabled: this.isAppSigningEnabled,
      BundleIdentifier: this.bundleIdentifier,
      StorageTypeForUpload: this.storageTypeForUpload,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_ValidateKeyVaultResponse> {
    const data = await response.json();
    return data as msdyn_ValidateKeyVaultResponse;
  }
}
