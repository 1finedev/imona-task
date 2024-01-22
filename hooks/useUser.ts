import { UserType, paginationType } from '@/types';
import { useEffect, useState } from 'react';

/*
This is a custom hook to fetch users data and manage states
*/

const useUser = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [paginationData, setPagination] = useState<paginationType>({
    page: 0,
    per_page: 0,
    total: 0,
    total_pages: 0
  });

  // function to get all users and pagination data
  const fetchUsers = async ({ page }: { page: number }) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users?page=${page}`
      );
      const usersData = await response.json();
      setUsers(usersData?.data ?? []);
      setPagination({
        page: usersData?.page,
        per_page: usersData?.per_page,
        total: usersData?.total,
        total_pages: usersData?.total_pages
      });
    } catch (error) {
      // errors would be handled better in a bigger project
      // for now logging errors
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    // fetch the users when the page loads / mounts
    // add timeout to showcase loading state UI
    const timeout = setTimeout(() => {
      fetchUsers({ page: 1 });
    }, 2000);

    () => {
      // remove timeout when component unmounts
      clearTimeout(timeout);
    };
  }, []);

  return {
    users,
    loading,
    fetchUsers,
    paginationData
  };
};

export default useUser;
