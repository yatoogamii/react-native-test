// Global

const API_KEY = "AIzaSyD7KwpetE1iYmiwaPtENQPVYopRWgIVSrA";

interface IFetchError {
  code: number;
  message: string;
}

export interface IFetchResponse {
  status: "ok" | "error";
  data?: ISignInMailPasswordOutput;
  error?: IFetchError;
}

// SignInMailPassword

interface ISignInMailPasswordInput {
  email: string;
  password: string;
}

interface ISignUpMailPasswordInput extends ISignInMailPasswordInput {}

interface ISignInMailPasswordOutput {
  localId: string;
  email: string;
  displayName: string;
  idToken: string;
  registered: boolean;
  refreshToken: string;
  expiresIn: string;
  error?: IFetchError;
}

interface ISignUpMailPasswordOutput extends ISignInMailPasswordOutput {}

export async function signInMailPassword(
  params: ISignInMailPasswordInput,
): Promise<IFetchResponse> {
  try {
    const fetched = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: params.email,
          password: params.password,
          returnSecureToken: true,
        }),
      },
    );

    const response: ISignInMailPasswordOutput | any = await fetched.json();

    if ("error" in response) {
      return {
        status: "error",
        data: response.error,
      };
    } else {
      return {
        status: "ok",
        data: response,
      };
    }
  } catch (e) {
    console.log(e);
    return {
      status: "error",
      data: e,
    };
  }
}

export async function signUpMailPassword(
  params: ISignUpMailPasswordInput,
): Promise<IFetchResponse> {
  try {
    const fetched = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: params.email,
          password: params.password,
          returnSecureToken: true,
        }),
      },
    );

    const response: ISignUpMailPasswordOutput | any = await fetched.json();

    if ("error" in response) {
      return {
        status: "error",
        data: response.error,
      };
    } else {
      return {
        status: "ok",
        data: response,
      };
    }
  } catch (e) {
    console.log(e);
    return {
      status: "error",
      data: e,
    };
  }
}
