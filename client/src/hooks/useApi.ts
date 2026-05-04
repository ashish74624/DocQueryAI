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
        };
    };

    const get = async <T>(url: string): Promise<T> => {
        const res = await fetch(`${BASE_URL}/${url}/`, {
            headers: getHeaders(url),
        });
        return handleResponse(res);
    };

    const post = async <T>(url: string, bodyData: Record<string, any>): Promise<T> => {
        const snakeBody = snakecaseKeys(bodyData, { deep: true });
        const res = await fetch(`${BASE_URL}/${url}/`, {
            method: "POST",
            headers: getHeaders(url),
            body: JSON.stringify(snakeBody),
        });
        return handleResponse(res);
    };

    const put = async <T>(url: string, bodyData: Record<string, any>): Promise<T> => {
        const snakeBody = snakecaseKeys(bodyData, { deep: true });
        const res = await fetch(`${BASE_URL}/${url}/`, {
            method: "PUT",
            headers: getHeaders(url),
            body: JSON.stringify(snakeBody),
        });
        return handleResponse(res);
    };

    const postForm = async <T>(url: string, formData: FormData): Promise<T> => {
        const token = localStorage.getItem("token");
        const res = await fetch(`${BASE_URL}/${url}/`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });
        return handleResponse(res);
    };

    // ── NEW: for endpoints that return a binary file (PDF etc.) ─────────────
    const postBlob = async (
        url: string,
        bodyData: Record<string, any>
    ): Promise<{ blob: Blob; filename: string }> => {
        const token = localStorage.getItem("token");
        const snakeBody = snakecaseKeys(bodyData, { deep: true });

        const res = await fetch(`${BASE_URL}/${url}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(snakeBody),
        });

        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err?.detail || "Report generation failed.");
        }

        const blob = await res.blob();

        // Pull filename from Content-Disposition header if present
        const disposition = res.headers.get("Content-Disposition") || "";
        const match = disposition.match(/filename="?([^"]+)"?/);
        const filename = match?.[1] ?? "report.pdf";

        return { blob, filename };
    };

    return { get, post, put, postForm, postBlob };
};