import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_EvaluateMasterEntityRoutingConfiguration action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_EvaluateMasterEntityRoutingConfigurationResponse = void;

/**
 * Parameters of the msdyn_EvaluateMasterEntityRoutingConfiguration action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_EvaluateMasterEntityRoutingConfigurationActionParameters {
  Target: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_EvaluateMasterEntityRoutingConfiguration action
 *
 * Unbound action
 */
export class msdyn_EvaluateMasterEntityRoutingConfigurationAction implements Executable<msdyn_EvaluateMasterEntityRoutingConfigurationResponse> {
  constructor(
    public readonly parameters: msdyn_EvaluateMasterEntityRoutingConfigurationActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EvaluateMasterEntityRoutingConfiguration`;

    const body = requestBody({
      Target: this.parameters.Target,
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

  parseResponse(
    _response: Response
  ): Promise<msdyn_EvaluateMasterEntityRoutingConfigurationResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
