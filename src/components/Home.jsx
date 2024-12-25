import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const url = "http://localhost:3000/user";
    try {
      const response = await fetch(url);
      const res = await response.json();
      setData(res);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data, "Fetched Data");

  function create() {
    navigate('/add');
  }

  async function del(id) {
    const url = `http://localhost:3000/user/${id}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to delete user with ID ${id}: ${response.statusText}`);
      }
  
      console.log(`User with ID ${id} deleted successfully.`);
      fetchData(); // Refresh the data after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }
  function edit(id) {
    const user = data.find((item) => item.id === id);
    navigate(`/edit/${id}`, { State: user });
  }
  

  return (
    <>
      <div className="w-[1200px] mx-auto mt-[100px]">
        <button
          className="bg-green-600 h-[40px] w-[150px] m-10 ml-0 rounded p-2 text-white"
          onClick={create}
        >
          Add +
        </button>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Password</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  key={index}
                >
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.name}
                  </td>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">{item.password}</td>
                  <td className="px-6 py-4">
                  <button
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={()=>edit(item.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={()=>del(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
