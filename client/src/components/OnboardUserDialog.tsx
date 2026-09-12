import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { AtSign } from "lucide-react";
import { useState } from "react";

export default function OnboardUserDialog() {
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { session, user } = useAuth();

  const handleUsernameEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (!session || !user) {
        throw new Error("You must be signed in to be onboarded.");
      }

      const response = await fetch("/api/users/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({ user_name: username }),
      });

      if (!response.ok) {
        throw new Error("Error occurred when updating username.");
      }

      const data = await response.json();
      console.log("Success:", data);
      alert("Username updated successfully!");

      setUsername("");
      setSuccess(true);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm" showCloseButton={false}>
        <form onSubmit={handleUsernameEdit}>
          <DialogHeader>
            <DialogTitle>What should we call you?</DialogTitle>
            <DialogDescription>
              Pick a unique handle to start connecting with the WiredIn
              community.
            </DialogDescription>
          </DialogHeader>
          <Field className="py-8">
            <Label htmlFor="username-1">Username</Label>
            <div className="relative flex items-center max-w-sm">
              {/* Icon placed on the left */}
              <AtSign
                size={16}
                className="absolute left-3 text-muted-foreground pointer-events-none"
              />
              <Input
                type="text"
                placeholder="username"
                className="pl-9"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </Field>
          <DialogFooter>
            <Button type="submit">
              {isLoading ? "Saving username..." : "Let's go!"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
