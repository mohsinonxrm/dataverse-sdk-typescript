import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_ValidateKeyVaultResponse as msdyn_ValidateKeyVaultResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_ValidateKeyVault message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ValidateKeyVaultRequestParameters {
  KeyVaultUri?: string;
  PlatformType?: string;
  IsAppSigningEnabled?: boolean;
  BundleIdentifier?: string;
  StorageTypeForUpload?: string;
}

/**
 * msdyn_ValidateKeyVault request message
 *
 * Web API Action: msdyn_ValidateKeyVault
 */
export class msdyn_ValidateKeyVaultRequest
  extends OrganizationRequest
  implements Executable<msdyn_ValidateKeyVaultResponse>
{
  declare readonly Parameters: Readonly<msdyn_ValidateKeyVaultRequestParameters>;

  constructor(parameters: msdyn_ValidateKeyVaultRequestParameters = {}) {
    super("msdyn_ValidateKeyVault", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ValidateKeyVault`;

    const body = requestBody({
      KeyVaultUri: this.Parameters.KeyVaultUri,
      PlatformType: this.Parameters.PlatformType,
      IsAppSigningEnabled: this.Parameters.IsAppSigningEnabled,
      BundleIdentifier: this.Parameters.BundleIdentifier,
      StorageTypeForUpload: this.Parameters.StorageTypeForUpload,
    });

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_ValidateKeyVaultResponse.fromResponse(text ? JSON.parse(text) : {});
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
