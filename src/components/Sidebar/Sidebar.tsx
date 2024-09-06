import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  Clock4,
  Compass,
  History,
  Home,
  MonitorPlay,
  UserCircle,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "../ui/separator";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const Sidebar = ({ className }: Props) => {
  return (
    <ScrollArea
      className={cn(
        "h-screen w-60 pt-3 z-40 !fixed hidden md:block top-0 dark:bg-black dark:text-white bg-white text-black -translate-x-full transition-transform duration-500 animate-fadeInLeft",
        className
      )}
    >
      <div className="px-5 flex items-center animate-fadeInLeft">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-black">REWIND</span>
        </Link>
      </div>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Discover
          </h2>
          <div className="space-y-1">
            <Link href="/">
              <Button
                variant="ghost"
                className="w-full font-light justify-start"
              >
                <Home size={30} className="mr-3" />
                Home
              </Button>
            </Link>
            <Button variant="ghost" className="w-full justify-start font-light">
              <Compass size={30} className="mr-3" />
              Explore
            </Button>
            {/* <Button variant="ghost" className="w-full justify-start font-light">
              <Tv2 size={30} className="mr-3" />
              Subscriptions
            </Button> */}
          </div>
        </div>
        <Separator />
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            You
          </h2>

          <div className="space-y-1">
            <Link href={`/channels/${process.env.NEXT_PUBLIC_CHANNEL_ID}`}>
              <Button
                variant="ghost"
                className="w-full justify-start font-light"
              >
                <UserCircle size={30} className="mr-3" />
                Your channel
              </Button>
            </Link>
            <Button variant="ghost" className="w-full justify-start font-light">
              <History size={30} className="mr-3" />
              History
            </Button>
            <Button variant="ghost" className="w-full justify-start font-light">
              <MonitorPlay size={30} className="mr-3" />
              Your videos
            </Button>
            <Button variant="ghost" className="w-full justify-start font-light">
              <Clock4 size={30} className="mr-3" />
              Watch later
            </Button>
          </div>
        </div>
        <Separator />
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Subscriptions
          </h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start font-light">
              <UserCircle size={30} className="mr-3" />
              Profile Handle
            </Button>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default Sidebar;
