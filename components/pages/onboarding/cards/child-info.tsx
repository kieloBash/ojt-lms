"use client";
import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ChildInfoForm({
  name,
  dob,
  setName,
  setDOB,
}: {
  name: string;
  dob: string;
  setName: (e: string) => void;
  setDOB: (e: string) => void;
}) {
  return (
    <Card className="w-full max-w-xl shadow-lg">
      <CardHeader>
        <CardTitle className="text-main-500">Child Information</CardTitle>
        <CardDescription>{`Please enter your child's information so we can make courses specially made for them!`}</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid items-center w-full gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Full Name</Label>
              <Input
                onChange={(e) => setName(e.target.value)}
                id="name"
                placeholder="Name of your child"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                onChange={(e) => {
                  setDOB(e.target.value);
                }}
                id="dob"
                type="date"
              />
            </div>
            {/* <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Grade Level</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div> */}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
