/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** @format int32 */
export enum A2SBlocks {
    Value0 = 0,
    Value1 = 1,
    Value2 = 2,
  }
  
  export interface CompleteExerciseRequest {
    /** @format uuid */
    Id?: string;
    Reps?: number[] | null;
    /** @format int32 */
    Sets?: number;
  }
  
  export interface CreateEquipmentStackRequest {
    /** @format double */
    StartWeight?: number;
    InitialIncrements?: number[] | null;
    /** @format double */
    IncrementValue?: number;
    /** @format double */
    IncrementCount?: number;
    EquipmentStackKey?: string | null;
    /** @format uuid */
    UserID?: string;
  }
  
  export interface CreateExerciseModel {
    ExerciseName: string;
    Category: string;
    Template: ExerciseTemplate;
    EquipmentType: EquipmentType;
    /** @format int32 */
    LiftDay: number;
    /** @format int32 */
    LiftOrder: number;
    /** @format int32 */
    MinimumReps?: number;
    /** @format int32 */
    MaximumReps?: number;
    /** @format int32 */
    TargetSets?: number;
    /** @format int32 */
    WeightIndex?: number;
    PrimaryExercise?: boolean;
    /** @format double */
    StartingWeight?: number;
    /** @format double */
    WeightProgression?: number;
    /** @format int32 */
    AttemptsBeforeDeload?: number;
    /** @format uuid */
    UserId?: string;
    PrimaryLift?: boolean;
    Block?: A2SBlocks;
    /** @format double */
    TrainingMax?: number;
    /** @format double */
    Intensity?: number;
    /** @format int32 */
    Sets?: number;
    /** @format int32 */
    RepsPerSet?: number;
    /** @format int32 */
    Week?: number;
    /** @format uuid */
    ParentId?: string;
    EquipmentStackKey?: EquipmentStackKey;
    EquipmentStack?: CreateEquipmentStackRequest;
  }
  
  export interface CreateRecipeRequest {
    /** @format uuid */
    UserId?: string;
    Name?: string | null;
    Steps?: string[] | null;
    Ingredients?: RecipeIngredient[] | null;
  }
  
  export interface CreateToDoRequest {
    Description?: string | null;
    Title?: string | null;
    Username?: string | null;
  }
  
  export interface CreateUser {
    /** @format uuid */
    CognitoUserId?: string;
    UserName?: string | null;
    /** @format int32 */
    WorkoutDaysInweek?: number;
  }
  
  export interface CreateWorkoutRequest {
    /** @format uuid */
    userId?: string;
    ExerciseDaysAndOrders?: CreateExerciseModel[] | null;
  }
  
  export interface EquipmentStack {
    /** @format uuid */
    Id?: string;
    /** @format double */
    StartWeight?: number;
    InitialIncrements?: number[] | null;
    /** @format double */
    IncrementValue?: number;
    /** @format double */
    IncrementCount?: number;
    EquipmentStackKey?: string | null;
    /** @format uuid */
    UserID?: string;
  }
  
  /** @format int32 */
  export enum EquipmentStackKey {
    Value0 = 0,
    Value1 = 1,
    Value2 = 2,
  }
  
  export interface EquipmentStackResponse {
    Stack?: EquipmentStack;
  }
  
  /** @format int32 */
  export enum EquipmentType{
    Barbell,
    SmithMachine,
    Dumbbell,
    Machine,
    Cable,
}

export enum Category{
    Shoulders,
    Chest,
    Back,
    Biceps,
    Triceps,
    Legs
}
  export interface Exercise {
    /** @format uuid */
    Id?: string;
    ExerciseName?: string | null;
    Category?: string | null;
    EquipmentType?: EquipmentType;
    Template?: ExerciseTemplate;
    /** @format int32 */
    LiftDay?: number;
    /** @format int32 */
    LiftOrder?: number;
    /** @format int32 */
    LiftWeek?: number;
    /** @format uuid */
    UserId?: string;
    /** @format double */
    WorkingWeight?: number;
    /** @format uuid */
    ParentId?: string;
    Completed?: boolean;
  }
  
  /** @format int32 */
  export enum ExerciseCompletedStatus {
    Value1 = 1,
    Value2 = 2,
    Value3 = 3,
    Value4 = 4,
    Value5 = 5,
  }
  
  export interface ExerciseCompletionResult {
    Status?: ExerciseCompletedStatus;
    exercise?: Exercise;
  }
  
  /** @format int32 */
  export enum ExerciseTemplate {
    Value0 = 0,
    Value1 = 1,
    Value2 = 2,
  }
  
  export interface GetExerciseResult {
    Exercises?: Exercise;
  }
  
  export interface GetWorkoutResult {
    Exercises?: Exercise[] | null;
  }
  
  export interface Recipe {
    /** @format uuid */
    Id?: string;
    Name: string;
    Steps?: string | null;
    /** @format uuid */
    UserId?: string;
    Ingredients?: RecipeIngredient[] | null;
  }
  
  export interface RecipeIngredient {
    /** @format uuid */
    Id?: string;
    /** @format uuid */
    UserId?: string;
    Name?: string | null;
    /** @format int32 */
    Quantity?: number;
    Measurement?: string | null;
    /** @format uuid */
    RecipeId?: string;
  }
  
  export interface UpdateWeekAndDayRequest {
    /** @format int32 */
    Week?: number;
    /** @format int32 */
    Day?: number;
    /** @format uuid */
    UserId?: string;
  }
  
  export interface WeekAndDayResponse {
    /** @format int32 */
    Week?: number;
    /** @format int32 */
    Day?: number;
  }
  
  /** @format int32 */
  export enum WorkoutCreatedStatus {
    Value1 = 1,
    Value2 = 2,
  }
  
  export interface WorkoutCreationResult {
    Status?: WorkoutCreatedStatus;
    Exercises?: Exercise[] | null;
  }
  
  export type QueryParamsType = Record<string | number, any>;
  export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;
  
  export interface FullRequestParams extends Omit<RequestInit, "body"> {
    /** set parameter to `true` for call `securityWorker` for this request */
    secure?: boolean;
    /** request path */
    path: string;
    /** content type of request body */
    type?: ContentType;
    /** query params */
    query?: QueryParamsType;
    /** format of response (i.e. response.json() -> format: "json") */
    format?: ResponseFormat;
    /** request body */
    body?: unknown;
    /** base url */
    baseUrl?: string;
    /** request cancellation token */
    cancelToken?: CancelToken;
  }
  
  export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;
  
  export interface ApiConfig<SecurityDataType = unknown> {
    baseUrl?: string;
    baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
    securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
    customFetch?: typeof fetch;
  }
  
  export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
    data: D;
    error: E;
  }
  
  type CancelToken = Symbol | string | number;
  
  export enum ContentType {
    Json = "application/json",
    FormData = "multipart/form-data",
    UrlEncoded = "application/x-www-form-urlencoded",
    Text = "text/plain",
  }
  
  export class HttpClient<SecurityDataType = unknown> {
    public baseUrl: string = "";
    private securityData: SecurityDataType | null = null;
    private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
    private abortControllers = new Map<CancelToken, AbortController>();
    private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);
  
    private baseApiParams: RequestParams = {
      credentials: "same-origin",
      headers: {},
      redirect: "follow",
      referrerPolicy: "no-referrer",
    };
  
    constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
      Object.assign(this, apiConfig);
    }
  
    public setSecurityData = (data: SecurityDataType | null) => {
      this.securityData = data;
    };
  
    protected encodeQueryParam(key: string, value: any) {
      const encodedKey = encodeURIComponent(key);
      return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
    }
  
    protected addQueryParam(query: QueryParamsType, key: string) {
      return this.encodeQueryParam(key, query[key]);
    }
  
    protected addArrayQueryParam(query: QueryParamsType, key: string) {
      const value = query[key];
      return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
    }
  
    protected toQueryString(rawQuery?: QueryParamsType): string {
      const query = rawQuery || {};
      const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
      return keys
        .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
        .join("&");
    }
  
    protected addQueryParams(rawQuery?: QueryParamsType): string {
      const queryString = this.toQueryString(rawQuery);
      return queryString ? `?${queryString}` : "";
    }
  
    private contentFormatters: Record<ContentType, (input: any) => any> = {
      [ContentType.Json]: (input: any) =>
        input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
      [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
      [ContentType.FormData]: (input: any) =>
        Object.keys(input || {}).reduce((formData, key) => {
          const property = input[key];
          formData.append(
            key,
            property instanceof Blob
              ? property
              : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
          );
          return formData;
        }, new FormData()),
      [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
    };
  
    protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
      return {
        ...this.baseApiParams,
        ...params1,
        ...(params2 || {}),
        headers: {
          ...(this.baseApiParams.headers || {}),
          ...(params1.headers || {}),
          ...((params2 && params2.headers) || {}),
        },
      };
    }
  
    protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
      if (this.abortControllers.has(cancelToken)) {
        const abortController = this.abortControllers.get(cancelToken);
        if (abortController) {
          return abortController.signal;
        }
        return void 0;
      }
  
      const abortController = new AbortController();
      this.abortControllers.set(cancelToken, abortController);
      return abortController.signal;
    };
  
    public abortRequest = (cancelToken: CancelToken) => {
      const abortController = this.abortControllers.get(cancelToken);
  
      if (abortController) {
        abortController.abort();
        this.abortControllers.delete(cancelToken);
      }
    };
  
    public request = async <T = any, E = any>({
      body,
      secure,
      path,
      type,
      query,
      format,
      baseUrl,
      cancelToken,
      ...params
    }: FullRequestParams): Promise<HttpResponse<T, E>> => {
      const secureParams =
        ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
          this.securityWorker &&
          (await this.securityWorker(this.securityData))) ||
        {};
      const requestParams = this.mergeRequestParams(params, secureParams);
      const queryString = query && this.toQueryString(query);
      const payloadFormatter = this.contentFormatters[type || ContentType.Json];
      const responseFormat = format || requestParams.format;
  
      return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        },
        signal: cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal,
        body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
      }).then(async (response) => {
        const r = response as HttpResponse<T, E>;
        r.data = null as unknown as T;
        r.error = null as unknown as E;
  
        const data = !responseFormat
          ? r
          : await response[responseFormat]()
              .then((data) => {
                if (r.ok) {
                  r.data = data;
                } else {
                  r.error = data;
                }
                return r;
              })
              .catch((e) => {
                r.error = e;
                return r;
              });
  
        if (cancelToken) {
          this.abortControllers.delete(cancelToken);
        }
  
        if (!response.ok) throw data;
        return data;
      });
    };
  }
  
  /**
   * @title OperationStacked
   * @version 1.0
   */
  export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    equipmentStack = {
      /**
       * No description
       *
       * @tags EquipmentStack
       * @name CreateCreate
       * @request POST:/equipment-stack/create
       */
      createCreate: (data: CreateEquipmentStackRequest, params: RequestParams = {}) =>
        this.request<EquipmentStackResponse, any>({
          path: `/equipment-stack/create`,
          method: "POST",
          body: data,
          type: ContentType.Json,
          format: "json",
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags EquipmentStack
       * @name EquipmentStackDetail
       * @request GET:/equipment-stack/{equipmentStackId}
       */
      equipmentStackDetail: (equipmentStackId: string, params: RequestParams = {}) =>
        this.request<EquipmentStackResponse, any>({
          path: `/equipment-stack/${equipmentStackId}`,
          method: "GET",
          format: "json",
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags EquipmentStack
       * @name EquipmentStackDelete
       * @request DELETE:/equipment-stack/{equipmentStackId}
       */
      equipmentStackDelete: (equipmentStackId: string, params: RequestParams = {}) =>
        this.request<boolean, any>({
          path: `/equipment-stack/${equipmentStackId}`,
          method: "DELETE",
          format: "json",
          ...params,
        }),
    };
    workoutCreation = {
      /**
       * No description
       *
       * @tags Exercise
       * @name WorkoutCreationCreate
       * @request POST:/workout-creation
       */
      workoutCreationCreate: (data: CreateWorkoutRequest, params: RequestParams = {}) =>
        this.request<WorkoutCreationResult, any>({
          path: `/workout-creation`,
          method: "POST",
          body: data,
          type: ContentType.Json,
          format: "json",
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags Exercise
       * @name CompleteCreate
       * @request POST:/workout-creation/complete
       */
      completeCreate: (data: CompleteExerciseRequest, params: RequestParams = {}) =>
        this.request<ExerciseCompletionResult, any>({
          path: `/workout-creation/complete`,
          method: "POST",
          body: data,
          type: ContentType.Json,
          format: "json",
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags Exercise
       * @name WorkoutCreationDetail
       * @request GET:/workout-creation/{userId}/{week}/{day}/{completed}
       */
      workoutCreationDetail: (
        userId: string,
        week: number,
        day: number,
        completed: boolean,
        params: RequestParams = {},
      ) =>
        this.request<GetWorkoutResult, any>({
          path: `/workout-creation/${userId}/${week}/${day}/${completed}`,
          method: "GET",
          format: "json",
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags Exercise
       * @name DeleteDelete
       * @request DELETE:/workout-creation/{exerciseId}/delete
       */
      deleteDelete: (exerciseId: string, params: RequestParams = {}) =>
        this.request<boolean, any>({
          path: `/workout-creation/${exerciseId}/delete`,
          method: "DELETE",
          format: "json",
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags Exercise
       * @name DeleteAllDelete
       * @request DELETE:/workout-creation/{userId}/delete-all
       */
      deleteAllDelete: (userId: string, params: RequestParams = {}) =>
        this.request<boolean, any>({
          path: `/workout-creation/${userId}/delete-all`,
          method: "DELETE",
          format: "json",
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags Exercise
       * @name WorkoutCreationDetail2
       * @request GET:/workout-creation/{exerciseId}
       * @originalName workoutCreationDetail
       * @duplicate
       */
      workoutCreationDetail2: (exerciseId: string, params: RequestParams = {}) =>
        this.request<GetExerciseResult, any>({
          path: `/workout-creation/${exerciseId}`,
          method: "GET",
          format: "json",
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags Exercise
       * @name WorkoutCreationUpdate
       * @request PUT:/workout-creation/{exerciseId}/{weight}
       */
      workoutCreationUpdate: (exerciseId: string, weight: number, params: RequestParams = {}) =>
        this.request<boolean, any>({
          path: `/workout-creation/${exerciseId}/${weight}`,
          method: "PUT",
          format: "json",
          ...params,
        }),
    };
    recipe = {
      /**
       * No description
       *
       * @tags Recipe
       * @name RecipeCreate
       * @request POST:/recipe
       */
      recipeCreate: (data: CreateRecipeRequest, params: RequestParams = {}) =>
        this.request<Recipe, any>({
          path: `/recipe`,
          method: "POST",
          body: data,
          type: ContentType.Json,
          format: "json",
          ...params,
        }),
    };
    userId = {
      /**
       * No description
       *
       * @tags Recipe
       * @name GetUserId
       * @request GET:/{userId}/{recipeId}
       */
      getUserId: (userId: string, recipeId: string, params: RequestParams = {}) =>
        this.request<Recipe, any>({
          path: `/${userId}/${recipeId}`,
          method: "GET",
          format: "json",
          ...params,
        }),
    };
    user = {
      /**
       * No description
       *
       * @tags ToDo
       * @name CreateToDoCreate
       * @request POST:/user/create-to-do
       */
      createToDoCreate: (data: CreateToDoRequest, params: RequestParams = {}) =>
        this.request<void, any>({
          path: `/user/create-to-do`,
          method: "POST",
          body: data,
          type: ContentType.Json,
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags ToDo
       * @name CompleteToDoCreate
       * @request POST:/user/complete-to-do
       */
      completeToDoCreate: (
        query?: {
          /** @format int32 */
          id?: number;
        },
        params: RequestParams = {},
      ) =>
        this.request<void, any>({
          path: `/user/complete-to-do`,
          method: "POST",
          query: query,
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags ToDo
       * @name GetToDoListCreate
       * @request POST:/user/get-to-do-list
       */
      getToDoListCreate: (
        query?: {
          username?: string;
        },
        params: RequestParams = {},
      ) =>
        this.request<void, any>({
          path: `/user/get-to-do-list`,
          method: "POST",
          query: query,
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags User
       * @name UpdateWeekAndDayCreate
       * @request POST:/user/updateWeekAndDay
       */
      updateWeekAndDayCreate: (data: UpdateWeekAndDayRequest, params: RequestParams = {}) =>
        this.request<WeekAndDayResponse, any>({
          path: `/user/updateWeekAndDay`,
          method: "POST",
          body: data,
          type: ContentType.Json,
          format: "json",
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags User
       * @name UpdateCreate
       * @request POST:/user/update
       */
      updateCreate: (data: string, params: RequestParams = {}) =>
        this.request<WeekAndDayResponse, any>({
          path: `/user/update`,
          method: "POST",
          body: data,
          type: ContentType.Json,
          format: "json",
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags User
       * @name WeekAndDayDetail
       * @request GET:/user/week-and-day/{userId}
       */
      weekAndDayDetail: (userId: string, params: RequestParams = {}) =>
        this.request<WeekAndDayResponse, any>({
          path: `/user/week-and-day/${userId}`,
          method: "GET",
          format: "json",
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags User
       * @name CreateUserCreate
       * @request POST:/user/create-user
       */
      createUserCreate: (data: CreateUser, params: RequestParams = {}) =>
        this.request<void, any>({
          path: `/user/create-user`,
          method: "POST",
          body: data,
          type: ContentType.Json,
          ...params,
        }),
  
      /**
       * No description
       *
       * @tags User
       * @name NameList
       * @request GET:/user/name
       */
      nameList: (
        query?: {
          /** @format uuid */
          cognitoUserId?: string;
        },
        params: RequestParams = {},
      ) =>
        this.request<void, any>({
          path: `/user/name`,
          method: "GET",
          query: query,
          ...params,
        }),
    };
  }
