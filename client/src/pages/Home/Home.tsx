import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Link } from "react-router";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const [open, setOpen] = useState(false);

  const { session, user } = useAuth();

  const checkAuth = async () => {
    if (!user) {
      setOpen(true);
      return;
    }

    // // TODO: edit this to the target protected route

    // console.log("fetching backend user data ...");
    // fetch("/api/profile", {
    //   headers: {
    //     Authorization: `Bearer ${session?.access_token}`,
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data.message);
    //     location.href = "/profile";
    //   })
    //   .catch((error) => console.error("Error fetching data: ", error));
  };

  return (
    <>
      <h1>Home Page</h1>
      <AlertDialog open={open} onOpenChange={setOpen}>
        {open && (
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Create an Account to Continue</AlertDialogTitle>
              <AlertDialogDescription>
                Sign up for free to submit places, write reviews, and bookmark
                your favorite spots. Help others find their next work-friendly
                place!
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <Link to="/sign-up">
                <AlertDialogAction>Create an account</AlertDialogAction>
              </Link>
            </AlertDialogFooter>
          </AlertDialogContent>
        )}
      </AlertDialog>
      <Card onClick={() => checkAuth()}>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
          <CardAction>Card Action</CardAction>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </>
  );
}
