"use client";

import * as React from "react";

// UI
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, Loader2, Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

import useFetchUserOptions from "../hooks/getUsersOptions";
import useDebounce from "@/components/hooks/useDebounce";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { createNewChat } from "../hooks/action";
import { useSession } from "next-auth/react";
import { UserType } from "@/lib/interfaces/user.interface";
import { ParentType } from "@/lib/interfaces/parent.interface";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import useUserInfo from "@/components/hooks/useUserInfo";

export function UserOptionsComboBox({
  onChange,
}: {
  onChange: (e: boolean) => void;
}) {
  const [value, setValue] = React.useState<{ _id: string; email: string }>();
  const userInfo = useUserInfo();
  // console.log(userInfo);
  const [isLoading, setIsLoading] = React.useState(false);

  const [stringVal, setStringVal] = React.useState("");
  const debouncedVal = useDebounce(stringVal, 500);
  const router = useRouter();

  const options = useFetchUserOptions({
    searchFilter: debouncedVal,
    userInfo: userInfo,
  });
  const queryClient = useQueryClient();

  async function handleCreate() {
    if (!userInfo || !value) return null;
    setIsLoading(true);
    const res = await createNewChat({
      senderId: userInfo?._id as string,
      recipientId: value?._id as string,
    });

    console.log(res);

    if (res.success) {
      // go to link of "/messages/${res.data}"
      queryClient.invalidateQueries({
        queryKey: [`chats`],
      });
      router.push(`/messages/${res.data}`);
      onChange(false);
    }
  }

  return (
    <>
      <div className="flex items-center px-3 border-b">
        <Search className="w-4 h-4 mr-2 opacity-50 shrink-0" />
        <input
          className="flex w-full py-3 text-sm bg-transparent rounded-md outline-none h-11 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Search a user..."
          value={stringVal}
          onChange={(e) => setStringVal(e.target.value)}
        />
      </div>
      {options?.isLoading ? (
        <div className="flex items-center justify-center flex-1 w-full">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      ) : (
        <>
          {options?.data?.length === 0 ? (
            <>
              <div className="w-full border rounded-md h-80">
                <div className="p-4 text-center">No Users found</div>
              </div>
            </>
          ) : (
            <>
              <ScrollArea className="w-full border rounded-md h-80">
                <div className="p-4">
                  {options?.data?.map((user) => {
                    const isActive = user?._id === value?._id;

                    return (
                      <button
                        type="button"
                        key={user._id}
                        className="relative flex items-center justify-start w-full px-4 py-2 space-x-4 text-left transition rounded-md hover:bg-slate-100"
                        onClick={() =>
                          setValue({
                            _id: user._id as string,
                            email: user.email,
                          })
                        }
                      >
                        <Avatar>
                          <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="w-full">
                          <div className="flex items-center justify-between w-full">
                            <p className="text-sm font-medium leading-none">
                              {user.name}
                            </p>
                            <p className="text-xs capitalize text-muted-foreground">
                              {user?.role}
                            </p>
                          </div>
                          <p className="text-sm text-left text-muted-foreground line-clamp-1">
                            {user.email}
                          </p>
                        </div>
                        {isActive && (
                          <Check className="absolute w-5 h-5 -translate-y-1/2 right-4 top-1/2" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </ScrollArea>
            </>
          )}
        </>
      )}
      <DialogFooter className="flex items-center justify-between w-full">
        <p className="flex-1 text-sm text-left">
          {value ? (
            <span className="font-medium">{value.email}</span>
          ) : (
            "Select a user to contact"
          )}
        </p>
        <Button
          type="button"
          disabled={!value || isLoading}
          onClick={handleCreate}
        >
          Create{" "}
          {isLoading && <Loader2 className="w-5 h-5 ml-2 animate-spin" />}
        </Button>
      </DialogFooter>
    </>
  );
}
