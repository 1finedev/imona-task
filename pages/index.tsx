import { Loading, Pagination, UserCard } from '@/components';
import Modal from '@/components/Modal';
import useUser from '@/hooks/useUser';
import Link from 'next/link';
import { useState } from 'react';

const UsersList = () => {
  const { users, paginationData, loading, fetchUsers } = useUser();
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  return (
    <>
      {users.length > 0 ? (
        <div className="max-w-4xl shadow-2xl rounded-2xl">
          <div className="bg-clip-border  rounded-2xl border border-dashed border-stone-300 bg-gray-200">
            <div className="py-8 px-9">
              <div>
                <div className="mb-9">
                  <h1 className="mb-2 text-[1.75rem] font-semibold text-dark text-center">
                    The Imona Team
                  </h1>
                  <h3 className="text-[1.15rem] font-medium text-muted text-center">
                    Browse through the list of our team members.
                  </h3>
                  <Link href="/job">
                    <p className="text-center text-blue-800 mt-4 text-lg underline">
                      Visit Job Form Page
                    </p>
                  </Link>
                </div>

                {/* LIST OF USERS */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 md:px-16 md:gap-8">
                  {users.length > 0 &&
                    users.map((user) => (
                      <UserCard
                        key={user?.id}
                        user={user}
                        setCurrentUserId={setCurrentUserId}
                      />
                    ))}
                </div>
              </div>

              {/* PAGINATION */}
              <Pagination
                fetchUsers={fetchUsers}
                paginationData={paginationData}
                loading={loading}
              />
            </div>
          </div>

          {/* MODAL */}
          {currentUserId && (
            // closing the modal by just clearing the current user id
            <Modal userId={currentUserId} closeModal={setCurrentUserId} />
          )}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default UsersList;
