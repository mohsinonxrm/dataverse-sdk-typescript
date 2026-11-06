import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_ValidateKeyVaultResponse as msdyn_ValidateKeyVaultResponseData } from "./types/index.js";

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
    public keyVaultUri?: string,
    public platformType?: string,
    public isAppSigningEnabled?: boolean,
    public bundleIdentifier?: string,
    public storageTypeForUpload?: string
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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_ValidateKeyVaultResponse> {
    const data = await response.json();
    return msdyn_ValidateKeyVaultResponse.fromResponse(data);
  }
}

/**
 * msdyn_ValidateKeyVault response message
 */
export class msdyn_ValidateKeyVaultResponse extends OrganizationResponse {
  constructor(public result: msdyn_ValidateKeyVaultResponseData) {
    super("msdyn_ValidateKeyVault");
  }

  static fromResponse(data: unknown): msdyn_ValidateKeyVaultResponse {
    return new msdyn_ValidateKeyVaultResponse(
      responseObject<msdyn_ValidateKeyVaultResponseData>(data)
    );
  }
}
