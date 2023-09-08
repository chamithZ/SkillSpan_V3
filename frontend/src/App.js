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

function App() {
    const [user, setUser] = useState(null);
    const [secret, setSecret] = useState(null);
    const isAuth = Boolean(user) && Boolean(secret);

    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                   <Route path="/qadmin" element={<QuestionOverview/>} />
                    <Route path="/questions" element={<Question/>} />
                    <Route path="/question/:questionId" element={<QuestionView/>} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/" element={<Landing />} />
                    <Route path="/addQuestion" element={<AddQuestion/>} />
                    <Route path="/qadmin/updateQuestion/:questionId" element={<UpdateQuestion/>} />
                    {/* <Route path="*" element={<Navigate to="/" />} /> */}
                </Routes>
            </BrowserRouter>
        </div>
        // <Landing />
    );
}

export default App;
