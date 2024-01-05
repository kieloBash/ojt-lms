"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { EyeIcon, EyeOffIcon, Verified } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { UserType } from "@/lib/interfaces/user.interface";
import { ParentType } from "@/lib/interfaces/parent.interface";
import { useState } from "react";


export function ProfileForm({ userInfo }: { userInfo: UserType | ParentType }) {
    const [showPasswordNew, setShowPasswordNew] = useState<boolean>(false);
    const [showPasswordPrev, setShowPasswordPrev] = useState<boolean>(false);


    return(
        <div>
            Testing
        </div>
    );
}