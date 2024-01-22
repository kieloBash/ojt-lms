"use client";
import React, { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { calculateAge } from "@/utils/helpers/calculateAge";
import { GRADE_LEVEL, getGradeLevel } from "@/utils/constants/data/gradeLevels";

export function LevelFormCard({
  child_bday,
  setGradeLevel,
}: {
  setGradeLevel: (e: string) => void;
  child_bday: string;
}) {
  const [gradeOption, setGradeOption] = useState<string[]>([]);

  const child_age = calculateAge(new Date(child_bday));

  useEffect(() => {
    if (child_age > 0) {
      const temp = getGradeLevel(child_age as number);
      setGradeOption(temp);
    }
  }, [child_age]);

  return (
    <Card className="w-full max-w-sm mb-32">
      <CardHeader>
        <CardTitle className="text-main-500">Grade Level</CardTitle>
        <CardDescription>
          Please select a grade level for your children, in order for us to
          create courses specially for them.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid items-center w-full gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Grade Level</Label>
              <Select onValueChange={(e) => setGradeLevel(e)}>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {gradeOption.map((d) => {
                    const label = GRADE_LEVEL[d as keyof typeof GRADE_LEVEL];
                    return (
                      <SelectItem key={d} value={d}>
                        {label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
