import React from "react";
import TitleBar from "../../components/TitleBar/TitleBar";
import "./AllCategory.css";
import Table from "../../components/Table/Table";
import { useFetch } from "../../components/useFetch";
import {getAllCategory} from "../../service/category.service";


const breadcrumbs = [
    {
        name: "Home",
        link: "/",
    },
    {
        name: "Categories",
        link: "/categories",
    },
];

const AllCategory = () => {
    const { loading, data } = useFetch(getAllCategory);

    const rows = [];

    data &&
    data.map((category, i) => {
        rows.push({
            id: i + 1,
            no: i + 1,
            title: category.title,
            status: "Active",
        });
    });
    const columns = [
        {
            field: "title",
            name: "Title",
        },
        {
            field: "status",
            name: "Status",
        },
    ];

    return (
        <>
            <TitleBar title="Category" breadcrumbs={breadcrumbs} />
            <Table columns={columns} rows={rows} loading={loading} />
        </>
    );
};
export default AllCategory;

