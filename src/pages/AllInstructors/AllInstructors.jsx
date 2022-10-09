import React from "react";
import TitleBar from "../../components/TitleBar/TitleBar";
import "./AllInstructors.css";
import Table from "../../components/Table/Table";
import { useFetch } from "../../components/useFetch";
import { getAllInstructors } from "../../service/instructor.service";

const breadcrumbs = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Instructors",
    link: "/instructors",
  },
];

const AllInstructors = () => {
  const { loading, data } = useFetch(getAllInstructors);

  const rows = [];

  data &&
    data.map((instructor, i) => {
      rows.push({
        id: i + 1,
        no: "1",
        name: `${instructor.firstname} ${instructor.lastname}`,
        email: instructor.email,
        phone: instructor.phone,
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
      <TitleBar title="Instructors" breadcrumbs={breadcrumbs} />
      <Table columns={columns} rows={rows} loading={loading} />
    </>
  );
};
export default AllInstructors;
