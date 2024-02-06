import Layout from "@/components/Layout";
import { UsersProps } from "@/utils/types";
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";

function EditUser({ userById }: UsersProps) {
  if (!userById) {
    return (
      <Layout pageTitle="Post Not Found">
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-3xl">Loading data...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout pageTitle="Edit User">
      <div className="flex items-center justify- p-12">
        <div className="mx-auto w-full max-w-[550px]">
          <h1 className="text-2xl mb-5 text-center font-semibold">Edit User</h1>
          <form action="https://formbold.com/s/FORM_ID" method="POST">
            <div className="mb-5">
              <label
                htmlFor="name"
                className="mb-3 block text-base font-medium text-[#07074D]">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder={`${userById.name}`}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="mb-3 block text-base font-medium text-[#07074D]">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder={`${userById.email}`}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="gender"
                className="block mb-2 text-sm font-medium  text-[#07074D]dark:text-gray-400">
                Select Gender
              </label>
              <select
                id="gender"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={`${userById.gender}`}>
                <option selected>Choose a gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </div>
            <div className="mb-5">
              <label
                htmlFor="status"
                className="block mb-2 text-sm font-medium  text-[#07074D]dark:text-gray-400">
                Select Status
              </label>
              <select
                id="status"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={`${userById.status}`}>
                <option selected>Choose a status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <button className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
              Update Data
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default EditUser;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const { id } = params;

  try {
    const resUser = await axios.get(
      `users/${id}`
    );
    const userById = resUser.data;

    return {
      props: {
        userById,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        userById: null,
      },
    };
  }
};

