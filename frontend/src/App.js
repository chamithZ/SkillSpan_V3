import "./App.css";
import Landing from "./components/Landing";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Chat from "./components/chat";
import Question from "./components/question/Question";
import QuestionView from "./components/QuestionView";
import AddQuestion from "./pages/questionBank/AddQuestion";
import QuestionOverview from "./pages/Qadmin/QuestionOverview";
import UpdateQuestion from "./pages/questionBank/UpdateQuestion";
import AddCompany from "./pages/Company/AddCompany";
import UpdateCompany from "./pages/Company/UpdateCompany"
import Companies from "./pages/Company/Companies";
import GetSingleCompany from "./pages/Company/GetSingleCompany";
import GetSingleRoadmap from "./pages/RoadMap/GetSingleRoadMap"
import GetSingleAssignment from "./pages/assignment/GetSingleAssignment";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Home from "./pages/Home/Home";
import AddQuiz from "./pages/Quiz/AddQuiz";
import ViewQuizList from "./pages/Quiz/ViewQuizList";
import QuizOverview from "./pages/Quiz/QuizOverview";

function App() {
    const [user, setUser] = useState(null);
    const [secret, setSecret] = useState(null);
    const isAuth = Boolean(user) && Boolean(secret);

    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path="/home" element={<Home/>} />
                   <Route path="/qadmin" element={<QuestionOverview/>} />
                    <Route path="/questions" element={<Question/>} />
                    <Route path="/question/:questionId" element={<QuestionView/>} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/" element={<Landing />} />
                    <Route path="/addQuestion" element={<AddQuestion/>} />
                    <Route path="/qadmin/updateQuestion/:questionId" element={<UpdateQuestion/>} />
                    <Route path="/company/addCompany" element={<AddCompany/>} />
                    <Route path="/company/update/:id" element={<UpdateCompany />} />
                    <Route path="/company/getOneCompany/:id" element={<GetSingleCompany/>}/>
                    <Route path="/company/" element={<Companies/>}/> 
                    <Route path="/company/roadMap/:id" element={<GetSingleRoadmap/>} />
                    <Route path="/assignment/getOne/:id/:id2" element={<GetSingleAssignment/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Registration/>}/>
                    <Route path="/addQuiz" element={<AddQuiz/>} />
                    <Route path="/quizlist" element={<ViewQuizList/>} />
                    <Route path="/quiz/:quizSetId" element={<QuizOverview/>} />
                    {/* <Route path="*" element={<Navigate to="/" />} /> */}
                </Routes>
            </BrowserRouter>
        </div>
        // <Landing />
    );
}

export default App;
