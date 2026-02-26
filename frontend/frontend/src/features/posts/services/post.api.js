import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
    timeout: 10000, // 10 seconds timeout
});

export async function getFeed(){
    try {
        const response = await api.get("/api/posts/feed");
        return response.data;
    } catch (error) {
        console.error("❌ getFeed error:", {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data
        });
        throw error;
    }
}

export async function createPost(imageFile, caption){
    try {
        // ✅ Validate file before sending
        if (!imageFile) {
            throw new Error("No image file provided");
        }

        // ✅ Validate file type (optional but recommended)
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(imageFile.type)) {
            throw new Error("Only JPG, PNG, GIF images are allowed");
        }

        const formData = new FormData();
        // ⚠️ "image" key MUST match backend's multer field name (e.g., upload.single('image'))
        formData.append("image", imageFile);
        formData.append("caption", caption);

        // ✅ Debug: Log file details (browser console mein dikhega)
        console.log("📤 Uploading:", {
            fileName: imageFile.name,
            fileType: imageFile.type,
            fileSize: (imageFile.size / 1024 / 1024).toFixed(2) + " MB"
        });

        // ✅ POST request - Content-Type header mat set karein manually!
        // Axios automatically sets "multipart/form-data" with correct boundary
        const response = await api.post("/api/posts", formData, {
            headers: {
                // ❌ "Content-Type": "multipart/form-data" ← Yeh MAT likhna!
                // ✅ Let axios handle it automatically
            },
            // Optional: Upload progress tracking
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
                console.log(`📊 Upload Progress: ${percentCompleted}%`);
            }
        });
        
        return response.data;
    } catch (error) {
        console.error("❌ createPost error:", {
            message: error.message,
            status: error.response?.status,
            backendError: error.response?.data,
            config: {
                url: error.config?.url,
                method: error.config?.method,
            }
        });
        throw error;
    }
}