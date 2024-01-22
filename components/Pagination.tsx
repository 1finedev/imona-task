import type { paginationType } from '@/types';

const Pagination = ({
  fetchUsers,
  paginationData,
  loading
}: {
  fetchUsers: ({ page }: { page: number }) => Promise<void>;
  paginationData: paginationType;
  loading: boolean;
}) => {
  const { page, per_page, total, total_pages } = paginationData;

  return (
    <div className="flex flex-col items-center">
      <span className="text-md text-gray-700">
        Showing
        <span className="font-semibold text-gray-900"> {per_page * page} </span>
        of
        <span className="font-semibold text-gray-900"> {total} </span>
        users
      </span>

      <div className="inline-flex mt-2 xs:mt-0">
        <button
          onClick={() =>
            fetchUsers({
              page: page - 1
            })
          }
          disabled={page <= 1 || loading}
          className="flex items-center justify-center px-6 h-10 text-lg font-medium text-white bg-gray-800 
          disabled:bg-gray-400 disabled:cursor-not-allowed rounded-s hover:bg-gray-900"
        >
          Prev
        </button>

        <button
          onClick={() =>
            fetchUsers({
              page: page + 1
            })
          }
          disabled={page >= total_pages || loading}
          className="flex items-center justify-center px-6 h-10 text-lg font-medium text-white bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed border-0 border-s border-gray-700 rounded-e hover:bg-gray-900"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
