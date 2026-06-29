import AppRoutes from "@/routes/AppRoutes";
import useAuthListener from "@/hooks/useAuthListener";

const App = () => {
  useAuthListener();

  return <AppRoutes />;
};

export default App;