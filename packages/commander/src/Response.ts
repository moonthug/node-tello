interface IResponse {
  success: boolean;
  value?: string;
  error?: string;
}

/**
 * 
 */
export class Response {

  /**
   *
   */
  private readonly _success: boolean;
  private readonly _value: string;
  private readonly _error: string;

  /**
   *
   * @param responseData
   */
  constructor(responseData: Buffer) {
    const { success, value, error } = this._parseResponseData(responseData);
    this._success = success;
    this._value = value;
    this._error = error;
  }

  /**
   *
   * @param responseData
   * @private
   */
  private _parseResponseData(responseData: Buffer) {
    const responseString = responseData.toString('utf-8');

    const response: IResponse = {
      success: true,
      value: null,
      error: null
    };

    if (responseString.substr(0, 2) === 'ok') {
      return response;
    }

    if (responseString.substr(0, 5) === 'error') {
      response.error = responseString;
      response.success = false;
      return response;
    }

    response.value = responseString.trim();
    return response;
  }

  /**
   *
   */
  get success(): boolean {
    return this._success;
  }

  /**
   *
   */
  get value(): string {
    return this._value;
  }

  /**
   *
   */
  get error(): string {
    return this._error;
  }
}
