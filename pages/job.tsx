import { Form } from '@/components';
import { useRouter } from 'next/router';

const Job = () => {
  const router = useRouter();
  return (
    <div className="max-w-4xl shadow-2xl rounded-2xl">
      <div className="bg-clip-border  rounded-2xl border border-dashed border-stone-300 bg-gray-200">
        <div className="py-8 px-9">
          <div
            className="flex items-center space-x-2 mb-4 underline underline-offset-2 cursor-pointer"
            onClick={() => router.back()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
              />
            </svg>

            <p>Go back</p>
          </div>
          <div>
            <div className="mb-9">
              <h1 className="mb-2 text-[1.75rem] font-semibold text-dark text-center">
                Imona Job Center
              </h1>
              <h3 className="text-[1.15rem] font-medium text-muted text-center text-base">
                Fill the form below to apply for a job{' '}
              </h3>
              <Form />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Job;
