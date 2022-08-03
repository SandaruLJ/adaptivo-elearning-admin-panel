import { Assignment, FileUpload, UploadFile } from "@mui/icons-material";
import { Button, Grid, Input } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CustomButton from "../../components/Button/CustomButton";
import Select from "../../components/Select/SelectBox";
import CustomTab from "../../components/Tab/CustomTab";
import TitleBar from "../../components/TitleBar/TitleBar";
import { addCourse, getCourseById } from "../../service/course.service";
import "./AddCourse.css";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import CourseAdvancedInformation from "./components/CourseAdvancedInformation";
import Curriculum from "./components/Curriculum";
import AddConcept from "./components/Concept";
import { useDispatch, useSelector } from "react-redux";
import { courseActions } from "../../store/course-slice";
import PublishCourse from "./components/PublishCourse";
import { useParams } from "react-router-dom";
import { curriculumActions } from "../../store/curriculum-slice";
import BasicInformation from "./components/BasicInformation";

const breadcrumbs = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Courses",
    link: "/courses",
  },
  {
    name: "Add Course",
    link: "/courses/add",
  },
];

const AddCourse = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const tabRef = useRef();
  const course = useSelector((state) => state.course);
  const errors = useSelector((state) => state.course.errors);
  const curriculumErrors = useSelector((state) => state.curriculum.errors);

  const { id } = useParams();

  useEffect(async () => {
    if (props.edit) {
      setIsLoading(true);
      let data = await getCourseById(id);
      setIsLoading(false);

      const course = {
        title: data.title,
        subtitle: data.subtitle,
        category: data.category._id,
        subCategory: data.subCategory._id,
        language: data.language,
        level: data.level,
        thumbnail: {
          name: data.thumbnail.name,
          size: data.thumbnail.size,
          url: data.thumbnail.url,
        },
        trailer: {
          name: data.trailer.name,
          size: data.trailer.size,
          url: data.trailer.url,
          duration: data.trailer.duration,
        },
        description: data.description,
        outcomes: {},
        requirements: {},
        welcome: data.welcome,
        congratulations: data.congratulations,
        price: {
          currency: data.currency,
          type: data.tier,
          value: data.price,
        },
        instructors: [],
      };
      data.outcomes.map((outcome, i) => {
        course.outcomes[`learn${i + 1}`] = outcome;
      });
      data.requirements.map((requirement, i) => {
        course.requirements[`requirement${i + 1}`] = requirement;
      });
      let sections = [];
      data.curriculum.map((curriculum, index) => {
        const section = {
          id: index,
          name: curriculum.name,
          units: [],
        };
        curriculum.units.map((unit) => {
          const temp = {
            type: unit.type,
            video: "",
            audio: "",
            resources: [],
            quiz: [],
            note: "",
            name: unit.name,
            isConceptLink: unit.isConceptLink,
          };
          if (unit.type == "video") {
            temp.video = {
              name: unit.video.name,
              size: unit.video.size,
              url: unit.video.url,
              duration: unit.video.duration,
            };
          }
          if (unit.type == "audio") {
            temp.video = {
              name: unit.audio.name,
              size: unit.audio.size,
              url: unit.audio.url,
              duration: unit.audio.duration,
            };
          }
          if (unit.type == "note") {
            temp.note = unit.note;
          }
          if (unit.type == "quiz") {
            unit.quiz.map((quiz, index) => {
              const question = {
                id: index,
                title: quiz.question,
                correctAnswer: quiz.correctAnswer,
                explanation: quiz.explanation,
                answers: quiz.answers,
              };
              temp.quiz.push(question);
            });
          }
          section.units.push(temp);
        });
        sections.push(section);
      });
      for (var key in course) {
        dispatch(courseActions.setValue({ key: key, value: course[key] }));
      }
      dispatch(curriculumActions.setSection(sections));
    }
  }, []);

  const handleTabChange = (value) => {
    tabRef.current.setValue(value);
  };
  const tabs = [
    {
      label: "Basic Information",
      icon: <Assignment />,
      body: <BasicInformation changeTab={handleTabChange} isLoading={isLoading} />,
      error: Object.keys(errors.basic).length > 0 ? true : false,
    },
    {
      label: "Advanced Information",
      icon: <Assignment />,
      body: <CourseAdvancedInformation changeTab={handleTabChange} />,
      error: Object.keys(errors.advanced).length > 0 ? true : false,
    },
    {
      label: "Curriculum",
      icon: <Assignment />,
      body: <Curriculum changeTab={handleTabChange} />,
      error: Object.keys(curriculumErrors).length > 0 ? true : false,
    },
    {
      label: "Publish Course",
      icon: <Assignment />,
      body: <PublishCourse changeTab={handleTabChange} />,
      error: Object.keys(errors.publish).length > 0 ? true : false,
    },
  ];

  return (
    <div className="add-course">
      <TitleBar title={props.edit ? "Edit Course" : "Create New Course"} breadcrumbs={breadcrumbs} />
      <CustomTab tabs={tabs} ref={tabRef} />
    </div>
  );
};
export default AddCourse;
