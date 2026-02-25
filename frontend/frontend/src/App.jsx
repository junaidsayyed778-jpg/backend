import AppRoutes from "./AppRoutes.jsx";
import { AuthProvider } from "./features/auth/auth.context.jsx";
import { PostContextProvider } from "./features/posts/pages/post.context.jsx";

function App() {
  return (
    <AuthProvider>
      <PostContextProvider>
        <AppRoutes />
      </PostContextProvider>
    </AuthProvider>
  );
}

export default App;
