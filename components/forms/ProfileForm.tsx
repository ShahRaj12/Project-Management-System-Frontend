"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "@/lib/validators";
import { useUser } from "@/hooks/useUser";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { useToast } from "@/components/ui/Toast";

interface ProfileFormInputs {
  name: string;
  email: string;
  avatarUrl?: string;
}

export const ProfileForm: React.FC = () => {
  const { user, updateProfile: updateAuthProfile } = useAuth();
  const { updateProfile, isUpdating } = useUser();
  const { success: toastSuccess, error: toastError } = useToast();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormInputs>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      avatarUrl: user?.avatarUrl || "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl || "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: ProfileFormInputs) => {
    setFormError(null);
    try {
      const response = await updateProfile(data);
      updateAuthProfile(response);
      toastSuccess("Your profile has been updated successfully.", "Profile Updated");
    } catch (err: any) {
      const errMsg = err.message || "Failed to update profile";
      setFormError(errMsg);
      toastError(errMsg, "Update Failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md w-full">
      {formError && (
        <Alert variant="error" title="Error">
          {formError}
        </Alert>
      )}

      <Input
        label="Name"
        type="text"
        error={errors.name?.message}
        {...register("name")}
      />

      <Input
        label="Email Address"
        type="email"
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        label="Avatar Image URL (Optional)"
        type="text"
        placeholder="https://example.com/avatar.jpg"
        error={errors.avatarUrl?.message}
        {...register("avatarUrl")}
      />

      <Button type="submit" isLoading={isUpdating}>
        Save Changes
      </Button>
    </form>
  );
};
export default ProfileForm;
