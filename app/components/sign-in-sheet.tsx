"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "../auth-provider";

interface SignInSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export default function SignInSheet({ open, onOpenChange, onSuccess }: SignInSheetProps) {
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(email, password);
      onSuccess();
      onOpenChange(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side='right'>
        <SheetHeader>
          <SheetTitle>Sign in to upload</SheetTitle>
          <SheetDescription>Please enter your email and password to continue.</SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit}>
          <div className='grid flex-1 auto-rows-min gap-6 px-4'>
            <div className='grid gap-3'>
              <Label htmlFor='email'>Email</Label>
              <Input id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className='grid gap-3'>
              <Label htmlFor='password'>Password</Label>
              <Input id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
          </div>
          <SheetFooter>
            <Button type='submit' className='w-full' disabled={loading}>
              Sign in
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
