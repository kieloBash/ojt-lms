import { CalendarDays } from "lucide-react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { MaterialType } from "@/components/pages/materials/data/schema";
import { file_types } from "@/components/pages/materials/data/data";
import Link from "next/link";

export function HoverMaterials({ materials }: { materials: MaterialType[] }) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className="cursor-pointer hover:underline line-clamp-1">
          {materials.length} item/s
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex flex-col items-center justify-center">
          {materials.map((m) => {
            const filetype: any = file_types.find(
              (file) => file.label === m?.type
            );
            console.log(filetype);

            return (
              <Link
                href={m.url}
                target="_blank"
                className="p-2 transition-colors rounded-lg hover:bg-slate-100"
              >
                <div className="space-y-1" key={m._id}>
                  <h4 className="text-sm font-semibold line-clamp-1">
                    {m.filename}
                  </h4>
                  <div className="flex items-center pt-2">
                    {filetype.icon && (
                      <filetype.icon className="w-4 h-4 mr-2 opacity-70" />
                    )}
                    <span className="text-xs text-muted-foreground">
                      {filetype?.label}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
