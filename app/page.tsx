import BlogList from "./components/BlogList";
import HeaderLayout from "./components/HeaderLayout";

export default async function Home() {
  return (
    <div>
      <HeaderLayout>
        <BlogList />
      </HeaderLayout>
    </div>
  );
}
