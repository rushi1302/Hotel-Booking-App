import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import { useLocation } from "react-router-dom";
import LoadingButton from "./LoadingButton";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import UserProfileForm, {
  UserFormData,
} from "@/forms/user-profile-form/UserProfileForm";
import { useGetMyUser } from "@/api/MyUserApi";

type Props = {
  onSave: (userFormData: UserFormData) => void;
  disabled: boolean;
  isLoading: boolean;
};

const CheckoutButton = ({
  onSave,
  disabled,
  isLoading: isCheckoutLoading,
}: Props) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  const { pathname } = useLocation();

  const { currentUser, isLoading: currentUserLoading } = useGetMyUser();

  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };

  if (!isAuthenticated || !currentUser || isCheckoutLoading) {
    return (
      <Button onClick={onLogin} className="bg-orange-500">
        Login to Checkout
      </Button>
    );
  }

  if (isLoading) {
    return <LoadingButton />;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-orange-500" disabled={disabled}>
          Checkout
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[420px] md:min-w-[720px] ">
        <UserProfileForm
          currentUser={currentUser}
          isLoading={currentUserLoading}
          onSave={onSave}
          title="Confirm User Details"
          btntext="Continue to Payment"
        />
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutButton;
