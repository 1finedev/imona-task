import type { UserType } from '@/types';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

const UserCard = ({
  user,
  isSingle,
  setCurrentUserId
}: {
  user: UserType;
  isSingle?: boolean;
  setCurrentUserId?: Dispatch<SetStateAction<number | null>>;
}) => {
  return (
    <div
      onClick={() =>
        !isSingle && setCurrentUserId && setCurrentUserId(user?.id)
      }
      className="flex flex-col items-center text-center mb-11"
    >
      <div className="inline-block mb-4 relative shrink-0 rounded-[.95rem]">
        <Image
          src={user?.avatar}
          alt={user?.first_name}
          width={150}
          height={150}
          className="rounded-[.95rem] transform h-[65px] w-[65px] md:w-[150px] md:min-h-[150px] object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="text-center">
        <h2 className="text-dark font-semibold hover:text-primary text-lg md:text-[1.25rem] transition-colors duration-200 ease-in-out">
          {user.first_name} {user.last_name}
        </h2>
        {!isSingle && setCurrentUserId && (
          <h4
            onClick={() => setCurrentUserId(user?.id)}
            className="block font-medium text-muted mx-auto hover:underline underline-offset-2 cursor-pointer text-sm md:text-base"
          >
            View Profile
          </h4>
        )}
      </div>
    </div>
  );
};

export default UserCard;
