import Layout from "@/components/Layout";
import { Users } from "@/utils/types";
import axios from "axios";
import { useEffect, useState } from "react";

const Users = () => {
    const [users, setUsers] = useState<Users[]>([]);

    useEffect(() => {
      const fetchUsers = async () => {
        const fetchedPosts = await getUsers();
        setUsers(fetchedPosts);
      };

      fetchUsers();
    }, []);
  return (
    <Layout pageTitle="Users">
      <div className="flex w-full h-full flex-col items-center justify-between lg:p-24 px-6 py-4 gap-6 md:gap-12">
        <div className="container flex flex-col justify-center  overflow-scroll w-full">
          <h1 className="text-2xl mb-5 lg:mb-12 text-center font-semibold">
            All Users
          </h1>
          <table className="w-full text-left rtl:text-right">
            <thead className="flex w-full">
              <tr className="flex w-full mb-4">
                <th className="px-6 py-3 w-1/6 font-medium">Id</th>
                <th className="px-6 py-3 w-1/6 font-medium">Name</th>
                <th className="px-6 py-3 w-1/6 font-medium">Email</th>
                <th className="px-6 py-3 w-1/6 font-medium lg:text-center">
                  Gender
                </th>
                <th className="px-6 py-3 w-1/6 font-medium lg:text-center">
                  Status
                </th>
                <th className="px-6 py-3 w-1/6 font-medium lg:text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="flex flex-col items-center justify-between overflow-y-scroll w-full">
              {users.map((user: Users) => (
                <tr className="flex w-full mb-4 break-words" key={user.id}>
                  <td className="px-6 py-3 w-1/6">{user.id}</td>
                  <td className="px-6 py-3 w-1/6">{user.name}</td>
                  <td className="px-6 py-3 w-1/6 ">{user.email}</td>
                  <td className="px-6 py-3 w-1/6 flex flex-col md:flex-row md:gap-3 justify-center">
                    {user.gender}
                  </td>
                  <td className="px-6 py-3 w-1/6 flex flex-col md:flex-row md:gap-3 justify-center">
                    {user.status}
                  </td>
                  <td className="px-6 py-3 w-1/6 flex flex-col md:flex-row md:gap-3 justify-center">
                    <div>Edit</div>
                    <div>Delete</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Users;

export async function getUsers(): Promise<Users[]> {
  try {
    const response = await axios.get(`users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};
