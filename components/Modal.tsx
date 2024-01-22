import type { UserType } from '@/types';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { UserCard } from '.';

const Modal = ({
  userId,
  closeModal
}: {
  userId: number;
  closeModal: Dispatch<SetStateAction<number | null>>;
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserType>();

  // function to fetch single user
  const fetchSingleUser = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`
      );
      const userData = await response.json();
      setUser(userData?.data);
    } catch (error) {
      // errors would be handled better in a bigger project
      // for now logging errors
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    // fetch the user data from the API
    if (userId) {
      fetchSingleUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      onClick={() => closeModal(null)}
      className="bg-black/80 flex flex-col fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative p-8 w-full max-w-md max-h-full">
        <div className="bg-clip-border rounded-2xl border border-dashed border-stone-300 bg-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6 mt-4 mr-4 cursor-pointer ml-auto"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>

          <div className="pt-8 px-9 mx-auto">
            {user && <UserCard user={user} isSingle={true} />}
            <p className="text-black mb-2 text-center">
              Click anywhere to dismiss
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
