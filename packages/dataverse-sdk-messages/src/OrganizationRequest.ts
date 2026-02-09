import type { MessageRequest, MessageResponse } from "./types.js";

/**
 * Generic organization request for custom actions, custom APIs, or unimplemented messages.
 * Provides an escape hatch when strongly-typed messages are not available.
 *
 * @example
 * ```typescript
 * const request = new OrganizationRequest('CustomAction', {
 *   StringParameter: 'value',
 *   IntParameter: 42,
 * });
 *
 * const response = await service.execute(request);
 * console.log(response.Results['OutputParameter']);
 * ```
 */
export class OrganizationRequest implements MessageRequest {
  readonly messageName: string;
  readonly Parameters: Record<string, unknown>;

  /**
   * Creates a new organization request
   *
   * @param messageName - The name of the message/action to execute
   * @param parameters - The parameters for the message
   */
  constructor(messageName: string, parameters: Record<string, unknown> = {}) {
    this.messageName = messageName;
    this.Parameters = parameters;
  }
}

/**
 * Generic organization response for custom actions, custom APIs, or unimplemented messages.
 *
 * @example
 * ```typescript
 * const response = await service.execute(request);
 * if (response instanceof OrganizationResponse) {
 *   console.log(response.Results);
 * }
 * ```
 */
export class OrganizationResponse implements MessageResponse {
  readonly messageName: string;
  readonly Results: Record<string, unknown>;

  /**
   * Creates a new organization response
   *
   * @param messageName - The name of the message that generated this response
   * @param results - The result values from the message execution
   */
  constructor(messageName: string, results: Record<string, unknown> = {}) {
    this.messageName = messageName;
    this.Results = results;
  }
}
