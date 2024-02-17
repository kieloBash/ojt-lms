"use client";

// UI
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ClassesType } from "@/lib/interfaces/class.interface";
import { convertTime } from "@/utils/helpers/convertTime";

import {
  Clock,
  Link,
  MoreHorizontal,
  Plus,
  Settings,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function FullCourseCard({
  level,
  timeslots,
  handleSelected,
}: {
  level: string;
  timeslots: ClassesType[];
  handleSelected: (e: ClassesType) => void;
}) {
  return (
    <Card className="w-[18rem]">
      <p className="flex items-center justify-between px-6 pt-4 pb-2">
        <CardTitle>{level} Classes</CardTitle>
        <Dropdown />
      </p>
      <CardContent>
        <div className="space-y-2">
          <h4 className="font-medium">Classes Time Slots</h4>
          <div className="grid gap-6">
            {timeslots?.map((single) => {
              return <Single data={single} handleSelected={handleSelected} />;
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const Single = ({
  data,
  handleSelected,
}: {
  data: ClassesType;
  handleSelected: (e: ClassesType) => void;
}) => {
  return (
    <div key={data._id} className="flex items-center justify-between space-x-4">
      <div className="flex items-center space-x-4">
        <div>
          <p className="text-sm font-medium leading-none">{data.day}</p>
          <p className="text-sm text-muted-foreground">
            {convertTime(data.startTime, data.endTime)}
          </p>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-7 h-7 p-1.5">
            <Settings className="w-full h-full" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64" align={"end"}>
          <DropdownMenuLabel>
            {data.day} | {convertTime(data.startTime, data.endTime)}
          </DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="w-4 h-4 mr-2" />
              <span>View Participants</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                handleSelected(data);
              }}
            >
              <Clock className="w-4 h-4 mr-2" />
              <span>Update Time</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const Dropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-8 h-8 p-1.5">
          <MoreHorizontal className="w-full h-full" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align={"end"}>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link className="w-4 h-4 mr-2" />
            <span>Update Link</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Plus className="w-4 h-4 mr-2" />
            <span>Add Time Slot</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        {/* <DropdownMenuSeparator /> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
