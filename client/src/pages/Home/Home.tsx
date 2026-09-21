import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { DashboardSearchBar } from "@/components/home/DashboardSearchBar";

export default function Home() {
  const [open, setOpen] = useState(false);

  const { user } = useAuth();

  const checkAuth = async () => {
    if (!user) {
      setOpen(true);
      return;
    }
  };

  return (
    <div className="flex h-full *:flex *:flex-1 *:p-6">
      <div>
        <DashboardSearchBar />
      </div>
      <div className="bg-secondary">b</div>
    </div>
    /*
    <>
    // TODO: Integrate to current dashboard
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
    </> */
  );
}
