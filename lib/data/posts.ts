import api from "@/lib/api";
export async function getPosts() {
    try {
        const response = await api.get('posts', {
            params: {
                limit: 200, // Adjust the limit as needed
                skip: 0,   // Adjust the skip as needed
            }
        });
        return response.data.posts;

    }catch (error) {
        console.error("Error fetching posts:", error);
        throw error; // Re-throw the error for further handling if needed
    }
}

export async function deletePostByIds(ids: string[]) {
    try {
        const response = await api.delete('posts', {
            data: { ids }
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting posts:", error);
        throw error; // Re-throw the error for further handling if needed
    }
}