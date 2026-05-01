/* eslint-disable @typescript-eslint/no-explicit-any */

import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";
import { BASE_URL } from "../constant";

export const useApi = () => {

    const exemptedUrls = ["login", "register"];

    const handleResponse = async (res: Response) => {
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data?.msg || "Something went wrong");
        }

        return camelcaseKeys(data, { deep: true });
    };


    const getHeaders = (url: string): HeadersInit => {
        const token = localStorage.getItem("token");

        if (exemptedUrls.some((u) => url.includes(u))) {
            return { "Content-Type": "application/json" };
        }

        return {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    }

    const get = async <T>(url: string): Promise<T> => {
        const res = await fetch(`${BASE_URL}/${url}/`, {
            headers: getHeaders(url)
        });

        return handleResponse(res);
    };


    const post = async <T>(url: string, bodyData: Record<string, any>): Promise<T> => {
        const snakeBody = snakecaseKeys(bodyData, { deep: true });
        const res = await fetch(`${BASE_URL}/${url}/`, {
            method: "POST",
            headers: getHeaders(url),
            body: JSON.stringify(snakeBody)
        });

        return handleResponse(res);
    };


    const put = async <T>(url: string, bodyData: Record<string, any>): Promise<T> => {
        const snakeBody = snakecaseKeys(bodyData, { deep: true });

        const res = await fetch(`${BASE_URL}/${url}/`, {
            method: "PUT",
            headers: getHeaders(url),
            body: JSON.stringify(snakeBody)
        });

        return handleResponse(res);
    };


    return { get, post, put }
} 
