import MyProfileImage from "./_components/MyProfileImage";
import ProfileEditForm from "./_components/ProfileEditForm";

const ProfileEdit = async () => {
  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between gap-3 pb-5 border-b-2 border-gray-700">
        <h3 className="text-[22px] font-semibold">프로필 수정</h3>
      </div>
      <MyProfileImage />
      <ProfileEditForm />
    </div>
  );
};

export default ProfileEdit;
