import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

abstract class HttpClient {
  protected readonly instance: AxiosInstance;
  private readonly origin: string = process.env.NEXT_PUBLIC_ORIGIN
    ? process.env.NEXT_PUBLIC_ORIGIN
    : 'http://localhost:3000';

  public constructor() {
    this.instance = axios.create({
      baseURL: this.origin,
      timeout: 100000,
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json'
      }
    });

    this._initializeRequestInterceptor();
    this._initializeResponseInterceptor();
  }

  private _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(
      this._handleRequest,
      this._handleError
    );
  };

  private _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError
    );
  };

  private _handleRequest = (config: AxiosRequestConfig) => {
    // --- Config Axios Here --- //
    // config.headers['Authorization'] = 'Bearer ...';

    return config;
  };

  private _handleResponse = ({ data }: AxiosResponse) => data;

  protected _handleError = (error: any) => Promise.reject(error);
}

export default HttpClient;
