import CircularProgress from "@/components/circle";
import Plan from "@/components/plan";
import Profile from "@/components/profile";
import Welcome from "@/components/welcome";

const page = () => {
  return (
    <div className="flex flex-col min-h-screen bg-purple-100">
      <Profile />
      <Welcome />
      <CircularProgress />
      <Plan />
    </div>
  );
};

export default page;
