import AppRoutes from "./AppRoutes.jsx";
import { AuthProvider } from "./features/auth/auth.context.jsx";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
