import { Routes, Route } from "react-router-dom";
import { CreatedEventPage, DetailEventPage, FavoriteEventPage, HomePage, JoinedEventPage, LoginPage, MyEventPage, ProfilePage } from "../../pages";
import Navbar from '../../companents/navbar/NavbarEvent'
import { RegisterPage } from "../../pages/register/RegisterPage";

function Router() {
    return (
        <>
            <Navbar></Navbar>
            <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/register" element={<RegisterPage />} ></Route>
                <Route path="/Login" element={<LoginPage />}></Route>
                <Route path="/MyFavoriteEvent" element={<FavoriteEventPage />}></Route>
                <Route path="/MyJoinedEvent" element={<JoinedEventPage />}></Route>
                <Route path="/MyCreatedEvent" element={<CreatedEventPage />}></Route>
                <Route path="/MyProfile" element={<ProfilePage />}></Route>
                <Route path={`/event/:id`} element={<DetailEventPage />}></Route>
                <Route path={`/event/user`} element={<MyEventPage />}></Route>
            </Routes>
        </>
    );
}

export default Router;
