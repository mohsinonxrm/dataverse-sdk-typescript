import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_ValidateKeyVault request message
 *
 * Web API Action: msdyn_ValidateKeyVault
 */
export class msdyn_ValidateKeyVaultRequest
  extends OrganizationRequest
  implements Executable<msdyn_ValidateKeyVaultResponse>
{
  constructor(
    public keyVaultUri: string,
    public platformType: string,
    public isAppSigningEnabled: boolean,
    public bundleIdentifier: string,
    public storageTypeForUpload: string
  ) {
    super("msdyn_ValidateKeyVault");
  }

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_ValidateKeyVaultResponse> {
    const data = await response.json();
    return msdyn_ValidateKeyVaultResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      KeyVaultUri: this.keyVaultUri,
      PlatformType: this.platformType,
      IsAppSigningEnabled: this.isAppSigningEnabled,
      BundleIdentifier: this.bundleIdentifier,
      StorageTypeForUpload: this.storageTypeForUpload,
    };
  }
}

/**
 * msdyn_ValidateKeyVault response message
 */
export class msdyn_ValidateKeyVaultResponse extends OrganizationResponse {
  constructor(public result: msdyn_ValidateKeyVaultResponse) {
    super("msdyn_ValidateKeyVault");
  }

  static fromResponse(data: unknown): msdyn_ValidateKeyVaultResponse {
    return new msdyn_ValidateKeyVaultResponse((data as any).value);
  }
}
