import React from "react";
import TitleBar from "../../components/TitleBar/TitleBar";
import "./AllCourse.css";
import Table from "../../components/Table/Table";
import { useFetch } from "../../components/useFetch";
import { getAllCourses } from "../../service/course.service";

const breadcrumbs = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Courses",
    link: "/courses",
  },
];

const AllCourse = () => {
  const { loading, data } = useFetch(getAllCourses);

  const rows = [];

  data &&
    data.map((course, i) => {
      rows.push({
        id: course._id,
        no: i + 1,
        thumbnail: course.thumbnail.url,
        title: course.title,
        category: course.category.title,
        status: "Active",
      });
    });
  const columns = [
    {
      field: "thumbnail",
      name: "",
      type: "image",
    },
    {
      field: "title",
      name: "Title",
    },
    {
      field: "category",
      name: "Category",
    },
    {
      field: "status",
      name: "Status",
    },
  ];

  return (
    <>
      <TitleBar title="Courses" breadcrumbs={breadcrumbs} />
      <Table columns={columns} rows={rows} loading={loading} />
    </>
  );
};
export default AllCourse;
