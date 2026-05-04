import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApi } from "./useApi";

export const useUpload = () => {
    const { postForm } = useApi();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (file: File) => {
            const fd = new FormData();
            fd.append("file", file);

            return postForm("upload", fd);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["documents"],
            });
        },
    });
};