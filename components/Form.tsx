import { formValues } from '@/types';
import { useState } from 'react';

const DEFAULT_VALUES = {
  name: '',
  job: ''
};

const Form = () => {
  const [values, setValues] = useState<formValues>(DEFAULT_VALUES);
  const [errors, setErrors] = useState<formValues>(DEFAULT_VALUES);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<
    formValues & {
      createdAt: string;
      id: number;
    }
  >();

  const handleJobApplication = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;

    // Check each value
    for (const key in values) {
      const valueKey = key as keyof typeof values;

      if (values[valueKey] === '') {
        // If the value is empty, set an error message for this field
        errors[valueKey] = 'This field is required';
        hasError = true;
        break;
      } else {
        // If the value is not empty, clear any previous error message for this field
        errors[valueKey] = '';
      }
    }
    // Update the errors state
    setErrors({ ...errors });

    // If there are any errors, return early
    if (hasError) {
      return;
    }

    setLoading(true);
    // Send the data using the POST method
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setData(data);
    } catch (error) {
      // errors would be handled better in a bigger project
      // for now logging errors
      console.error(error);
    }
    setLoading(false);
  };
  return (
    <>
      {data ? (
        <div className="mt-12">
          <h1 className="mb-2 text-lg font-semibold text-dark text-center">
            Application Successful
          </h1>
          <h3 className="text-[1.15rem] font-medium text-muted text-base underline">
            Details:
          </h3>

          <ul>
            <li>
              <span className="font-medium">Name:</span> {data.name}
            </li>
            <li>
              <span className="font-medium">Job:</span> {data.job}
            </li>
            <li>
              <span className="font-medium">Job:</span>{' '}
              {new Date(data.createdAt).toLocaleDateString() +
                ' ' +
                new Date(data.createdAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
            </li>
          </ul>

          <button
            onClick={() => {
              setData(undefined);
              setValues(DEFAULT_VALUES);
              setErrors(DEFAULT_VALUES);
            }}
            className="mt-8 w-full bg-gray-900 py-3 text-white rounded"
          >
            Apply Again
          </button>
        </div>
      ) : (
        <form className="w-full max-w-lg mt-12" onSubmit={handleJobApplication}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 font-bold mb-2"
                htmlFor="name"
              >
                Full Name
              </label>
              <input
                onChange={
                  (e) =>
                    setValues((prev) => ({
                      ...prev,
                      name: e.target.value.trim()
                    }))
                  // trim() removes any whitespace from the beginning and end of the entered value
                }
                className={`appearance-none block w-full bg-gray-200 text-gray-700 border-b ${
                  errors?.name ? 'border-red-500' : 'border-gray-900'
                } py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                id="name"
                type="text"
                placeholder="Enter name"
              />
              <p className="text-red-500 text-xs italic">{errors.name}</p>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 font-bold mb-2"
                htmlFor="job"
              >
                Job Description
              </label>
              <input
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, job: e.target.value.trim() }))
                }
                className={`appearance-none block w-full bg-gray-200 text-gray-700 border-b ${
                  errors?.job ? 'border-red-500' : 'border-gray-900'
                } py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                id="name"
                type="text"
                placeholder="Job"
              />
              <p className="text-red-500 text-xs italic">{errors.job}</p>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="mt-8 w-full mx-8 bg-gray-900 py-3 text-white rounded disabled:opacity-50 hover:bg-gray-800 transition-colors duration-200 ease-in-out"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default Form;
