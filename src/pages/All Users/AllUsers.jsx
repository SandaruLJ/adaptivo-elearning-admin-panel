import React from "react";
import TitleBar from "../../components/TitleBar/TitleBar";
import "./AllUsers.css";
import Table from "../../components/Table/Table";
import { useFetch } from "../../components/useFetch";
import { getAllUsers } from "../../service/user.service";

const breadcrumbs = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Users",
    link: "/users",
  },
];

const AllUsers = () => {
  const { loading, data } = useFetch(getAllUsers);

  const rows = [];

  data &&
    data.map((user, i) => {
      rows.push({
        id: i + 1,
        no: "1",
        name: `${user.firstname} ${user.lastname}`,
        email: user.email,
        phone: user.phone,
      });
    });
  const columns = [
    {
      field: "name",
      name: "Name",
    },
    {
      field: "email",
      name: "Email",
    },
    {
      field: "phone",
      name: "Phone",
    },
  ];

  return (
    <>
      <TitleBar title="Users" breadcrumbs={breadcrumbs} />
      <Table columns={columns} rows={rows} loading={loading} />
    </>
  );
};
export default AllUsers;
