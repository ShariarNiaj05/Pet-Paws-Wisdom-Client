"use client";
import { useState } from "react";
import { useUser } from "@/context/user.provider";
import { Avatar, Button, Input, Tab, Tabs } from "@nextui-org/react";
import { getUserProfileApi } from "@/services/userServices";

const UserProfile = () => {
  const { user } = useUser();
  const [userInfo, setUserInfo] = useState<any | null>(null);
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchUserProfile = async () => {
    if (!user) return;
    try {
      const profileData = await getUserProfileApi(user._id);
      setUserInfo(profileData);
    } catch (error) {
      console.error("Error fetching user profile", error);
    }
  };
  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePic(e.target.files[0]);
    }
  };
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    if (userInfo) {
      formData.append("name", userInfo.name);
      formData.append("bio", userInfo.bio);
      if (profilePic) {
        formData.append("profilePicture", profilePic);
      }
    }

    try {
      await updateUserProfileApi(user._id, formData);
      fetchUserProfile();
    } catch (error) {
      console.error("Error updating profile", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-6 bg-gray-100 rounded-md shadow-md w-full md:w-3/4 lg:w-1/2 mx-auto">
      {userInfo && (
        <>
          <Avatar
            src={userInfo.profilePicture || "/default-avatar.png"}
            size="lg"
            className="mb-4"
          />
          <form onSubmit={handleProfileUpdate} className="w-full space-y-4">
            <Input
              label="Name"
              value={userInfo.name}
              onChange={(e) =>
                setUserInfo({ ...userInfo, name: e.target.value })
              }
              required
              fullWidth
              // bordered
            />
            <Input
              label="Bio"
              value={userInfo.bio}
              onChange={(e) =>
                setUserInfo({ ...userInfo, bio: e.target.value })
              }
              fullWidth
              // bordered
            />
            <div className="space-y-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                className="hidden"
                id="upload"
              />
              <label htmlFor="upload" className="cursor-pointer text-blue-500">
                Upload Profile Picture
              </label>
              {profilePic && (
                <p className="text-sm text-gray-600">{profilePic.name}</p>
              )}
            </div>
            <Button
              type="submit"
              color="primary"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? "Updating..." : "Update Profile"}
            </Button>
          </form>

          <Tabs aria-label="User Profile Tabs" className="w-full mt-8">
            <Tabs>
              <Tab key="posts" title="Posts" />
              <Tab key="followers" title="Followers" />
              <Tab key="following" title="Following" />
            </Tabs>

            <Tabs key="posts" className="p-4">
              {/* Add code to list user posts here */}
            </Tabs>

            <Tabs key="followers" className="p-4">
              {/* Add code to list followers here */}
            </Tabs>

            <Tabs key="following" className="p-4">
              {/* Add code to list following here */}
            </Tabs>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default UserProfile;
