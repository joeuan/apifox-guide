/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from "axios";
import Toast from "@/components/BaseToast";
import { getErrorMessage } from "@/core/utils/tools";
import RequestError from "@/core/Entities/error";
import i18n from "@/i18n";
import { clearUserState, useTokenState } from "@/store/user";
import router from "@/router";
import { ErrorCode, TaskOnResponse } from "@/core/apis/models";
import { NO_TOAST_API_LIST } from "@/core/types/constant";
import { getSessionId } from "@/core/interactors/session";

axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL;

const request = async <T>(
  options: AxiosRequestConfig,
  toast = true
): Promise<T> => {
  try {
    const { data } = await axios.request({
      headers: {
        Authorization: useTokenState().value,
        "session-id": getSessionId(),
        ...options.headers,
      },
      ...options,
    });
    const { error, result } = data as TaskOnResponse;
    if (error && error.code) {
      if (error.code === ErrorCode.CAMPAIGN_NOT_EXIST) {
        router.push("/404");
      }
      const message = getErrorMessage(error.code, error.message);
      throw new RequestError(message, error.code, result);
    }
    return data;
  } catch (e) {
    if ((e as any).response?.status === 403) {
      clearUserState();
      router.push("/");
    } else if (
      toast &&
      !axios.isCancel(e) &&
      !NO_TOAST_API_LIST.includes(options.url || "") &&
      (e as RequestError).errorCode !== ErrorCode.CAMPAIGN_NOT_EXIST
    ) {
      Toast.error((e as Error).message);
    }
    throw e;
  }
};

export default request;
