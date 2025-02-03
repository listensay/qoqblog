import { Button } from "@mantine/core";
import Menu from '@/components/Menu'
import Header from "./components/Header";

export default function Home() {
  return (
    <div>
      {/* <Menu /> */}
      <div className="container mx-auto">
        <div className="mt-4">
          <Header />
        </div>
        <Button >12312</Button>
      </div>
    </div>
  );
}
